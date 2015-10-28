// App-wide utility functions and helpers

Utils = {};

/*
 * DEBUGGING + LOGGING HELPERS
 */

// normal console.log
Utils.cl = function(output) {
  console.log(output);
};

// Log JSON objects clearly.
Utils.clJ = function(output) {
  console.log(JSON.stringify(output));
};

// get object keys
Utils.fGetKeys = function(obj){
  var keys = [];
  for(var key in obj){
    keys.push(key);
  }
  return keys;
};

// list all properties in an object
Utils.listAllProperties = function(o){
  var objectToInspect;
  var result = [];
  for(objectToInspect = o; objectToInspect !== null; objectToInspect = Object.getPrototypeOf(objectToInspect)){
    result = result.concat(Object.getOwnPropertyNames(objectToInspect));
  }
  return result;
};


/*
 * COLLECTION DATA HELPERS
 */

// Returns the client name after being passed in the clients ID
Utils.getClientName = function(clientId) {
  return Clients.findOne(clientId).name;
};

/* **NOT IN USE
Utils.isLiveQuery = function(activities) {
  let activityList = activities;
  let numIndex = _.size(activityList) -1;
  if (numIndex === 0 || !numIndex) {
    Utils.cl("No activities  --  Utils.isLiveQuery");
    return false;
  }
  let liveStatus = activityList[numIndex].isLive;
  Utils.cl("---- The Status of last activity ----"+liveStatus);
};
*/

// helper for mutating moment date to normal date for DB storage
Utils.backToDate = function(momentDate) {
  return (momentDate).toDate();
};

/*
*** Examples of dealing with connection lost and connection regained

Meteor.users.find({ "status.online": true }).observe({
  added: function(id) {
    Utils.cl("User Status Online!: "+JSON.stringify(id.status.online));
  },
  removed: function(id) {
    // id just went offline
    Utils.cl("User Status Offline!: "+JSON.stringify(id.status.online));
  }
});

UserStatus.events.on("connectionLogin", function(fields) {
  Utils.cl("User Status Online!: "+JSON.stringify(fields));
});

UserStatus.events.on("connectionLogout", function(fields) {
  Utils.cl("User Status logout!: "+JSON.stringify(fields));
});*/
