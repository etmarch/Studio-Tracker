// Single Contract Page View


//const Colors = MUI.Styles.Colors;

const {Checkbox, List, ListItem, ListDivider, FlatButton, Avatar, Styles, RaisedButton, Card, CardHeader, CardText} = MUI;

// Init the material-ui framework
//const ThemeManager = new MUI.Styles.ThemeManager();

ContractSingle = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  /*getChildContext: function() {
   return {
   muiTheme: ThemeManager.getCurrentTheme()
   };
   },*/

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Retrieve the required data
  getMeteorData() {
    let query = {};
    var contractId = FlowRouter.getParam("_id");
    let contractHandle = Meteor.subscribe("singleContract", this.props._id );
    //let clientHandle = Meteor.subscribe("singleClient", this.props._id );
    return {
      contract: Contracts.findOne(contractId),
      dataLoading: ! contractHandle.ready()
    }
  },

  _logger() {
    Utils.cl(this.props._id+' Is PROP ID');
  },

  renderClients() {
    let avatarStyle = {width: 40};
    // Get contracts from this.data.contracts
    return this.data.clients.map((client) => {

      return <div><ListItem
          key={client._id}
          primaryText={client.name}
          initiallyOpen={true}
          leftCheckbox={<Avatar style={avatarStyle}>{client.name.charAt(0)}</Avatar>}
          secondaryText={client.email+'  '+client.phone+'  '+client.address}
          rightAvatar={<RaisedButton label="View Contracts" primary={true} />} />
        <ListDivider inset={false} />
      </div>
    });
  },

  render () {
    this._logger();
    if (this.data.dataLoading) {
      return (<Loading />);
    } else {
      return (
          <div className="row">
            <div className="jumbotron-sm">
              <Card>
                <CardHeader
                    title={this.data.contract.title}
                    subtitle={moment(this.data.contract.createdAt).format('L')} />
                <CardText>
                  <p>{this.data.contract.price}</p>
                </CardText>
              </Card>
            </div>
          </div>
      )
    }
  }
});


// Example of Diffing time to future: moment(this.data.contract.createdAt).to(moment(this.data.contract.dateDue))