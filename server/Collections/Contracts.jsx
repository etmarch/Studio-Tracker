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
      clientName: clientName
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
      timeStamp: Date,
      isLive: Boolean
    });

    let numUpdates = 0;
    // if isLive is false, end of session, add new contractTime worked
    if (contract.isLive === false) {
      let currentContract = Contracts.findOne(contract.id);
      let sessionStartDate = moment(_.last(currentContract.activities).timeStamp);
      let currentSessionHours = moment(contract.timeStamp).diff(sessionStartDate, 'hours', true).toFixed(2);
      let updatedHours = (currentContract.currentHours + currentSessionHours);
      Utils.cl('start: '+sessionStartDate+'  updatedHours'+updatedHours.valueOf()+' '+typeof updatedHours+' '+currentSessionHours+' '+sessionStartDate.valueOf());

      numUpdates = Contracts.update(contract.id,
          {
            $addToSet: {
              activities: {"timeStamp": contract.timeStamp, "isLive": contract.isLive}
            },
            $set: {currentHours:updatedHours}
          }, function (error, result) {
            if (error) {
              throw new Meteor.Error("updateFailed", 'Contract Not Updated Properly ' + error);
            } else {
              Utils.cl(result);
            }
          });

    } else {

      numUpdates = Contracts.update(contract.id,
          {
            $addToSet: {
              activities: {"timeStamp": contract.timeStamp, "isLive": contract.isLive}
            }
          }, function (error, result) {
            if (error) {
              throw new Meteor.Error("updateFailed", 'Contract Not Updated Properly ' + error);
            } else {
              Utils.cl(result);
            }
          });
    }

    if (!!numUpdates && numUpdates === 1) {
      return "Success";
    }

  }
});