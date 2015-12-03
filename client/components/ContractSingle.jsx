// Single Contract Page View

// ToDo: Make prompt for when pressing the activate contract button.

//const Colors = MUI.Styles.Colors;

const {
    List,
    ListItem,
    FloatingActionButton,
    FontIcon,
    Avatar,
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

const Colors = MUI.Styles.Colors;
const {SvgIcons} = MUI.Libs;

ContractSingle = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {
    contractId: React.PropTypes.string
  },

  // This mixin makes the getMeteorData method work
  mixins: [ReactMeteorData],

  // Retrieve the required data
  getMeteorData() {
    let contractHandle = Meteor.subscribe("singleContract", this.props.contractId );
    return {
      contract: Contracts.findOne(this.props.contractId),
      dataLoading: ! contractHandle.ready(),
      isCurrentLive: Session.get('isLive')
    }
  },

  _logger() {
    Utils.cl("-----RENDERING CONTRACT SINGLE-------");
  },

  activeButtonPress() { // This will turn the state of app to 'live' and the 'isLive' field to true of current app
    //let theLive = Contracts.findOne(this.props.contractId).isLive();
    Utils.cl("ActiveButtonPress --- "+this.data.isCurrentLive);
    contract = {
      id: this.data.contract._id
    };

    Meteor.call('contract.addActivity', contract, function(error, result) {
      if (error) {
        alert(error);
      } else {
        Utils.cl("result "+result); // Always undefined
      }
    });
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
          <div>
            <Card>
              <CardHeader
                  title={this.data.contract.title}
                  subtitle={this.data.contract.clientName ? this.data.contract.clientName : this.data.contract.clientId}
                  avatar={this.clientLink()}/>
              <CardText>

                <div className="centered active-button">
                  <FloatingActionButton onClick={this.activeButtonPress} backgroundColor={(this.data.isCurrentLive ? Colors.red300 : Colors.green300)}>
                    <SvgIcons.ContentAddCircle />
                  </FloatingActionButton>

                 <AddCostButton contractId={this.data.contract._id} />
                </div>

                <div className="panel panel-default centered">
                  <div className="row">
                    <div className="label label-primary col-sm-3">EST: {this.data.contract.hourEstimation} hrs</div>
                    <div className="label label-info col-sm-3">ACT: {Helpers.formatMilliToMin(this.data.contract.currentMillisecs)} hrs, COSTS: {this.data.contract.costTotal}</div>
                    <div className="label label-warning col-sm-3">RATIO: {Math.round((this.data.contract.currentHours / this.data.contract.hourEstimation) * 100)}% EST</div>
                    <div className="label label-default col-sm-3">Due: {moment(this.data.contract.dateDue).endOf('day').fromNow()} - {moment(this.data.contract.dateDue).format('L')}</div>
                  </div>
                </div>

                <Tabs>
                  <Tab label="Activity">
                    <h4>Activity Log:</h4>
                    {<ActivitiesList activities={this.data.contract.activities} />}
                  </Tab>

                  <Tab label="Costs">
                    {<CostsList costs={this.data.contract.costs} />}
                  </Tab>

                  <Tab label="Notes">
                    <h4>Notes</h4>
                    {<NotesList notes={this.data.contract.notes} />}
                  </Tab>
                </Tabs>

              </CardText>
            </Card>
          </div>

      )
    }
  }
});


ActivitiesList = React.createClass({
  propTypes: {
    activities: React.PropTypes.array
  },
  render() {
    if (!this.props.activities) {
      return <div className="centered">No activity yet, get working!</div>;
    }
    let size = _.size(this.props.activities);
    Utils.cl('# of activities  :'+size);

    let activityRows = this.props.activities.map((activity) => {
      //Utils.clJ(activity);
      return <TableRow key={Random.id()}>
        <TableRowColumn>{Helpers.formatDatePrimary(activity.startStamp)}</TableRowColumn>
        <TableRowColumn>{ (activity.sessionTime === 0) ? "Active!" : Helpers.formatMilliToMin(activity.sessionTime)  }</TableRowColumn>
        <TableRowColumn>{moment(activity.endStamp).fromNow()}</TableRowColumn>
      </TableRow>
    });

    return (
        <Table>
          <TableHeader
              adjustForCheckbox={false}
              displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn tooltip='Date'>Date</TableHeaderColumn>
              <TableHeaderColumn tooltip='Duration'>Duration</TableHeaderColumn>
              <TableHeaderColumn tooltip='Time Ago'>Time Ago</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {activityRows}
          </TableBody>
        </Table>
    );
  }
});

CostsList = React.createClass({
  propTypes: {
    costs: React.PropTypes.array
  },
  render() {
    if (!this.props.costs) {
      return <div>No Costs Yet!</div>;
    }

    let costRows = this.props.costs.map((cost) => {
      return <TableRow key={Random.id()}>
        <TableRowColumn>{moment(cost.date).format('L')}</TableRowColumn>
        <TableRowColumn>{cost.type}</TableRowColumn>
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
  }
});



NotesList = React.createClass({
  propTypes: {
    notes: React.PropTypes.array
  },
  render() {
    if (!this.props.notes) {
      return <div className="centered">No Notes Yet!</div>;
    }
    let noteRows = this.props.notes.map((note) => {
      return <ListItem
          key={Random.id()}
          primaryText={note.content}
          rightAvatar= {<p>{moment(note.time).format('L')}</p>} />
    });
    return <List>{noteRows}</List>;
  }
});

// Example of Diffing time to future: moment(this.data.contract.createdAt).to(moment(this.data.contract.dateDue))

/*<GridList cols={3}>
 <GridTile title={this.data.contract.hoursEstimation} />
 <GridTile title={this.data.contract.currentHours} />
 <GridTile title="hi" />
 </GridList>*/