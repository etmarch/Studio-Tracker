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
      note: Object,
      clientId: String
    });

    // ToDo: add additional security (relying on schemas right now)

    //Utils.clJ(contract);

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
  }
});