/**
 * Meteor Methods - Both
 */

Meteor.methods({
  addContract(text) {
    if (! Meteor.userId()) { // Auth Check
      throw new Meteor.Error("not-authorized");
    }
    return Contracts.insert({
      text:text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },
  removeContract(contractId) {
    if (! Meteor.userId()) { // Auth Check
      throw new Meteor.Error("not-authorized");
    }
    return Contracts.remove({_id:contractId});
  },
  setChecked(contractId, setChecked) {
    Contracts.update(contractId, { $set: { checked: setChecked} });
  }
})