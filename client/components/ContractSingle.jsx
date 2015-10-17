// Single Contract Page View

// ToDo: Make prompt for when pressing the activate contract button.

//const Colors = MUI.Styles.Colors;

const {
    Checkbox,
    List,
    ListItem,
    ListDivider,
    FlatButton,
    FloatingActionButton,
    FontIcon,
    Avatar,
    Styles,
    RaisedButton,
    Card,
    CardHeader,
    CardText,
    Tabs,
    Tab,
    Table,
    TableHeader,
    TableHeaderColumn,
    TableBody,
    TableRow,
    TableRowColumn
    } = MUI;

// Init the material-ui framework
//const ThemeManager = new MUI.Styles.ThemeManager();

const Colors = MUI.Styles.Colors;

ContractSingle = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    contractId: String
  },

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Retrieve the required data
  getMeteorData() {
    let query = {};
    var contractId = FlowRouter.getParam("_id");
    let contractHandle = Meteor.subscribe("singleContract", this.props.contractId );
    let activeSession = Session.get('isLive');
    //let clientHandle = Meteor.subscribe("singleClient", this.props._id );
    return {
      contract: Contracts.findOne(this.props.contractId),
      dataLoading: ! contractHandle.ready(),
      isCurrentLive: activeSession

    }
  },

  _logger() {
    Utils.cl(this.props.contractId+' Is PROP ID');
  },

  _renderCosts() {
    Utils.clJ(this.data.contract.costs);
    if (!this.data.contract.costs) {
      return <div>No Costs Yet!</div>;
    }

    let costRows = this.data.contract.costs.map((cost) => {
      return <TableRow key={cost.date}>
        <TableRowColumn>{moment(cost.date).format('L')}</TableRowColumn>
        <TableRowColumn>{cost.content}</TableRowColumn>
        <TableRowColumn>${cost.amount}</TableRowColumn>
      </TableRow>
    });

    return (
        <Table>
          <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn tooltip='Date'>Date</TableHeaderColumn>
              <TableHeaderColumn tooltip='Cost'>What</TableHeaderColumn>
              <TableHeaderColumn tooltip='Amount'>Amount</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {costRows}
          </TableBody>
        </Table>
    );
  },

  _renderActivities() {
    Utils.clJ(this.data.contract.activity);
    if (!this.data.contract.activity) {
      return <div className="centered">No activity yet, get working!</div>;
    }

    let activityRows = this.data.contract.activity.map((activity) => {
      //Utils.clJ(activity);
      return <TableRow key={activity.timeStamp}>
        <TableRowColumn>{activity.timeStamp}</TableRowColumn>
        <TableRowColumn>{activity.isLive}</TableRowColumn>
      </TableRow>
    });

    return (
        <Table>
          <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn tooltip='Date'>Date</TableHeaderColumn>
              <TableHeaderColumn tooltip='Cost'>Live</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {activityRows}
          </TableBody>
        </Table>
    );
  },

  _renderNotes() {
    if (!this.data.contract.notes) {
      return <div className="centered">No Notes Yet!</div>;
    }
    let noteRows = this.data.contract.notes.map((note) => {
      return <ListItem
          key={note.time}
          primaryText={note.content}
          rightAvatar={<FlatButton label={moment(note.time).format('L')} />} />
    });
    return <List>{noteRows}</List>;
  },

  activeButtonPress() { // This will turn the state of app to 'live' and the 'isLive' field to true of current app
    Utils.cl("Button Pressed!");
    if (!this.data.isCurrentLive) {
      Session.set('isLive', true);
    } else {
      Session.set('isLive', false);
    }
  },

  clientLink() {
    let clientPath = "/clients/"+this.data.contract.clientId;
    return <a href={clientPath}><Avatar />{this.data.contract.clientName ? this.data.contract.clientName.charAt(0) : "A"}</a>;
  },

  render () {
    this._logger();
    if (this.data.dataLoading) {
      return (<Loading />);
    } else {
      return (
          <div className="row">
            <div className="">
              <Card>
                <CardHeader
                    title={this.data.contract.title}
                    subtitle={this.data.contract.clientName ? this.data.contract.clientName : this.data.contract.clientId}
                    avatar={this.clientLink()}/>
                <CardText>

                  <div className="centered active-button">
                    <FloatingActionButton onClick={this.activeButtonPress} backgroundColor={(this.data.isCurrentLive ? Colors.red300 : Colors.green300)}>
                      <FontIcon className="material-icons add-circle" />
                    </FloatingActionButton>
                  </div>

                  <div className="panel panel-default">
                    <span className="label label-primary">EST: {this.data.contract.hourEstimation} hrs</span>
                    <span className="label label-info">ACT: {this.data.contract.currentHours} hrs</span>
                    <span className="label label-warning">RATIO: {Math.round((this.data.contract.currentHours / this.data.contract.hourEstimation) * 100)}% EST</span>
                    <span className="label label-default">Due: {moment(this.data.contract.dateDue).endOf('day').fromNow()} </span>
                    <span className="label label-success">DUE: {moment(this.data.contract.dateDue).format('L')}</span>
                  </div>

                  <Tabs>
                    <Tab label="Activity">
                      <h4>Activity Log:</h4>
                      {this._renderActivities()}
                    </Tab>

                    <Tab label="Costs">
                      {this._renderCosts()}
                    </Tab>

                    <Tab label="Notes">
                      <h4>Notes</h4>
                      {this._renderNotes()}
                    </Tab>
                  </Tabs>

                </CardText>
              </Card>
            </div>
          </div>
      )
    }
  }
});


// Example of Diffing time to future: moment(this.data.contract.createdAt).to(moment(this.data.contract.dateDue))

/*<GridList cols={3}>
 <GridTile title={this.data.contract.hoursEstimation} />
 <GridTile title={this.data.contract.currentHours} />
 <GridTile title="hi" />
 </GridList>*/