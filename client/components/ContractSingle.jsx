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

  _renderCosts() {
    return this.data.contract.costs.map((cost) => {
      Utils.clJ(cost);
      return <ListItem
            key={cost.date}
            primaryText={<p><span className="pull-left">{cost.content}</span><span className="pull-right">${cost.amount}</span></p>} />
    });
  },

  _renderActivities() {
    if (this.data.contract.activity) {
      return this.data.contract.activity.map((activity) => {
        Utils.clJ(activity);
        return <ListItem
            key={activity.timeStamp}
            primaryText={activity.isLive}/>
      });
    } else {
      return (<div>No activity yet, get working!</div>);
    }
  },

  _renderNotes() {
    return this.data.contract.notes.map((note) => {
      Utils.clJ(note);
      return <ListItem
          key={note.time}
          primaryText={note.content} />
    });
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
                    title={<h2>{this.data.contract.title}   Due: {moment(this.data.contract.createdAt).format('L')}</h2>} />
                <CardText>
                  <div className="panel panel-default">
                    <span className="label label-primary">EST: {this.data.contract.hoursEstimation}</span>
                    <span className="label label-info">ACT: {this.data.contract.currentHours}</span>
                    <span className="label label-success">DUE: {moment(this.data.contract.dateDue).format('L')}</span>
                    <span>{this._renderNotes()}</span>
                  </div>
                  <div className="panel panel-default">
                    <div className="row">
                      <div className="col-sm-6">
                        <h4>Activity Log:</h4>
                        <span>{this._renderActivities()}</span>
                      </div>
                      <div className="col-sm-6">
                        <h4>Costs:</h4>
                        <span>{this._renderCosts()}</span>
                      </div>
                    </div>
                  </div>
                </CardText>
              </Card>
            </div>
          </div>
      )
    }
  }
});


// Example of Diffing time to future: moment(this.data.contract.createdAt).to(moment(this.data.contract.dateDue))