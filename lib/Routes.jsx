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
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
    ReactLayout.render(App, {
          content() {
            return <Dashboard />;
          }
        }
    );
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


// New Contract
FlowRouter.route('/contracts/add', {
  name: 'addContract ',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
    //renderLayoutWith(<ContractAdd />);
    ReactLayout.render(App, {
          content() {
            return <ContractAdd />;
          }
        }
    );
  }
});

// Single Contract
FlowRouter.route('/contracts/:_id', {
  name: 'contractSingle',
  subscriptions: function(params) {
    //this.register('singleContract', Meteor.subscribe('singleContract', params._id));
  },
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
    ReactLayout.render(App, {
          content() {
            return <ContractSingle _id={params._id} />;
          }
        }
    );
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
    ReactLayout.render(App, {
          content() {
            return <ClientListing />;
          }
        }
    );
  }
});

// **NOT WORKING CORRECTLY FOR SOME REASON
let renderLayoutWith = (component) => {
  ReactLayout.render(App, {
    content() {
      return component;
    }
  });
};