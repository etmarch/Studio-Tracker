/**
 * Publishing in the server
 */

Meteor.publish("allContracts", function () {
  Meteor._sleepForMs(2000); // Simulate Loading
  return Contracts.find();
});

Meteor.publish("allClients", function () {
  return Clients.find();
});

Meteor.publish("singleContract", function (contractId) {
  return Contracts.find({_id: contractId});
});

Meteor.publish("singleClient", function (clientId) {
  return Clients.find({_id: clientId});
});

// All user data - for dev purposes only
Meteor.publish("allUsers", function() {
  return Meteor.users.find();
});

// User Status and when they were last online
Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});