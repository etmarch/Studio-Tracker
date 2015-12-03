/**
 * Publishing in the server
 */

// Publish the most recently active Contract
Meteor.publish('lastActive', function () {
  if (!this.userId)
    this.error(new Meteor.Error(401, "You can't get that data!"));

  //Utils.cl("PUB: mongo config last active Id: "+MongoConfig.getKey('lastActiveId'));
  const lastId = MongoConfig.getKey('lastActiveId');
  if ((!!lastId) && lastId !== null) {
    return Contracts.find({_id: lastId});
  }
  return this.ready();
});

Meteor.publish("allContracts", function () {
  Meteor._sleepForMs(400); // Simulate Loading
  if (!this.userId)
    this.error(new Meteor.Error(401, "You can't get that data!"));
  return Contracts.find();
});

Meteor.publish("allClients", function () {
  Meteor._sleepForMs(1000);
  if (!this.userId)
    this.error(new Meteor.Error(401, "You can't get that data!"));
  return Clients.find();
});

Meteor.publish("singleContract", function (contractId) {
  Meteor._sleepForMs(1000);
  if (!this.userId)
    this.error(new Meteor.Error(401, "You can't get that data!"));
  return Contracts.find({_id: contractId});
});

Meteor.publish("singleClient", function (clientId) {
  Meteor._sleepForMs(500);
  if (!this.userId)
    this.error(new Meteor.Error(401, "You can't get that data!"));
  return Clients.find({_id: clientId});
});

Meteor.publish("singleClientContracts", function (clientId) {
  Meteor._sleepForMs(500);
  if (!this.userId)
    this.error(new Meteor.Error(401, "You can't get that data!"));
  return Contracts.find({clientId: clientId});
});

// All user data - for dev purposes only
Meteor.publish("allUsers", function() {
  //Meteor._sleepForMs(1000);
  if (!this.userId)
    this.error(new Meteor.Error(401, "You can't get that data!"));
  return Meteor.users.find();
});

// User Status and when they were last online
Meteor.publish("userStatus", function() {
  //Meteor._sleepForMs(1000);
  if (!this.userId)
    this.error(new Meteor.Error(401, "You can't get that data!"));
  return Meteor.users.find({ "status.online": true });
});