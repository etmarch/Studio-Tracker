/*
 * Create Contract Form Component
 * Children: ClientSelectList, ContractAddForm
 * Data Needed: All Clients
 * Props:
 * State:
 */

const {RaisedButton, DatePicker, TextField, TimePicker, List, ListItem, ListDivider, Dialog, FlatButton, IconButton,
      FontIcon, SelectField} = MUI;

ContractAdd = React.createClass({

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  propTypes: {

  },

  mixins: [ReactMeteorData],

  getMeteorData() {
    let handle = Meteor.subscribe('allClients');
    return {
      clientList: Clients.find().fetch(),
      clientsLoading: ! handle.ready()
    }
  },

  getInitialState: function () {
    return {
      selectedId: null
    };
  },

  selectedClient(clientId) {
    this.setState({
      selectedId: clientId
    })
  },

  submitContractForm(e) {
    e.preventDefault();
    Utils.cl(this);
  },

  _toggleContractModal(e) {
    e.preventDefault();
    Utils.cl("Dialog Toggled!");
    this.refs.contractModal.show();
  },

  // Insert the Client doc
  _onDialogSubmit(e) {
    Utils.cl("Dialog Submitted!");
    e.preventDefault();
    // Get
  },

  render () {

    /*let clientSelectMenu = this.data.clientList.map((client) => {

    }*/

    //Standard Actions
    let contractModalActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];
    
    // check if Clients data is ready
    if (this.data.clientsLoading) {
      return (<Loading />);
    } else {
      return (
          <div className="jumbotron">
            <h3 className="centered">Add Contract</h3>
            <form className="form add-contract" onSubmit={this.submitContractForm}>
              <p>Step 1: Attach to client or create new</p>

              <SelectField
                  value={this.state.selectValue}
                  onChange={console.log(this)}
                  hintText="Hint Text"
                  menuItems={this.data.clientList} />

              <IconButton
                  iconClassName="material-icons add-circle"
                  tooltip="GitHub"
                  onClick={this._toggleContractModal} />


              <TextField
                  hintText="Contract Title"
                  ref="title"
                  type="text" />

              <TextField
                  hintText="Price"
                  type="number"
                  min="0"
                  ref="price" />

              <DatePicker hintText="Portrait Dialog" />

              <RaisedButton type="submit" label="Submit" className="button-submit" primary={true} />

              <Dialog
                  title="Dialog With Standard Actions"
                  actions={contractModalActions}
                  actionFocus="submit"
                  modal={this.state.modal}
                  ref="contractModal">
                The actions in this window are created from the json that's passed in.
              </Dialog>

            </form>
          </div>
      )
    }
  }
});

// Renders the list of clients with a button "add new client" underneath
// Props: clientList - list of all clients data
// Actions: onClick on a client item - step 2 of the form
ClientSelectList = React.createClass({
  propTypes: {
    clients: React.PropTypes.array.isRequired, // list of clients
    onSelectClient: React.PropTypes.func
  },

  _logger(clientId) {
    console.log(("Client: "+clientId));
  },

  selectClient(clientId) {
    this.props.onSelectClient(clientId);
  },

  render() {
    return <List className="col-sm-6">{
      this.props.clients.map((client) => {
        return [
          <ListItem key={ client._id }
                    primaryText={ client.name }
                    onClick={ this.selectClient.bind(this, client._id) } />
        ]
      })
    }</List>
  }
});

// Sample Icon HTML Elements

/*
<!--
<FontIcon className="material-icons add-circle" />
<IconButton iconClassName="material-icons add-circle" tooltip="GitHub"/>
-->
    */