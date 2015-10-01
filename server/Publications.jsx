/**
 * Publishing in the server
 */

Meteor.publish("allContracts", function () {
  //Meteor._sleepForMs(1000); // Simulate Loading
  return Contracts.find();
});

Meteor.publish("allClients", function () {
  Meteor._sleepForMs(1000);
  return Clients.find();
});

Meteor.publish("singleContract", function (contractId) {
  Meteor._sleepForMs(1000);
  return Contracts.find({_id: contractId});
});

Meteor.publish("singleClient", function (clientId) {
  Meteor._sleepForMs(1000);
  return Clients.find({_id: clientId});
});

// All user data - for dev purposes only
Meteor.publish("allUsers", function() {
  //Meteor._sleepForMs(1000);
  return Meteor.users.find();
});

// User Status and when they were last online
Meteor.publish("userStatus", function() {
  //Meteor._sleepForMs(1000);
  return Meteor.users.find({ "status.online": true });
});