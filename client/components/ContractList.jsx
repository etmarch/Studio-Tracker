// Dashboard Page/Component Route


const {SvgIcons} = MUI.Libs;

const {
    List,
    ListItem,
    ListDivider,
    Styles,
    FontIcon
    } = MUI;

// Init the material-ui framework
const {ThemeManager, LightRawTheme} = Styles;

ContractList = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData, TimerMixin, TrackerReact],

  // Retrieve the required data
  getMeteorData() {
    let query = {};
    let handleCon = Meteor.subscribe("allContracts");
    let handleCli = Meteor.subscribe("allClients");
    return {
      //contracts: Contracts.find(query, {sort: {createdAt: -1}}).fetch(),
      contractsLoading: ! (handleCon.ready() && handleCli.ready())
    }
  },

  contractList() {
    return Contracts.find({}).fetch();
  },

  _navigateToContract(event) {
    event.preventDefault();
    FlowRouter.go(`/contracts/${ this.props._id }`);
  },

  renderContracts() {
    // Get contracts from this.data.contracts
    return this.contractList().map((contract) => {
      let contractPath = `/contracts/${ contract._id}`;
      return <ListItem
          key={contract._id}
          primaryText={<a href={contractPath}>{contract.title}</a>}
          //onTouch={this._navigateToContract}
          initiallyOpen={false}
          disabled={true}
          secondaryText={"Started: "+moment(contract.dateDue).format('hh:mm:ss A L')}
          rightIcon={<a href={contractPath}><SvgIcons.HardwareKeyboardArrowRight /></a>} >
        <ListDivider inset={false} />
      </ListItem>
    });
  },

  render () {
    let contracts = this.renderContracts();
    if (this.data.contractsLoading) {
      return (<Loading />);
    } else {
      return (
          <div className="">
              <h3>Welcome, Marcel</h3>
              <div className="">
                <p>Recently Live</p>
                <p>Contract Name</p>
              </div>
            <List subheader="Current Contracts">
              {contracts}
            </List>
          </div>
      )
    }
  }
});