// Login Component
Login = React.createClass({
    // Material-UI integration
    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    getChildContext: function() {
        return {
            muiTheme: ThemeManager.getMuiTheme(myTheme)
        };
    },

    mixins: [ReactMeteorData],

    getMeteorData() {},

    handleLogin(){
        FlowRouter.go('/');
    },

    render() {

        return (
            <div>
                <Accounts.ui.LoginFormSet redirect={handleLogin}/>
            </div>
        );
    }

});
