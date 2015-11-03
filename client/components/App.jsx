// Main App Component Wrapper - the main "layout"

// Material-UI Componenets
const {
    Styles
    } = MUI;


// Init the material-ui framework
const {ThemeManager, LightRawTheme, DarkRawTheme} = Styles;

// App component - represents the whole app
App = React.createClass({
  // Material-UI integration
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(myTheme)
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
    let handle = Meteor.subscribe('lastActive');
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

            <div className="container">
              <div className="content">
                {this.props.content()}
              </div>
            </div>
          </div>
      );
    }
  }
});
