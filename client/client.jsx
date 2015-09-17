
Meteor.startup(function () {
  injectTapEventPlugin();
  // Use Meteor.startup to render the component after the page is ready
  React.render(<App />, document.getElementById("app-wrapper"));
  // start the clock when he client is ready
  appBarClock.start();
});


// Subscribe to Contracts
Meteor.subscribe("allContracts");
Meteor.subscribe("allUsers");
Meteor.subscribe("userStatus");

// AccountsUI config
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});