// Dashboard Page/Component Route

Meteor.subscribe("allClients");

const Colors = MUI.Styles.Colors;

const {Checkbox, List, ListItem, ListDivider, FlatButton, Avatar, Styles} = MUI;

// Init the material-ui framework
const ThemeManager = new MUI.Styles.ThemeManager();

Dashboard = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Retrieve the required data
  getMeteorData() {
    let query = {};
    let handle = Meteor.subscribe("allContracts");
    return {
      contracts: Contracts.find(query, {sort: {createdAt: -1}}).fetch(),
      contractsLoading: ! handle.ready()
    }
  },



  renderContracts() {
    // Get contracts from this.data.contracts
    return this.data.contracts.map((contract) => {
      return <div><ListItem
          key={contract._id}
          primaryText={Utils.getClientName(contract.clientId)}
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