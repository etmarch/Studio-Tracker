

Meteor.startup(() => {
  // If no accounts, create standard admin account
  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      username: "admin1@admin.com",
      password: "admin1"
    });
  }

});