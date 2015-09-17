/**
 * Collections Code - BOTH
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
  price: {
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
  }
}));
