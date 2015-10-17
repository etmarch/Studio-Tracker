/*
 * Header Component
 * Children: LiveLight, AccountsUI Wrapper, LeftNav
 * Data Needed: Reactive Current Time element, liveContract Boolean (Reactive)
 * Props: liveState - boolean - either show green light (live) or grey (no contracts live)
 */


// Pulling in the Material-Ui components
const {AppBar, LeftNav, FontIcon, Paper} = MUI;

Header = React.createClass({

  propTypes: {
    liveState: React.PropTypes.bool
  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    return {
      currentUser: Meteor.user(),
      currentTime: TimeSync.serverTime(null, 1000),
      isLiveSession: Session.get('isLive')
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

    let fontStyle = {
      top: 5,
      right: 2,
      color: 'rgba(0, 0, 0, 0.5)'
    }

    let clockPanel = (
          <span className="clockFont"><h3>
            <FontIcon className="material-icons schedule" style={fontStyle} />
            {moment(this.data.currentTime).format("h:mm A  dddd, MMMM Do YYYY")}</h3>
          </span>
    );

    // Sample Code for Links in the left hidden nav menu
    let sideMenuLinks = [
      { route: '/', text: 'Home' },
      { route: '/contracts', text: 'Contracts' },
      { route: '/contracts/add', text: 'New Contract' },
      { route: '/clients', text: 'Clients' },
      { route: '/finances', text: 'Finances' }
    ];


    if (this.data.contractsLoading) {
      return (<Loading />);
    } else {
      return (
          <div>
            <AppBar
                title="Studio Tracker"
                onLeftIconButtonTouchTap={this._toggleLeftNav}
                className="container-fluid">

              {clockPanel}

              <LiveLight
                  isLiveContract={this.data.isLiveSession}/>

            </AppBar>

            <LeftNav
                ref="leftNav"
                docked={false}
                menuItems={sideMenuLinks}
                header={<h3 className='logo centered'>Navigation</h3>}
                onChange={this._leftNavChange}/>
          </div>
      )
    }
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