// clients collection

// Define Client Collection
Clients = new Mongo.Collection("clients");

// Attach Client Schema
Clients.attachSchema(new SimpleSchema({
  name: {
    type: String,
    max: 200,
    label: "Client Name"
  },
  address: {
    type: String,
    optional: true,
    max: 200,
    label: "Client Address"
  },
  phone: {
    type: String,
    optional: true,
    label: "Client Phone Number"
  },
  email: {
    type: String,
    optional: true,
    label: "Client Email",
    regEx: SimpleSchema.RegEx.Email
  },
  contractIds: { // Array of all contract Ids attached to a client
    type: [String],
    optional: true,
    regEx: SimpleSchema.RegEx.Id
  }
}));
