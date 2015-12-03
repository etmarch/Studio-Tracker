/*
 *
 * Contract Transforms, security on Collections in Server
 *
 */
Contracts.allow({
  insert: function (userId, doc) {
    return false;
  },

  update: function (userId, doc, fields, modifier) {
    return false;
  },

  remove: function (userId, doc) {
    return false;
  }
});

Meteor.methods({
  "contract.insert": function(contract) {
    check(this.userId, String);
    check(contract, {
      title: String,
      dateDue: Date,
      price: Number,
      hourEstimation: Number,
      costEstimation: Number,
      notes: [Object],
      clientId: String
    });
    // ToDo: add additional security (relying on schemas right now)
    Utils.clJ(contract);
    let clientName = Clients.findOne(contract.clientId).name;
    let fullContract = _.extend(contract, {
      currentHours: 0,
      status: 'active',
      clientName: clientName,
      activities: []
    });

    var contractId = Contracts.insert(fullContract);
    if (!contractId) {
      throw new Meteor.Error(422, 'Insert not done properly');
    } else {
      return contractId;
    }
  },

  /* Accepts an object with id, timestamp, and isLive properties
   */
  "contract.addActivity": function(contract) {
    //Utils.clJ(contract);
    check(this.userId, String);
    check(contract, {
      id: String
    });

    let servTime = new Date();
    let currentContract = Contracts.findOne(contract.id);

    //Utils.clJ(actsList[indexNum]); DEBUG

    // if isLive is true, end of session
    if (MongoConfig.getKey('isCurrentlyLive') === true) {

      let actsList = currentContract.activities;

      let indexNum = _.size(actsList) - 1; // get index of latest
      indexNum < 1 ? indexNum = 1 : indexNum;

      // ToDo: For all Date/Time stuff, need to convert to Date object before saving
      let sessionStartDate = actsList[indexNum].startStamp;

      let timeDiff = (servTime.getTime() - sessionStartDate.getTime());
      let updatedMillisecs = (currentContract.currentMillisecs + timeDiff);

      let modifier = { $set: {} };
      modifier.$set["activities." + indexNum  + ".endStamp"] = servTime;
      modifier.$set["activities." + indexNum + ".startStamp"] = sessionStartDate;
      modifier.$set["activities." + indexNum + ".sessionTime"] = parseInt(timeDiff);
      modifier.$set["isCurrentlyLive"] = false;
      modifier.$set["currentMillisecs"] = parseInt(updatedMillisecs);

      return Contracts.update({_id: contract.id }, modifier , function (error, result) {
        if (error) {
          throw new Meteor.Error("updateFailed", 'Contract Not Updated Properly ' + error);
        } else {
          Utils.cl("SERV  -- "+currentContract.title+" is no longer active");
          MongoConfig.setKey('lastActiveId', currentContract._id);
          MongoConfig.setKey('isCurrentlyLive', false);
          return result;
        }
      });
    } else {

      return Contracts.update(
          {
            _id: contract.id
          },
          {
            $addToSet: {activities: {startStamp: servTime, endStamp: null, sessionTime: parseInt(0)}},
            $set: {isCurrentlyLive: true}
          }, function (error, result) {
            if (error) {
              throw new Meteor.Error("updateFailed", 'Contract Not Updated Properly ' + error);
            } else {
              Utils.cl("SERV  -- "+currentContract.title+" is now currently active!");
              MongoConfig.setKey('lastActiveId', currentContract._id);
              MongoConfig.setKey('isCurrentlyLive', true);
              return result;
            }
          });
    }
  },

  /*
   *   Adding a cost to a contract - updating the contract
   *   Args: Cost Type, ContractId and cost amount - grab date from inside server method
   */
  "contract.addCost": function(cost) {
    Utils.clJ(cost);
    check(this.userId, String);
    check(cost, {
      contractId: String,
      amount: Number,
      type: String
    });

    const serverTime = new Date();
    const oldCostTotal = (Contracts.findOne({_id:cost.contractId}));
    Utils.clJ(oldCostTotal);
    const updatedTotal = parseInt(oldCostTotal.costTotal + cost.amount);
    Utils.cl("ABOUT TO ADD COST TO CONTRACT - __ INDEX: "+cost.type);

    return Contracts.update(
        {
          _id: cost.contractId
        },
        {
          $addToSet: {costs: {date: serverTime, type: cost.type, amount: parseInt(cost.amount)}},
          $set: {costTotal: parseInt(updatedTotal)}
        }, function (error, result) {
          if (error) {
            throw new Meteor.Error("updateFailed", 'Contract Not Updated Properly ' + error);
          } else {
            Utils.cl("Cost Added Successfully!");
            return result;
          }
        });
  }
});