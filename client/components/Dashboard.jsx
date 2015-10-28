// Dashboard Page/Component Route


const Colors = MUI.Styles.Colors;

const {
    Avatar,
    Checkbox,
    List,
    ListItem,
    ListDivider,
    FlatButton,
    Styles,
    FontIcon
    } = MUI;

// Init the material-ui framework
const {ThemeManager, LightRawTheme} = Styles;

Dashboard = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Retrieve the required data
  getMeteorData() {
    let query = {};
    let handleCon = Meteor.subscribe("allContracts");
    let handleCli = Meteor.subscribe("allClients");
    return {
      contracts: Contracts.find(query, {sort: {createdAt: -1}}).fetch(),
      contractsLoading: ! (handleCon.ready() && handleCli.ready())
    }
  },

  _navigateToContract(event) {
    event.preventDefault();
    FlowRouter.go(`/contracts/${ this.props._id }`);
  },

  renderContracts() {
    // Get contracts from this.data.contracts
    return this.data.contracts.map((contract) => {
      let contractPath = `/contracts/${ contract._id}`;
      return <div><ListItem
          key={contract._id}
          primaryText={<a href={contractPath}>{contract.title}</a>}
          //onTouch={this._navigateToContract}
          initiallyOpen={false}
          disabled={true}
          secondaryText={"Started: "+moment(contract.dateDue).format('hh:mm:ss A L')}
          rightIcon={<a href={contractPath}><FontIcon className="material-icons keyboard-arrow-right" style={{"left":"-.2em"}}/></a>} />
        <ListDivider inset={false} />
      </div>
    });
  },

  render () {
    let contracts = this.renderContracts();
    if (this.data.contractsLoading) {
      return (<Loading />);
    } else {
      return (
          <div className="row">
            <div className="jumbotron">
              <h3>Welcome, Marcel</h3>
              <div className="panel panel-default">
                <p>Recently Live</p>
                <p>Contract Name</p>
              </div>
            </div>
            <List subheader="Current Contracts">
              {contracts}
            </List>
          </div>
      )
    }
  }
});