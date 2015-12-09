
Meteor.startup(function () {
  injectTapEventPlugin(); // Workaround for Material-UI lib
  // sAlert package config options

  Session.setDefault('isLive', MongoConfig.getKey('isCurrentlyLive'));

  TimeSync.loggingEnabled = false;
});


// AccountsUI config toDo: Disable registration (since its internal app)
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});



Tracker.autorun(function() {
  Utils.cl("-------- AUTORUN STARTING---------");
  let handle = Meteor.subscribe('lastActive');
   if (handle.ready()) {
   Session.set('isLive', MongoConfig.getKey('isCurrentlyLive'));
   }
  //Session.set('isLive', MongoConfig.getKey('isCurrentlyLive'));
});
