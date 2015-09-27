// Defining routes for Flow Router

// Home - Dashboard
FlowRouter.route('/', {
  name: 'dashboard',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
    ReactLayout.render(App, { content: <Dashboard /> });
  }
});

// New Contract
FlowRouter.route('/contracts/add', {
  name: 'addContract ',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
  }
});

// Single Contract
FlowRouter.route('/contract/:_id', {
  name: 'showContract',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
  }
});

// Contract Listing
FlowRouter.route('/contracts', {
  name: 'contractsList',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
  }
});


// Expenses and Payments Listing Across all contracts
FlowRouter.route('/finances', {
  name: 'financesList',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
  }
});

// Expenses and Payments Listing Across all contracts
FlowRouter.route('/clients', {
  name: 'clientsList',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
  }
});

let renderLayoutWith = (component) => {
  ReactLayout.render(App, {
    component: component
  })
};