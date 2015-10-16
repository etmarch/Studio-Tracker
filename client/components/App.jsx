// Main App Component Wrapper - the main "layout"

//let iconList = ["add_circle", "view_list", "attach_money"]; // list of icons that will be implemented

// Material-UI Componenets
const {
    AppCanvas,
    Paper,
    Styles
    } = MUI;

// Reference Styles.Colors global variable
const Colors = MUI.Styles.Colors;

// Init the material-ui framework
const {ThemeManager, LightRawTheme} = Styles;

// App component - represents the whole app
App = React.createClass({
  // Material-UI integration
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  // Initialize the 'liveContract' App State
  getInitialState() {
    return {
      liveContract: false
    }
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user() // To check if current user is logged in
    }
  },

  render() {
    // Take user to login page if not currently signed in
    if (!this.data.currentUser) {
      return (<div className="btn btn-sm"> <AccountsUIWrapper /> </div>)
    } else {
      return (
          <div>
            <Header liveState={this.state.liveContract}/>

            <Paper zDepth={1} className="main container">
              {this.props.content()}
            </Paper>
          </div>
      );
    }
  }
});
