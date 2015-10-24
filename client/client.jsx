
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

  Tracker.autorun(function() {
    let handle = Meteor.subscribe('allContracts');
    if (handle.ready()) {
      let isLive = Contracts.find({_id: 'PcefmjhCAjWvEgG2a'},{limit: 1}).fetch();
      Utils.cl("-------- AUTORUN ---------")
      Utils.clJ(isLive);
      isLive[0].isCurrentlyLive === false ? Session.set('isLive', false) : Session.set('isLive', true);
      Utils.cl(isLive[0].isCurrentlyLive);
    }
  });

  TimeSync.loggingEnabled = false;
});



// AccountsUI config toDo: Disable registration (since its internal app)
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});