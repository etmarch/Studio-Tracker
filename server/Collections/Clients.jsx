/*
*
* Client (collection) Transforms, security on Collections in Server
*
*/

Clients.allow({
  insert: function (userId, doc) {
    return !!userId;
  },

  update: function (userId, doc, fields, modifier) {
    return !!userId;
  },

  remove: function (userId, doc) {
    return false;
  }
});


// Server-side Methods for handling Client data
Meteor.methods({
  clientInsert: function(client) {
    // check(this.userId, String);
    check(client, {
      email: String,
      phone: String,
      name: String,
      address: String,
      isContractor: Boolean
    });

    if (!this.userId) {
      throw new Meteor.Error(411, 'How did you get in here?');
    }
    if (!client.name) {
      throw new Meteor.Error(422, 'Name should not be blank');
    }
    if (!client.phone) {
      throw new Meteor.Error(422, 'Phone should not be blank');
    }
    if (!client.email) {
      throw new Meteor.Error(422, 'E-Mail should not be blank');
    }
    if (!client.address) {
      throw new Meteor.Error(422, 'Address should not be blank');
    }
    if (!client.isContractor) {
      throw new Meteor.Error(422, 'Is This a contractor?');
    }

    //ToDo: Make sure method is running on server and not client
    // https://github.com/themeteorchef/server-only-methods/blob/master/server/methods/update-user-name.js

    var clientId = Clients.insert(client);
    if (!clientId) {
      throw new Meteor.Error(422, 'Insert not done properly');
    } else {
      return clientId;
    }
  },

  updateClient: function(client) {
    //ToDo: Fill this function out to allow updating of clients
  }
});