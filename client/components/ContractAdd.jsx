/*
 * Create Contract Form Component
 * Children: ClientSelectList, ContractAddForm
 * Data Needed: All Clients
 * Props:
 * State:
 */

const {RaisedButton, DatePicker, TextField, TimePicker, List, ListItem, ListDivider, Dialog, FlatButton, IconButton,
    FontIcon, SelectField, Snackbar} = MUI;

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
    Utils.clJ(this);
  },

  // Display the Modal
  _toggleClientModal(e) {
    e.preventDefault();
    Utils.cl("Dialog Toggled!");
    this.refs.clientModal.show();
  },

  // Insert the Client doc + Hide the Modal
  _onDialogSubmit() {
    // retrieve input values
    Utils.cl(this.refs.cName.getValue());
    let name = this.refs.cName.getValue();
    let address = this.refs.cAddress.getValue();
    let phone = this.refs.cPhone.getValue();
    let email = this.refs.cEmail.getValue();

    Utils.cl(name+' '+address+' '+phone+' '+email);


    // validate data before client insert
    if (!name || !address || !phone || !email ) {
      // Make sAlert here for the error message
      //sAlert.error('Fill out each field correctly!');
      this.refs.errorSnackbar.show();
      //this.refs.clientModal.dismiss();
    } else {
      // insert client document
      let newClientId = Clients.insert({
        name: name,
        address: address,
        phone: phone,
        email: email
      });

      Utils.cl(newClientId);
      this.selectedClient(newClientId); // Set selectedId to new client
    }

    this.refs.clientModal.dismiss(); // Hide the modal
  },

  _handleSelectValueChange(e, selectedIndex, menuItem) {
    e.preventDefault();
    console.log(selectedIndex);
    console.log(menuItem);
    //console.log(this.refs.selectField.props.menuItems.length); // gets number of menu options
    let selectedValue = e.target.value;
    // If last option is selected, display New Client modal
    if (selectedIndex === this.refs.selectField.props.menuItems.length - 1) {
      this.refs.clientModal.show();
      this.selectedClient()
    } else {
      this.selectedClient(selectedValue); // Client selected, update state
    }
  },



  render () {
    //let totalClientList = this.data.clientList;
    let clientListLength = this.data.clientList.length;
    let concatClientList = this.data.clientList.concat({_id: clientListLength, name: 'Add New Client'});

    //console.log(totalClientList);
    //console.log(allClients);
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
          <div className="">
            <h3 className="centered">Add Contract</h3>
            <form className="form add-contract" onSubmit={this.submitContractForm}>
              <div className="panel panel-default centered">
                <p>Step 1: Attach to client or create new</p>

                <SelectField
                    value={this.state.selectedId}
                    onChange={this._handleSelectValueChange}
                    hintText="Select a Client"
                    menuItems={concatClientList}
                    displayMember="name"
                    valueMember="_id"
                    ref="selectField" />

                <RaisedButton
                    tooltip="Add New Client"
                    onClick={this._toggleClientModal}
                    label="New Client"
                    secondary={true} />

              </div>
              <div className="panel panel-default centered">
                <p>Step 2: Fill out contract details</p>

                <div className="row">
                  <div className="col-sm-6">
                    <TextField
                        hintText="Contract Title"
                        ref="title"
                        type="text" />

                    <TextField
                        hintText="Price"
                        type="number"
                        min="0"
                        ref="price" />

                  </div>
                  <div className="col-sm-6">

                    <TextField
                        hintText="Hours Estimation"
                        type="number"
                        min="0"
                        ref="hourEstimation" />

                    <DatePicker hintText="Contract Deadline" />
                  </div>
                </div>


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
                    ref="cName"
                    type="text" />

                <TextField
                    hintText="Client Address"
                    ref="cAddress"
                    type="text" />


                <TextField
                    hintText="Client Phone"
                    ref="cPhone"
                    type="number" />


                <TextField
                    hintText="Client Email Address"
                    ref="cEmail"
                    type="email" />

              </Dialog>

              <Snackbar
                  ref="errorSnackbar"
                  message="Fill out all fields"
                  action="okay"/>

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