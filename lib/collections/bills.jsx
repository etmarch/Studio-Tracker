/**
 * Bills Schema - BOTH
 *
 * 1 = Insurance
 * 2 = Rent
 * 3 = Employees
 * 4 = Verizon
 * 5 = Office Supplies
 * 6 = Taxes
 *
 */


// Define Contract Collection
Bills = new Mongo.Collection("bills");

// Attach Contract Schema
Bills.attachSchema(new SimpleSchema({
  note: {
    type: String,
    optional: true,
    max: 300,
    label: "Add note to bill"
  },
  type: { // What kind of overhead bill was payed
    type: Number,
    allowedValues: [1, 2, 3, 4, 5, 6], // see above for reference of numbers
    label: "Type of Bill"
    //optional: true
  },
  amount: { // Amount payed for the bill
    type: Number,
    label: "Price ($) of Project",
    min: 0,
    decimal: true
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
  }
}));
