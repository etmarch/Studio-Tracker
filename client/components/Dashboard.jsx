// Dashboard Page/Component Route


const Colors = MUI.Styles.Colors;

const {
    Avatar,
    Checkbox,
    List,
    ListItem,
    ListDivider,
    FlatButton,
    Styles
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
    //event.preventDefault();
    //FlowRouter.go(`/contracts/${ this.props._id }`);
  },

  renderContracts() {
    // Get contracts from this.data.contracts
    return this.data.contracts.map((contract) => {
      let contractPath = `/contracts/${ contract._id}`;
      return <div><ListItem
          key={contract._id}
          primaryText={<a href={contractPath}>{contract.title}</a>}
          //onClick={this._navigateToContract}
          initiallyOpen={true}
          leftCheckbox={<Checkbox name="checky" /> }
          secondaryText={<FlatButton label={moment(contract.dateDue).format('hh:mm:ss A L')}>{contract.price}</FlatButton>}
          rightAvatar={<Avatar color={Colors.deepOrange300} backgroundColor={Colors.red300}></Avatar>} />
        <ListDivider inset={false} />
      </div>
    });
  },

  render () {
    if (this.data.contractsLoading) {
      return (<Loading />);
    } else {
      return (
          <div className="row">
            <List subheader="Current Contracts">
              {this.renderContracts()}
            </List>
          </div>
      )
    }
  }
});