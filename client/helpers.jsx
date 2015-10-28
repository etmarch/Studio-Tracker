//Client Helpers for Formatting and Displaying Data

Helpers = {};

Helpers.formatDatePrimary = function(date) {
  return moment(date).format('h:mm A  dddd, MMMM Do YYYY');
};

Helpers.formatPhoneNumber = function(phone) {
  return ("("+ phone.substr(0, 3) +") "+phone.substr(3, 3)+"-"+phone.substr(6, 4));
};