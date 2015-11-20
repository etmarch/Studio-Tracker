/*
 *   ROUTER - /lib/
 */



let Colors = MUI.Styles.Colors; // Pull in Colors for root styling

//DocHead calls to set <head> element correctly

DocHead.addMeta({name: "viewport", content: "width=device-width, initial-scale=1"});

// Set Font

DocHead.addLink({
  rel: "stylesheet",
  type: "text/css",
  href: "https://fonts.googleapis.com/css?family=Roboto:400,300,500"
});

// Load Bootstrap
/*
DocHead.addLink({
  rel: "stylesheet",
  type: "text/css",
  href: "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css"
});*/


// Load Material Icons
DocHead.addLink({
  rel: "stylesheet",
  type: "text/css",
  href: "https://fonts.googleapis.com/icon?family=Material+Icons"
});


// Setting the class on the root element
ReactLayout.setRootProps({
  className: "app-canvas"
});


/*
*   Defining Routes for Flow Router
*/

// Home - Dashboard
FlowRouter.route('/', {
  name: 'dashboard',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
    DocHead.setTitle("Dashboard");
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
    DocHead.setTitle("Contracts");
    Utils.cl(this.name+'  '+JSON.stringify(params));
    renderLayoutWith(<Dashboard />);
  }
});


// New Contract
FlowRouter.route('/contracts/add', {
  name: 'addContract ',
  action: function(params) {
    Utils.cl(this.name+'  '+JSON.stringify(params));
    DocHead.setTitle("Add Contract");
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
    DocHead.setTitle("Contract "+params._id);
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
    DocHead.setTitle("Clients");
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
    DocHead.setTitle("Client - "+params._id);
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