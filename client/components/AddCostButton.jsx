/*
 * Add Expense Component
 */

const {
    RaisedButton,
    DatePicker,
    Checkbox,
    TextField,
    TimePicker,
    List,
    ListItem,
    ListDivider,
    Dialog,
    FlatButton,
    IconButton,
    FontIcon,
    SelectField} = MUI;

AddCostButton = React.createClass({

    contextTypes: {
        muiTheme: React.PropTypes.object
    },

    propTypes: {
        contractId: React.PropTypes.string
    },

    onSubmit(e) {
        e.preventDefault();

        let amount = this.refs.amount.getValue();
        let contractId = this.props.contractId;
        let type = this.state.selectedType;

        // validate data before client insert
        if (!amount || !contractId || !type ) {
            // Make sAlert here for the error message
            sAlert.error('Fill out each field correctly!');
            this.refs.errorSnackbar.show();
            //this.refs.clientModal.dismiss();
        } else {
            // insert client document
            let newCost = {
                type: type,
                amount: amount,
                contractId: contractId
            };

            Meteor.call('addCost', newCost, (error, newCostId) => {
                if (error) {
                    sAlert.error(error.reason);
                } else {
                    Utils.cl("successful! "+newCostId);
                }
            });
        }
        this.refs.clientModal.dismiss(); // Hide the modal
    },

    getInitialState: function () {
        return {
            selectedType: null
        };
    },

    _handleSelectType(e, selectedIndex, menuItem) {
        e.preventDefault();
        //console.log(this.refs.selectField.props.menuItems.length); // gets number of menu options
        let selectedValue = e.target.value;
        this.setSelectedType(selectedValue); // Client selected, update state
    },

    setSelectedType(type) {
        this.setState({
            selectedType: type
        })
    },

    render: function () {

        let addCostModalActions = [
            { text: 'Cancel' },
            { text: 'Submit', onTouchTap: this.onSubmit, ref: 'submit' }
        ];


        return (
            <div>
                <RaisedButton
                    primary={true}
                    labelPosition="after"
                    style={{verticalAlign: "top"}}
                    onClick={this._displayModal}>
                    <FontIcon className="material-icons person-add" style={{"left":".2em"}}/>
                    <span className="font-btn">Add Client</span>
                </RaisedButton>



                <Dialog
                    title="New Cost"
                    actions={addCostModalActions}
                    style={{"textAlign":"center"}}
                    actionFocus="submit"
                    modal={this.state.modal}
                    ref="addContractModal">
                    <TextField
                        hintText="How Much"
                        style={{"marginRight":"10px"}}
                        ref="amount"
                        type="number" />

                    <SelectField
                        value={this.state.selectedType}
                        onChange={this._handleSelectType}
                        hintText="Select a Type"
                        menuItems={typeList}
                        displayMember="name"
                        valueMember="name"
                        ref="selectType"
                        style={{"marginRight":"10px"}} />
                </Dialog>
            </div>

        );
    }
});