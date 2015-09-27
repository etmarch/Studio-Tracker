// Defining routes for Flow Router

// GLobal Subscription
/*
FlowRouter.subscriptions = function() {
  this.register('allContracts', Meteor.subscribe('allContracts'));
};
*/

// Home - Dashboard
FlowRouter.route('/', {
  name: 'dashboard',
  subscriptions: function(params) { // Not working !!
    this.register('allContracts', Meteor.subscribe('allConracts'));
  },
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
    renderLayoutWith(<Dashboard />);
  }
});

// New Contract
FlowRouter.route('/contracts/add', {
  name: 'addContract ',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
    renderLayoutWith(<Loading />);
  }
});

// Single Contract
FlowRouter.route('/contract/:_id', {
  name: 'showContract',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
    renderLayoutWith(<Dashboard />);
  }
});

// Contract Listing
FlowRouter.route('/contracts', {
  name: 'contractsList',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
    renderLayoutWith(<Dashboard />);
  }
});


// Expenses and Payments Listing Across all contracts
FlowRouter.route('/finances', {
  name: 'financesList',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
    renderLayoutWith(<Dashboard />);
  }
});

// Expenses and Payments Listing Across all contracts
FlowRouter.route('/clients', {
  name: 'clientsList',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
    renderLayoutWith(<Dashboard />);
  }
});

let renderLayoutWith = (component) => {
  ReactLayout.render(App, {
    content: component
  })
};