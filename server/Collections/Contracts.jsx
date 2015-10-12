/*
 *
 * Contract Transforms, security on Collections in Server
 *
 */

Contracts.allow({
  insert: function (userId, doc) {
    return true;
  },

  update: function (userId, doc, fields, modifier) {
    return userId && doc.ownerId == userId;
  },

  remove: function (userId, doc) {
    return userId && doc.ownerId == userId;
  }
});