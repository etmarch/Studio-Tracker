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
  contractIds: { // Array of all contract Ids attached to a client
    type: [String],
    optional: true
  }
}));
