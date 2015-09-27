/**
 * Contract Collection Code - BOTH
 */


// Define Contract Collection
Contracts = new Mongo.Collection("contracts");

// Attach Contract Schema
Contracts.attachSchema(new SimpleSchema({
  title: {
    type: String,
    max: 200,
    label: "Contract Title"
  },
  dateDue: {
    type: Date,
    label: "Project Completion Date"
  },
  costEstimation: { // Estimation of how much materials will cost Studio Marchand
    type: Number,
    label: "Estimated total costs of Project"
  },
  costs: { // Array of all costs logged for this contract
    type: [Object],
    optional: true
  },
  'costs.$.date': { // Each new cost will have date automatically attached
    type: Date,
    optional: true
  },
  'costs.$.content': { // Message for what the cost was spent on
    type: String,
    optional: true
  },
  'costs.$.price': { // Price of whatever the cost for the project was
    type: Number,
    optional: true
  },
  price: { // price the client is being charged (price of the project according to contract)
    type: Number,
    label: "Price ($) of Project",
    min: 0
  },
  hoursEstimation: {
    type: Number,
    label: "Estimate number of hours project will take",
    min: 0
  },
  notes: {
    type: String,
    label: "Comments/Notes"
  },
  createdAt: {
    type: Date,
    optional: true,
    denyUpdate: true,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Moment()};
      } else {
        this.unset();
      }
    }
  },
  dateCompleted: {
    type: Date,
    optional: true,
    denyUpdate: true
  },
  clientId: { // Attach the contract to a client
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    optional: false,
    denyUpdate: true
  },
  status: { // status of the contract - either 'active' or 'archived'
    type: String,
    optional: true,
    allowedValues: ['active', 'archived']
  },
  // Keeping track of hours worked for this contract
  // ToDo: May be better formatted as an array of objects logging start/stop times for 'live'
  // For Now:
  currentHours: {
    type: Number,
    optional: true,
    min: 0
  }
}));
