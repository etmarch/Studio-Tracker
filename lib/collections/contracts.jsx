/**
 * Contract Collection Code - BOTH
 */
Meteor.startup(() => {

});

// Define Contract Collection
Contracts = new Mongo.Collection("contracts");


// Collection Helpers
Contracts.helpers({
  isLive: function() {
    Utils.cl("Live Status: "+this.isCurrentlyLive);
    return this.isCurrentlyLive;
  }
});

// Attach Contract Schema
Contracts.attachSchema(new SimpleSchema({
  title: {
    type: String,
    max: 200,
    label: "Contract Title"
  },
  dateDue: { // ToDo: if updated, automatically create note with reason why it was pushed back
    type: Date,
    label: "Project Completion Date",
    denyUpdate: false
  },
  costEstimation: { // Estimation of how much materials will cost Studio Marchand
    type: Number,
    label: "Estimated total costs of Project",
    optional: true
  },
  // ToDo: List of common costs to choose from (Gas, Parking, etc..)
  costs: { // Array of all costs logged for this contract
    type: [Object],
    optional: true
  },
  'costs.$.date': { // Each new cost will have date automatically attached
    type: Date,
    optional: true
  },
  'costs.$.type': { // Message for what the cost was spent on
    type: String,
    optional: true,
    allowedValues: ['Materials', 'Parking', 'Gas', 'Lunch', 'Other']
  },
  'costs.$.amount': { // Actual monetary value
    type: Number,
    optional: true,
    decimal: true,
    min: 0,
    max: 10000
  },
  'costTotal': {
    type: Number,
    optional: true,
    decimal: true,
    defaultValue: 0
  },
  payments: { // Array of all costs logged for this contract
    type: [Object],
    optional: true
  },
  'payments.$.date': { // Each new cost will have date automatically attached
    type: Date,
    optional: true
  },
  'payments.$.note': { // Optional Note
    type: String,
    optional: true
  },
  'payments.$.amount': { // Actual monetary value
    type: Number,
    optional: true,
    decimal: true
  },
  price: { // price the client is being charged (price of the project according to contract)
    type: Number,
    label: "Price ($) of Project",
    min: 0
  },
  hourEstimation: {
    type: Number,
    label: "Estimate number of hours project will take",
    min: 0
  },
  notes: {
    type: [Object],
    label: "Comments/Notes",
    optional: true
  },
  'notes.$.time': {
    type: Date,
    optional: true
  },
  'notes.$.content': {
    type: String,
    optional: true
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
  clientName: {
    type: String,
    optional: true,
    denyUpdate: true
  },
  status: { // status of the contract - either 'active' or 'archived'
    type: String,
    optional: true,
    allowedValues: ['active', 'archived'],
    defaultValue: 'active'
  },
  isCurrentlyLive: {
    type: Boolean,
    optional: true,
    defaultValue: false
  },
  // ToDo: automatically update number when activity is posted
  currentMillisecs: {
    type: Number,
    decimal: true,
    optional: true,
    min: 0
  },
  activities: {
    type: Array,
    optional: true,
    blackbox: true,
    defaultValue: []
  },
  'activities.$': {
    type: Object,
    optional: true
  },
  'activities.$.startStamp': {
    type: Date,
    optional: true
  },
  'activities.$.endStamp': {
    type: Date,
    optional: true
  },
  'activities.$.sessionTime': { // In Milliseconds
    type: Number,
    optional: true,
    decimal: true
  },
  lastActive: { // Basically keeps track of last updated
    type: Date,
    optional: true,
    autoValue: function() {
      if (!this.isInsert) {
        return new Date;
      } else {
        this.unset();
      }
    }
  },
  address: {
    type: AddressSchema,
    optional: true
  }
}));

