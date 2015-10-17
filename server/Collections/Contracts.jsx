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

    // ToDo: add additional security (relying on schemas right now)

    // Make sure method is running on server and not client
    // https://github.com/themeteorchef/server-only-methods/blob/master/server/methods/update-user-name.js

    var contractId = Contracts.insert(contract);
    if (!contractId) {
      throw new Meteor.Error(422, 'Insert not done properly');
    } else {
      return contractId;
    }
  }
});