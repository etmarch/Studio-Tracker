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
      var randomPhone = faker.phone.phoneNumberFormat();
      let randomAddress = (faker.address.streetAddress()+' '+faker.address.city());

      var seedClientId = Clients.insert({
        email: randomEmail,
        name: randomName,
        phone: randomPhone,
        address: randomAddress
      });

      // create a contract for each
      var randomTitle = faker.finance.accountName();
      var randomDate = faker.date.future();
      var randomHours = _.random(300, 1000);
      let seedStatus = 'active';
      var randomPrice = _.random(10000, 35000);
      let randCostEstimate = _.random(5000, 15000);
      let noteTime = new Date();
      let noteMessage = faker.lorem.sentence();
      var newContractId = Contracts.insert({
        title: randomTitle,
        clientId: seedClientId,
        dateDue: randomDate,
        hoursEstimation: randomHours,
        price: randomPrice,
        costEstimation: randCostEstimate,
        status: seedStatus,
        notes: [
          {time: noteTime,
          content: noteMessage}
        ],
        costs: [{
          date: new Date(),
          content: faker.lorem.sentence(),
          amount: _.random(50, 250)
        }],
        currentHours: _.random(5, 50)
      });

      // Log the created data Ids
      Utils.cl("Client: "+seedClientId+' contract: '+newContractId);

    });
  }
});