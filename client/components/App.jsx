
// Subscribe to Contracts
Meteor.subscribe("allContracts");
Meteor.subscribe("allUsers");
Meteor.subscribe("userStatus");


// Initiate the App Clock //toDo- Can probably remove this package and just use the server sync time from Mizzao
appBarClock = new Chronos.Timer(1000); // initializing global app clock

let iconList = ["add_circle", "view_list", "attach_money"]; // list of icons that will be implemented
// Material-UI Componenets
const {RaisedButton, Checkbox, ListItem, List, AppCanvas, AppBar, Card, IconButton, LeftNav, Toggle, FontIcon} = MUI;
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

  renderContracts() {
    // Get contracts from this.data.contracts
    return this.data.contracts.map((contract) => {
      return <Contract key={contract._id} contract={contract} />;
    });
  },

  toggleIsLiveContract() {
    this.setState({
      liveContract: ! this.state.liveContract
    });
  },

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


  render() {

    let menuItems = [
      { route: 'get-started', text: 'Get Started' },
      { route: 'customization', text: 'Customization' },
      { route: 'components', text: 'Components' }
    ];

    let toggleStyle = {
      display: 'inline-block', width: 'auto'
    }

    return (
        <AppCanvas className="">
          <AppBar title="Studio Marchand Contract Management Center" onLeftIconButtonTouchTap={this.toggleLeftNav}>
            <div>TimeOffset: {TimeSync.serverOffset()}   |||   {this.data.currentTime.toString()}</div>

            <AccountsUIWrapper />

              <Toggle
                  style={toggleStyle}
                  isToggled={this.state.liveContract}
                  onToggle={this.toggleIsLiveContract} />

              <LiveLight
                  isLiveContract={this.state.liveContract} />

            <IconButton iconClassName="material-icons" tooltipPosition="bottom-center"
                        tooltip="Done">report_problem</IconButton>

          </AppBar>
          <div className="container">
          <div className="blocky"></div>


            <LeftNav ref="leftNav" docked={false} menuItems={menuItems} />

              <form className="new-contract" onSubmit={this.handleSubmit}>
                <input
                    type="text"
                    ref="textInput"
                    placeholder="Type to add new tasks"/>
              </form>

          <div className="row">
            {this.renderContracts()}
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