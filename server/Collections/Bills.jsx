/*
 *
 * Bills Transforms, security on Collections in Server
 *
 */

Bills.allow({
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