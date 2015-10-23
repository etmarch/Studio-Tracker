//Client Helpers for Formatting and Displaying Data

formatDatePrimary = function(date) {
  return moment(date).format('h:mm A  dddd, MMMM Do YYYY');
}