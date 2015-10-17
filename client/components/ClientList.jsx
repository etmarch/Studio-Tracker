// Client Listing Page/Component Route


//const Colors = MUI.Styles.Colors;

const {
    Avatar,
    Checkbox,
    List,
    ListItem,
    ListDivider,
    FlatButton,
    Styles,
    RaisedButton
    } = MUI;

ClientListing = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Retrieve the required data
  getMeteorData() {
    let query = {};
    let handle = Meteor.subscribe("allClients");
    return {
      clients: Clients.find(query, {sort: {createdAt: -1}}).fetch(),
      dataLoading: ! handle.ready()
    }
  },

  renderClients() {
    let avatarStyle = {width: 40};
    // Get contracts from this.data.contracts
    return this.data.clients.map((client) => {
      let clientPath = `/clients/${ client._id}`;
      return <div><ListItem
          key={client._id}
          primaryText={<a href={clientPath}>{client.name}</a>}
          initiallyOpen={true}
          leftCheckbox={<Avatar style={avatarStyle}>{client.name.charAt(0)}</Avatar>}
          secondaryText={client.email+'  '+client.phone+'  '+client.address}
          rightAvatar={<RaisedButton label="View Contracts" primary={true} />} />
        <ListDivider inset={false} />
      </div>
    });
  },

  render () {
    if (this.data.dataLoading) {
      return (<Loading />);
    } else {
      return (
          <div className="row">
            <List subheader="All Clients">
              {this.renderClients()}
            </List>
          </div>
      )
    }
  }
});
