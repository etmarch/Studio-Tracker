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

  mixins: [ReactMeteorData, React.addons.LinkedStateMixin],

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

  // Display the Modal
  _toggleClientModal(e) {
    e.preventDefault();
    Utils.cl("Dialog Toggled!");
    this.refs.clientModal.show();
  },

  // Insert the Client doc + Hide the Modal
  _onDialogSubmit() {
    Utils.cl(this);
    this.refs.clientModal.dismiss(); // Hide the modal
  },

  _handleSelectValueChange(e) {
    console.log(e.target.value);
    console.log(this.refs.selectField.props.menuItems.length); // gets number of menu options
    this.selectedClient(e.target.value); // current set value
  },

  render () {

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
              <div className="panel panel-default centered">
                <p>Step 1: Attach to client or create new</p>

                <SelectField
                    valueLink={this.linkState('selectedId')}
                    onChange={this._handleSelectValueChange}
                    hintText="Select a Client"
                    menuItems={this.data.clientList}
                    displayMember="name"
                    valueMember="_id"
                    ref="selectField" />

                <IconButton
                    iconClassName="material-icons add-circle"
                    tooltip="Add New Client"
                    onClick={this._toggleClientModal} />
              </div>
              <div className="panel panel-default centered">
                <p>Step 2: Fill out contract details</p>

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

              </div>

              <RaisedButton type="submit" label="Submit" className="button-submit" primary={true} />

              <Dialog
                  title="Dialog With Standard Actions"
                  actions={contractModalActions}
                  actionFocus="submit"
                  modal={this.state.modal}
                  ref="clientModal">

                <TextField
                    hintText="Client Name"
                    ref="name"
                    type="text" />

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
/*
 ClientAddForm = React.createClass({
 propTypes: {

 },

 contextTypes: {
 muiTheme: React.PropTypes.object
 },

 render() {


 return (
 <Dialog
 title="Dialog With Standard Actions"
 actions={contractModalActions}
 actionFocus="submit"
 //modal={this.state.modal}
 ref="contractModal">

 <TextField
 hintText="Client Name"
 ref="name"
 type="text" />

 </Dialog>
 )
 }
 });*/

// Sample Icon HTML Elements

/*
 <!--
 <FontIcon className="material-icons add-circle" />
 <IconButton iconClassName="material-icons add-circle" tooltip="GitHub"/>
 -->
 */