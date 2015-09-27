// Dashboard Page/Component Route


Meteor.subscribe("allContracts");
Meteor.subscribe("allUsers");
Meteor.subscribe("userStatus");


const Colors = MUI.Styles.Colors;

const {Checkbox, List, ListItem, ListDivider, Avatar, Styles} = MUI;

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
    return {
      contracts: Contracts.find(query, {sort: {createdAt: -1}}).fetch(),
      currentUser: Meteor.user(),
      currentTime: appBarClock.time.get()
    }
  },

  renderContracts() {
    // Get contracts from this.data.contracts
    return this.data.contracts.map((contract) => {
      //return <Contract key={contract._id} contract={contract} />;
      return <div><ListItem
          key={contract._id}
          primaryText={contract.text}
          initiallyOpen={true}
          leftCheckbox={<Checkbox name="checky" /> }
          secondaryText="Hey you how are you man hey you how are yu mna hey yu how are yu man"
          rightAvatar={<Avatar color={Colors.deepOrange300} backgroundColor={Colors.red300}></Avatar>} />
        <ListDivider inset={false} />
      </div>
    });
  },

  render () {

    return (
        <div className="row">
          <List subheader="Current Contracts">
            {this.renderContracts()}
          </List>
        </div>
    )
  }
});