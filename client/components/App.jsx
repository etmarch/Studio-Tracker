
// Initiate the App Clock //toDo- Can probably remove this package and just use the server sync time from Mizzao
//appBarClock = new Chronos.Timer(1000); // initializing global app clock

let iconList = ["add_circle", "view_list", "attach_money"]; // list of icons that will be implemented

// Material-UI Componenets
const {AppCanvas} = MUI;

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

  // Initialize the 'liveContract' App State
  getInitialState() {
    return {
      liveContract: false
    }
  },

  render() {

    return (
        <AppCanvas className="">
          <Header liveState={this.state.liveContract} />

          <div className="container">
            {this.props.content}
          </div>
        </AppCanvas>
    );
  }
});


/*Online? - {JSON.stringify(Meteor.user().status.online)} ||||   Time: {moment(TimeSync.serverTime(this.data.currentTime, 51000)).format()} | */