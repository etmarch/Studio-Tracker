/*
 * Header Component
 * Children: LiveLight, AccountsUI Wrapper, LeftNav
 * Data Needed: Reactive Current Time element, liveContract Boolean (Reactive)
 * Props: liveState - boolean - either show green light (live) or grey (no contracts live)
 */


// Pulling in the Material-Ui components
const {AppBar, LeftNav, FontIcon, IconButton} = MUI;

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
  onToggleLeftNav(e) {
    e.preventDefault();
    this.refs.leftNav.toggle();
  },

  // Handle clicks on links on the left menu
  onLeftNavChange(e, selectedIndex, menuItem) {
    //Utils.cl(e.target+"  Menu Item Object: "+JSON.stringify(menuItem));
    e.preventDefault();
    FlowRouter.go(menuItem.route);
  },

  _makeNav () {
    let theFontStyle = {
      top: 5,
      right: 2,
      color: 'rgba(0, 0, 0, 0.5)'
    };
    return (
        <span className="clockFont">
          <h3>
            <FontIcon className="material-icons schedule" style={theFontStyle}/>
            <span className="clock-components">{moment(this.data.currentTime).format("h:mm A")}</span>
            <span><FontIcon className="material-icons insert-invitation"
                            style={{right: '-5px', top: '5px', color: 'rgba(0, 0, 0, 0.4)'}}/> {moment(this.data.currentTime).format("Do MMMM")}</span>
          </h3>
        </span>);
  },

  render () {

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
                onLeftIconButtonTouchTap={this.onToggleLeftNav}
                className="container-fluid">

              {this._makeNav()}

              <LiveLight
                  isLiveContract={this.data.isLiveSession}/>

              <LeftNav
                  ref="leftNav"
                  docked={false}
                  menuItems={sideMenuLinks}
                  header={<h3 className='logo centered'>Navigation</h3>}
                  onChange={this.onLeftNavChange}/>

            </AppBar>
          </div>
      )
    }
  }
});

LiveLight = React.createClass({
  propTypes: {
    isLiveContract: React.PropTypes.bool
  },
  render() {
    let lightStyles = {
      display: 'inline-block',
      borderRadius: '50px',
      borderColor: 'grey',
      padding: '0px'
    };
    // checking if a contract is currently being worked on
    let lightClassName = this.props.isLiveContract ? "live-light active" : "live-light ";
    let iconClassName = this.props.isLiveContract ? "flash-on" : "flash-off";
    lightStyles.background = this.props.isLiveContract ? "lime" : "whitesmoke";



    return (

        <div className={lightClassName}>
          <IconButton
              style={lightStyles}
              touch={true}
              disabled={!this.props.isLiveContract}
              iconClassName={"material-icons "+iconClassName}
              tooltip={this.props.isLiveContract ? "Working!" : "Idle"}
              />
        </div>
    );
  }
});
