
Meteor.startup(function () {
  injectTapEventPlugin(); // Workaround for Material-UI lib
  // sAlert package config options
  sAlert.config({
    effect: '',
    position: 'top-right',
    timeout: 5000,
    html: false,
    onRouteClose: true,
    stack: true,
    offset: 0, // in px - will be added to first alert (bottom or top - depends of the position in config)
    beep: false
    // examples:
    // beep: '/beep.mp3'  // or you can pass an object:
    // beep: {
    //     info: '/beep-info.mp3',
    //     error: '/beep-error.mp3',
    //     success: '/beep-success.mp3',
    //     warning: '/beep-warning.mp3'
    // }
  });

  Session.setDefault('isLive', false);

  Tracker.autorun(function() {
    Utils.cl("-------- AUTORUN STARTING---------")
    let handle = Meteor.subscribe('lastActive');
    if (handle.ready()) {
      let isLive = Contracts.find({},{limit: 1}).fetch()[0];
      if (!!isLive && _.size(isLive) > 0) {
        Utils.cl("-------- CONTRACT IS FOUND!! ---------");
        Utils.clJ(isLive);
        isLive.isCurrentlyLive === false ? Session.set('isLive', false) : Session.set('isLive', true);
        Utils.cl("Client autorun -- isLive?: " + isLive.isCurrentlyLive+'   is the Session Live?  '+Session.get('isLive'));
      } else {
        Utils.cl("No Last active yet!!");
      }
    }
  });

  TimeSync.loggingEnabled = false;
});


// AccountsUI config toDo: Disable registration (since its internal app)
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});