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
    Checkbox,
    TextField,
    Dialog,
    FontIcon,
    SelectField,
    Snackbar
    } = MUI;

const {SvgIcons} = MUI.Libs;

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
      selectedId: null,
      selectedState: null
    };
  },

  selectedClient(clientId) {
    this.setState({
      selectedId: clientId
    })
  },

  selectedState(state) {
    this.setState({
      selectedState: state
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
        FlowRouter.go('/'+newContractId);
      }
    });
  },

  clientSubmit() {
    // retrieve input values
    let name = this.refs.cName.getValue();
    let street = this.refs.cStreet.getValue();
    let city = this.refs.cCity.getValue();
    let state = this.state.selectedState;
    let zipcode = this.refs.cZipcode.getValue();
    let phone = this.refs.cPhone.getValue();
    let email = this.refs.cEmail.getValue();
    let contractor = this.refs.cContractor.isChecked();
    // validate data before client insert
    if (!name || !street || !phone || !email || !contractor || !zipcode || !state ) {
      // Make sAlert here for the error message
      sAlert.error('Fill out each field correctly!');
      //this.refs.clientModal.dismiss();
    } else {
      // insert client document
      let newClient = {
        name: name,
        address: {
          street: street,
          city: city,
          state: state,
          zip: zipcode
        },
        phone: phone,
        email: email,
        isContractor: contractor
      };

      Meteor.call('clientInsert', newClient, (error, newClientId) => {
        if (error) {
          sAlert.error(error.reason);
        } else {
          sAlert.success("Client Added Successfully!");
          this.selectedClient(newClientId)
        }
      });
    }
    this.refs.clientModal._dismiss(); // Close modal ToDo: This is depreciated or a hack
  },

  _handleSelectValueChange(e, selectedIndex, menuItem) {
    e.preventDefault();
    let selectedValue = e.target.value;
    this.selectedClient(selectedValue); // Client selected, update state
  },

  _handleSelectState(e, selectedIndex, menuItem) {
    e.preventDefault();
    let selectedValue = e.target.value;
    this.selectedState(selectedValue); // Client selected, update state
  },

  _displayModal() {
    this.refs.clientModal._show(); // ToDo: this is depreciated
  },

  render () {
    Utils.cl("---------RENDERING!!!----------");
    let clientModalActions = [
      { text: 'Cancel' },
      { text: 'Submit', onTouchTap: this.clientSubmit, ref: 'submit' }
    ];

    let stateList = [
      {name: 'NY'},
      {name: 'CT'}
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
            ref="clientModal"
            autoDetectWindowHeight={true}>
          <div>
            <TextField
                hintText="Client Name"
                style={{"marginRight":"10px"}}
                ref="cName"
                type="text" />
          </div>

          <div>
            <TextField
                hintText="Client Phone"
                ref="cPhone"
                type="number" />
          </div>
          <div>
            <TextField
                hintText="Client Email Address"
                ref="cEmail"
                type="email"
                style={{"marginRight":"10px"}} />
          </div>
          <div>
            <TextField
                hintText="Client Street Address"
                ref="cStreet"
                type="text"
                style={{"marginRight":"10px"}} />
          </div>
          <div>
            <TextField
                hintText="Client City"
                ref="cCity"
                type="text" />
          </div>
          <div>
            <SelectField
                value={this.state.selectedState}
                onChange={this._handleSelectState}
                hintText="Select a State"
                menuItems={stateList}
                displayMember="name"
                valueMember="name"
                ref="selectState"
                style={{"marginRight":"10px"}} />
          </div>
          <TextField
              hintText="Client Zipcode"
              ref="cZipcode"
              type="text" />
          <div>
            <Checkbox
                name="Is Contractor"
                label="Is this client a contractor?"
                ref="cContractor"
                style={{"display":"inline-block", "width":"initial"}} />
          </div>
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
                    labelPosition="before"
                    style={{verticalAlign: "top"}}
                    onClick={this._displayModal}>
                  <SvgIcons.SocialPersonAdd style={{"marginLeft":".3em"}} />
                  <span className="font-btn">Add Client</span>
                </RaisedButton>

              </div>

              <div className="panel panel-default">
                <p>Step 2: Fill out contract details</p>
                <div>
                  <TextField
                      hintText="Contract Title"
                      ref="title"
                      type="text" />
                </div>
                <TextField
                    hintText="Address of Contract"
                    ref="address"
                    type="text" />

                <DatePicker
                    hintText="Contract Deadline"
                    ref="dueDate"
                    minDate={minDate}
                    maxDate={maxDate}
                    autoOk={true}
                    disableYearSelection={true} />

                <div>
                  <TextField
                      hintText="Price ($)"
                      type="number"
                      min="0"
                      ref="price" />
                </div>
                <div>
                  <TextField
                      hintText="Cost Estimation ($)"
                      type="number"
                      min="0"
                      ref="costEstimation" />
                </div>
                <div>
                  <TextField
                      hintText="Hours Estimation"
                      type="number"
                      min="0"
                      ref="hourEstimation" />
                </div>
                <div>
                  <TextField
                      hintText="Any Notes/Comments to attach"
                      type="text"
                      multiLine={true}
                      rows={2}
                      ref="note" />
                </div>
              </div>

              <RaisedButton type="submit" label="Submit" className="button-submit" primary={true} />
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