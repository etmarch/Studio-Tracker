// Contains the top App Bar - also the "live light" component

// Pulling in the Material-Ui components
const {AppBar, LeftNav, FontIcon} = MUI;

Header = React.createClass({

  // Shows / hides the side menu
  toggleLeftNav() {
    this.refs.leftNav.toggle();
  },

  // Handle clicks on links on the left menu
  leftNavChange(e, selectedIndex, menuItem) {
    //Utils.cl(e.target+"  Menu Item Object: "+JSON.stringify(menuItem));
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
            onLeftIconButtonTouchTap={this.toggleLeftNav}
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
              header={<div className='logo'>Header Title.</div>}
              onChange={this.leftNavChange} />
        </div>
    )
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