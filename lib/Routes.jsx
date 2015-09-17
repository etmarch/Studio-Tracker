// Defining routes for Flow Router

// Home - Dashboard
FlowRouter.route('/', {
  name: 'dashboard',
  action: function(params) {
    Utils.cl("dashboard - "+JSON.stringify(params));
  }
});

// New Contract
FlowRouter.route('/contracts/add', {
  name: 'addContract ',
  action: function(params) {
    Utils.cl("Add Contract Form - "+JSON.stringify(params));
  }
});

// Single Contract
FlowRouter.route('/contract/:_id', {
  name: 'showContract',
  action: function(params) {
    Utils.cl("Single Contract - "+JSON.stringify(params));
  }
});

// Contract Listing
FlowRouter.route('/contracts', {
  name: 'contractsList',
  action: function(params) {
    Utils.cl("Contract List - "+JSON.stringify(params));
  }
});


// Expenses Listing
FlowRouter.route('/expenses', {
  name: 'expensesList',
  action: function(params) {
    Utils.cl("Expenses Listing - "+JSON.stringify(params));
  }
});

let renderLayoutWith = (component) => {

};