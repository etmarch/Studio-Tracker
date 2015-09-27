/*
 * Header Component
 * Children: LiveLight, AccountsUI Wrapper, LeftNav
 * Data Needed: Reactive Current Time element, liveContract Boolean (Reactive)
 *
 */


// Pulling in the Material-Ui components
const {AppBar, LeftNav, FontIcon} = MUI;

Header = React.createClass({

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Loads data from collections and puts them on this.data
  getMeteorData() {
    let query = {};
    return {
      currentUser: Meteor.user(),
      currentTime: appBarClock.time.get()
    }
  },

  // Shows / hides the side menu
  _toggleLeftNav(e) {
    e.preventDefault();
    this.refs.leftNav.toggle();
  },

  // Handle clicks on links on the left menu
  _leftNavChange(e, selectedIndex, menuItem) {
    //Utils.cl(e.target+"  Menu Item Object: "+JSON.stringify(menuItem));
    e.preventDefault();
    FlowRouter.go(menuItem.route);
  },

  render () {

    // Sample Code for Links in the left hidden nav menu
    let sideMenuLinks = [
      { route: '/', text: 'Home' },
      { route: '/contracts', text: 'Contracts' },
      { route: '/contracts/add', text: 'New Contract' },
      { route: '/finances', text: 'Finances' }
    ];


    return (
        <div>
          <AppBar
              title="Studio Marchand Contract Manager"
              onLeftIconButtonTouchTap={this._toggleLeftNav}
              className="container-fluid">

            <span className="panel panel-default">{moment(TimeSync.serverTime()).format('hh:mm s A L')}</span>

            <AccountsUIWrapper />

            <LiveLight
                isLiveContract={this.props.liveContract} />

          </AppBar>

          <LeftNav
              ref="leftNav"
              docked={false}
              menuItems={sideMenuLinks}
              header={<h3 className='logo'>Navigation</h3>}
              onChange={this._leftNavChange} />
        </div>
    )
  }
});

LiveLight = React.createClass({
  propTypes: {
    // This component gets the contract to display through a React prop.
  },
  render() {
    // checking if a contract is currently being worked on
    const lightClassName = this.props.isLiveContract ? "live-light active" : "live-light ";

    return (
        <div className={lightClassName} />
    );
  }
});