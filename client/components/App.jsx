
// Subscribe to Contracts ToDo: Place these in better area
Meteor.subscribe("allContracts");
Meteor.subscribe("allUsers");
Meteor.subscribe("userStatus");


// Initiate the App Clock //toDo- Can probably remove this package and just use the server sync time from Mizzao
appBarClock = new Chronos.Timer(1000); // initializing global app clock

let iconList = ["add_circle", "view_list", "attach_money"]; // list of icons that will be implemented
// Material-UI Componenets
const {RaisedButton, FlatButton, Checkbox, Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator,
    DropDownMenu, ListItem, List, ListDivider, AppCanvas, AppBar, Avatar, Card, Dialog, IconButton, LeftNav, Toggle, FontIcon, Styles} = MUI;

// Reference Styles.Colors global variable
const Colors = MUI.Styles.Colors;

// Init the material-ui framework
const ThemeManager = new MUI.Styles.ThemeManager();

// App component - represents the whole app
App = React.createClass({
  // Material-UI integration
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Initialize the client-side checkbox filter
  getInitialState() {
    return {
      liveContract: false
    }
  },

  // Loads data from collections and puts them on this.data
  getMeteorData() {
    let query = {};
    return {
      contracts: Contracts.find(query, {sort: {createdAt: -1}}).fetch(),
      incompleteCount: Contracts.find({checked: {$ne: true}}).count(),
      currentUser: Meteor.user(),
      currentTime: appBarClock.time.get()
    }
  },

  _handleCustomDialogTouchTap() {
    this.refs.customDialog.show();
  },


  renderContracts() {
    // Get contracts from this.data.contracts
    return this.data.contracts.map((contract) => {
      //return <Contract key={contract._id} contract={contract} />;
      return <div><ListItem
          key={contract._id}
          primaryText={contract.text}
          initiallyOpen={true}
          leftCheckbox={<Checkbox name="checky" /> }
          secondaryText="Hey you how are you man hey you how are yu mna hey yu how are yu man"
          rightAvatar={<Avatar color={Colors.deepOrange300} backgroundColor={Colors.red300}></Avatar>} />
          <ListDivider inset={false} />
      </div>

    });
  },

  toggleIsLiveContract() {
    this.setState({
      liveContract: ! this.state.liveContract
    });
  },

  // Shows / hides the side menu
  toggleLeftNav() {
    this.refs.leftNav.toggle();
  },

  handleSubmit(event) {
    event.preventDefault();
    // Find the text field via the React ref
    var text = React.findDOMNode(this.refs.textInput).value.trim();

    let okay = Meteor.call("addContract", text); // call insert method
    // Clear form
    React.findDOMNode(this.refs.textInput).value = "";
    console.log("success? - "+okay);
  },

  // Handle clicks on links on the left menu
  leftNavChange(e, selectedIndex, menuItem) {
    Utils.cl(e.target+"  Menu Item Object: "+JSON.stringify(menuItem));
    FlowRouter.go(menuItem.route);
  },

  render() {

    // Sample Code for Links in the left hidden nav menu
    let menuItems = [
      { route: '/', text: 'New Contract' },
      { route: '/contracts/', text: 'Contracts' },
      { route: 'expensesList', text: 'Expenses' }
    ];

    // Sample code for menu items in a toolbar Toolbar
    let filterOptions = [
      { payload: '1', text: 'All Broadcasts' },
      { payload: '2', text: 'All Voice' },
      { payload: '3', text: 'All Text' },
      { payload: '4', text: 'Complete Voice' },
      { payload: '5', text: 'Complete Text' },
      { payload: '6', text: 'Active Voice' },
      { payload: '7', text: 'Active Text' }
    ];

    // Toggle button overwrite
    let toggleStyle = {
      display: 'inline-block', width: 'auto'
    }

    return (
        <AppCanvas className="">

          {/* ToDo: Migrate this into its own component  --   <AppHeader /> for example */}
          <AppBar title="Studio Marchand Contract Management Center" onLeftIconButtonTouchTap={this.toggleLeftNav} className="container-fluid">
            <div>TimeOffset: {TimeSync.serverOffset()}   <ToolbarSeparator/>   {moment(this.data.currentTime).format('hh:mm A L')}</div>

            <AccountsUIWrapper />

            <Toggle
                style={toggleStyle}
                isToggled={this.state.liveContract}
                onToggle={this.toggleIsLiveContract} />

            <LiveLight
                isLiveContract={this.state.liveContract} />

            <IconButton iconClassName="material-icons" tooltipPosition="bottom-center" tooltip="Done">report_problem</IconButton>
          </AppBar>



          <div className="container">
            <div className="blocky"></div>


            <Toolbar>
              <ToolbarGroup key={0} float="left">
                <DropDownMenu menuItems={filterOptions} />
                <ToolbarSeparator/>
                <ToolbarTitle text="SAMPLE HEADER" />
              </ToolbarGroup>
            </Toolbar>

            <LeftNav
                ref="leftNav"
                docked={false}
                menuItems={menuItems}
                onChange={this.leftNavChange} />

            <form className="new-contract" onSubmit={this.handleSubmit}>
              <input
                  type="text"
                  ref="textInput"
                  placeholder="Type to add new tasks"/>
            </form>

            <div className="row">
              <List subheader="Current Contracts">
                {this.renderContracts()}
              </List>
            </div>
          </div>
        </AppCanvas>
    );
  }
});

LiveLight = React.createClass({
  propTypes: {
    // This component gets the contract to display through a React prop.
    // We can use propTypes to indicate it is required
  },
  render() {
    // checking if a contract is currently being worked on
    const lightClassName = this.props.isLiveContract ? "live-light active" : "live-light ";

    return (
        <div className={lightClassName} />
    );
  }
});

/*Online? - {JSON.stringify(Meteor.user().status.online)} ||||   Time: {moment(TimeSync.serverTime(this.data.currentTime, 51000)).format()} | */