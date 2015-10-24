/*
 *
 * Contract Transforms, security on Collections in Server
 *
 */

Contracts.allow({
  insert: function (userId, doc) {
    return !!userId;
  },

  update: function (userId, doc, fields, modifier) {
    return !!userId;
  },

  remove: function (userId, doc) {
    return !!userId;
  }
});

Meteor.methods({
  contractInsert: function(contract) {
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

    //Utils.clJ(fullContract);

    var contractId = Contracts.insert(fullContract);
    if (!contractId) {
      throw new Meteor.Error(422, 'Insert not done properly');
    } else {
      return contractId;
    }
  },
  /* Accepts an object with id, timestamp, and isLive properties
  */
  addContractActivity: function(contract) {
    Utils.clJ(contract);
    check(this.userId, String);
    check(contract, {
      id: String,
      isLive: Boolean
    });

    let servTime = new Date();

    let currentContract = Contracts.findOne(contract.id);
    Utils.cl("before break ---- normalisLive() "+currentContract.isLive());

    // if isLive is true, end of session
    if (contract.isLive === true) {

      let indexNum = _.size(currentContract.activities) - 1; // get index of latest

      // ToDo: For all Date/Time stuff, need to convert to Date object before saving
      let sessionStartDate = _.last(currentContract.activities).startStamp;
      
      let timeDiff = (servTime.getTime() - sessionStartDate.getTime());
      let updatedHours = (currentContract.currentHours + timeDiff);

      Utils.cl("ABOUT TO CLOSE CONTRACT __ INDEX: "+indexNum);
      let modifier = { $set: {} };
      modifier.$set["activities." + indexNum + ".endStamp"] = servTime;
      modifier.$set["activities." + indexNum + ".startStamp"] = sessionStartDate;
      modifier.$set["activities." + indexNum + ".sessionTime"] = parseInt(timeDiff);
      modifier.$set["isCurrentlyLive"] = false;
      modifier.$set["currentHours"] = parseInt(updatedHours);

      return Contracts.update({_id: contract.id }, modifier , function (error, result) {
            if (error) {
              throw new Meteor.Error("updateFailed", 'Contract Not Updated Properly ' + error);
            } else {
              Utils.cl("updated hours -- after CLOSE! "+result);
              return result;
            }
          });

    } else {

      //let thisis = {startStamp: servTime, endStamp: null, sessionTime: parseInt(0)};
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
              Utils.cl("Start! "+result);
              return result;
            }
          });
    }
  }
});
