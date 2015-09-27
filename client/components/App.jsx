
// Subscribe to Contracts ToDo: Place these in better area
Meteor.subscribe("allContracts");
Meteor.subscribe("allUsers");
Meteor.subscribe("userStatus");


// Initiate the App Clock //toDo- Can probably remove this package and just use the server sync time from Mizzao
appBarClock = new Chronos.Timer(1000); // initializing global app clock

let iconList = ["add_circle", "view_list", "attach_money"]; // list of icons that will be implemented

// Material-UI Componenets
const {RaisedButton, FlatButton, Checkbox, Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator,
    DropDownMenu, ListItem, List, ListDivider, AppCanvas, Avatar, Card, Dialog, IconButton,
    FontIcon, Styles} = MUI;

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

  // Initialize the 'liveContract' App State
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
      currentUser: Meteor.user(),
      currentTime: appBarClock.time.get()
    }
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

  render() {

    return (
        <AppCanvas className="">
          <Header liveState={this.state.liveContract} />

          <div className="container">
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


/*Online? - {JSON.stringify(Meteor.user().status.online)} ||||   Time: {moment(TimeSync.serverTime(this.data.currentTime, 51000)).format()} | */