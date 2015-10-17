// Defining routes for Flow Router

// GLobal Subscription
/*
 FlowRouter.subscriptions = function() {
 this.register('allContracts', Meteor.subscribe('allContracts'));
 };
 */

// Setting the class on the root element
ReactLayout.setRootProps({
  className: "app-canvas"
});

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
  action: function(params) {
    //Utils.cl(this.name+'  '+JSON.stringify(params));
    ReactLayout.render(App, {
          content() {
            return <ContractSingle contractId={params._id} />;
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


// Single Client Route
FlowRouter.route('/clients/:_id', {
  name: 'client',
  action: function(params) {
    ReactLayout.render(App, {
          content() {
            return <ClientSingle clientId={params._id} />;
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