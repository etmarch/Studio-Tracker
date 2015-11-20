// Main App Component Wrapper - the main "layout"

// Material-UI Componenets
const {
    Styles,
    AppCanvas
    } = mui;


// Init the material-ui framework
const {ThemeManager} = Styles;

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
        let renderHTML = (<div className="btn btn-sm"> <AccountsUIWrapper /> </div>);
        // Take user to login page if not currently signed in

        return (
            <AppCanvas>
                <Header liveState={this.state.liveContract}/>

                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                            {this.data.currentUser ? this.props.content() : renderHTML }
                        </div>
                    </div>
                </div>
            </AppCanvas>
        );
    }
});
