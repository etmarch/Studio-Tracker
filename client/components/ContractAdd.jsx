/*
 * Create Contract Form Component
 * Children: ClientSelectList, ContractAddForm
 * Data Needed: All Clients
 * Props:
 * State:
 */

const {
    RaisedButton,
    DatePicker,
    TextField,
    TimePicker,
    List,
    ListItem,
    ListDivider,
    Dialog,
    FlatButton,
    IconButton,
    FontIcon,
    SelectField,
    Snackbar
    } = MUI;

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
      clientsLoading: ! handle.ready(),
      clientSelectReset: Session.get('clientSet') // Set session var to fix choosing same selection bug
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

    // Retrieve Input Values
    let title = this.refs.title.getValue();
    let dateDue = this.refs.dueDate.getDate();
    let price = Number(this.refs.price.getValue());
    let hourEstimation = Number(this.refs.hourEstimation.getValue());
    let costEstimation = Number(this.refs.costEstimation.getValue());
    let note = this.refs.note.getValue();
    let clientId = this.state.selectedId;
    let address = this.refs.address.getValue();

    Utils.cl("price: "+price);

    if (!title || !dateDue || !price || !hourEstimation || !costEstimation || !note ) {
      // Make sAlert here for the error message
      sAlert.error('Fill out each field correctly!');
      this.refs.errorSnackbar.show();
    }

    let addedNote = {}; // Store note object, but only modified if there is a note
    if (note) {
      addedNote = [{
        time: new Date(),
        content: note
      }]
    }

    if (clientId !== this.state.selectedId) {
      Utils.cl("Client ID not matching selectedId "+clientId);
    }

    let contractData = {
      title: title,
      dateDue: dateDue,
      price: price,
      hourEstimation: hourEstimation,
      costEstimation: costEstimation,
      notes: addedNote,
      clientId: clientId,
      address: address
    };

    Utils.clJ(contractData);

    // Call Server Insert Function
    Meteor.call('contractInsert', contractData, (error, newContractId) => {
      if (error) {
        sAlert.error(error.reason);
      } else {
        // Success, update UI and Redirect
        Utils.cl("successful! "+newContractId);
        sAlert.success("New Contract Created! "+newContractId);
        FlowRouter.go('/');
      }
    });
  },

  // Insert the Client doc + Hide the Modal
  clientSubmit() {
    // retrieve input values
    let name = this.refs.cName.getValue();
    let address = this.refs.cAddress.getValue();
    let phone = this.refs.cPhone.getValue();
    let email = this.refs.cEmail.getValue();

    // validate data before client insert
    if (!name || !address || !phone || !email ) {
      // Make sAlert here for the error message
      sAlert.error('Fill out each field correctly!');
      this.refs.errorSnackbar.show();
      //this.refs.clientModal.dismiss();
    } else {
      // insert client document
      let newClient = {
        name: name,
        address: address,
        phone: phone,
        email: email
      };

      Meteor.call('clientInsert', newClient, (error, newClientId) => {
        if (error) {
          sAlert.error(error.reason);
        } else {
          Utils.cl("successful! "+newClientId);
          this.selectedClient(newClientId)
        }
      });

    }

    this.refs.clientModal.dismiss(); // Hide the modal
  },

  _handleSelectValueChange(e, selectedIndex, menuItem) {
    e.preventDefault();
    //console.log(this.refs.selectField.props.menuItems.length); // gets number of menu options
    let selectedValue = e.target.value;
    this.selectedClient(selectedValue); // Client selected, update state
  },

  _displayModal() {
    this.refs.clientModal.show();
  },

  render () {
    let clientModalActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this.clientSubmit, ref: 'submit' }
    ];

    // Hack to make the date picker faster (bug)
    let minDate = new Date();
    let maxDate = moment(new Date()).add(6, 'M').toDate();

    let dialogHere = (
        <Dialog
            title="Enter New Client's Information"
            actions={clientModalActions}
            style={{"textAlign":"center"}}
            actionFocus="submit"
            modal={this.state.modal}
            ref="clientModal">
          <p>
            <TextField
                hintText="Client Name"
                style={{"marginRight":"10px"}}
                ref="cName"
                type="text" />

            <TextField
                hintText="Client Address"
                ref="cAddress"
                type="text" />
          </p>
          <p>
            <TextField
                hintText="Client Phone"
                style={{"marginRight":"10px"}}
                ref="cPhone"
                type="number" />

            <TextField
                hintText="Client Email Address"
                ref="cEmail"
                type="email" />
          </p>
        </Dialog>
    );

    let spanStyle = {
      margin: "0 10px",
      display: "inline-block",
      verticalAlign: "top",
      paddingTop: "5px"
    };

    // check if Clients data is ready
    if (this.data.clientsLoading) {
      return (<Loading />);
    } else {
      return (
          <div className="">
            <h3 className="centered">Add Contract</h3>
            <form className="form add-contract centered" onSubmit={this.submitContractForm}>
              <div className="panel panel-default ">
                <p>Step 1: Select an existing client or create a new one</p>

                <SelectField
                    value={this.state.selectedId}
                    onChange={this._handleSelectValueChange}
                    hintText="Select a Client"
                    menuItems={this.data.clientList}
                    displayMember="name"
                    valueMember="_id"
                    ref="selectField" />

                <div style={spanStyle}>
                  <span className="label label-default">OR</span>
                </div>
                <RaisedButton
                    primary={true}
                    labelPosition="after"
                    style={{verticalAlign: "top"}}
                    onClick={this._displayModal}>
                  <FontIcon className="material-icons person-add" style={{"left":".2em"}}/>
                  <span className="font-btn">Add Client</span>
                </RaisedButton>

              </div>

              <div className="panel panel-default">
                <p>Step 2: Fill out contract details</p>

                <p><TextField
                    hintText="Contract Title"
                    ref="title"
                    type="text" /></p>

                <p><TextField
                    hintText="Address of Contract"
                    ref="address"
                    type="text" />
                </p>
                <p>
                  <DatePicker
                      hintText="Contract Deadline"
                      ref="dueDate"
                      minDate={minDate}
                      maxDate={maxDate}
                      autoOk={true}
                      disableYearSelection={true} />
                </p>

                <TextField
                    hintText="Price ($)"
                    type="number"
                    min="0"
                    ref="price" />

                <p>
                  <TextField
                      hintText="Cost Estimation ($)"
                      type="number"
                      min="0"
                      ref="costEstimation" />
                </p>
                <p>
                  <TextField
                      hintText="Hours Estimation"
                      type="number"
                      min="0"
                      ref="hourEstimation" />
                </p>
                <p>   <TextField
                    hintText="Any Notes/Comments to attach"
                    type="text"
                    multiLine={true}
                    rows={2}
                    ref="note" />
                </p>

              </div>

              <RaisedButton type="submit" label="Submit" className="button-submit" primary={true} />


              <Snackbar
                  ref="errorSnackbar"
                  message="Fill out all fields"
                  action="okay"/>

            </form>



            {dialogHere}
          </div>
      )
    }
  }
});


// Sample Icon HTML Elements

/*
 <!--
 <FontIcon className="material-icons add-circle" />
 <IconButton iconClassName="material-icons add-circle" tooltip="GitHub"/>
 -->
 */