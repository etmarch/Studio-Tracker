/*
 * Single Client View
 */

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
    RaisedButton,
    Card,
    CardHeader,
    CardText
    } = MUI;

ClientSingle = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    clientId: String
  },

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Retrieve the required data
  getMeteorData() {
    let clientHandle = Meteor.subscribe("singleClient", this.props.clientId);
    let contractsHandle = Meteor.subscribe("singleClientContracts", this.props.clientId);
    return {
      client: Clients.findOne(this.props.clientId),
      contracts: Contracts.find({clientId: this.props.clientId}).fetch(),
      dataLoading: ! clientHandle.ready(),
      contractsLoading: ! contractsHandle.ready()
    }
  },

  renderContracts() {
    return this.data.contracts.map((contract) => {
      let contractPath = `/contracts/${ contract._id}`;
      return <ListItem
          key={contract._id}
          primaryText={contract.title}
          href={contractPath}
          secondaryText={contract.currentHours}>
        <ListDivider />
        </ListItem>
    });
  },

  render () {
    if (this.data.dataLoading) {
      return (<Loading />);
    } else {
      return (
          <div className="row">

            <Card>
              <CardHeader
                  title={this.data.client.name}
                  subtitle={this.data.client.email}
                  avatar={<Avatar>{this.data.client.name.charAt(0)}</Avatar>} />
              <CardText>
              <List subheader="Contracts Attached to Client">
                {this.renderContracts()}
              </List>
            </CardText>
           </Card>
          </div>
      )
    }
  }
});