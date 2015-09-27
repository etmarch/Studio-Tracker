// Seeding Collection Data for Development

Meteor.startup(() => {
  Utils.cl("Server Starting UP! -- Client Count: "+Clients.find().count());
  // Create the admin account
  if (Meteor.users.find().count() < 1) {
    Accounts.createUser({
      username: 'admin',
      password: 'admin1'
    });
  }

  // Create 5 clients
  if (Clients.find().count() < 1) {
    Utils.cl("Adding Clients + Contracts!");
    _.each(_.range(5), function () {
      var randomEmail = faker.internet.email();
      var randomName = faker.name.findName();
      var randomPhone = faker.random.number();

      var seedClientId = Clients.insert({
        email: randomEmail,
        name: randomName,
        phone: randomPhone
      });

      // create a contract for each
      var randomTitle = faker.finance.accountName();
      var randomDate = faker.date.future();
      var randomHours = faker.random.number();
      //var randomCompleteDate = faker.date.future();
      var randomPrice = faker.random.number();
      var newContractId = Contracts.insert({
        title: randomTitle,
        clientId: seedClientId,
        dateDue: randomDate,
        hoursEstimation: randomHours,
        price: randomPrice
      });

      // Log the created data Ids
      Utils.cl("Client: "+seedClientId+' contract: '+newContractId);

    });
  }
});