// clients collection

// Address Schema, also used in Contracts Schema
AddressSchema = new SimpleSchema({
  street: {
    type: String,
    max: 100
  },
  city: {
    type: String,
    max: 50
  },
  state: {
    type: String,
    regEx: /^A[LKSZRAEP]|C[AOT]|D[EC]|F[LM]|G[AU]|HI|I[ADLN]|K[SY]|LA|M[ADEHINOPST]|N[CDEHJMVY]|O[HKR]|P[ARW]|RI|S[CD]|T[NX]|UT|V[AIT]|W[AIVY]$/
  },
  zip: {
    type: String,
    regEx: /^[0-9]{5}$/
  }
});


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
    type: AddressSchema,
    optional: true,
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
  isContractor: {
    type: Boolean,
    label: "Is Contractor"
  },
  contractIds: { // Array of all contract Ids attached to a client
    type: [String],
    optional: true,
    regEx: SimpleSchema.RegEx.Id
  }
}));


