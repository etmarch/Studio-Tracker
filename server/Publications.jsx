/**
 * Publishing in the server
 */

// Publish Contracts
Meteor.publish("allContracts", function () {
  return Contracts.find();
});

// All user data - for dev purposes only
Meteor.publish("allUsers", function() {
  return Meteor.users.find();
});

// User Status and when they were last online
Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});