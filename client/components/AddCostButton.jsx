/*
 * Add Expense Component
 */

const {
    RaisedButton,
    TextField,
    Dialog,
    FontIcon,
    SelectField
    } = MUI;

const {SvgIcons} = MUI.Libs;

AddCostButton = React.createClass({

    contextTypes: {
        muiTheme: React.PropTypes.object
    },

    propTypes: {
        contractId: React.PropTypes.string
    },

    onSubmit(e) {
        //e.preventDefault();
        let amount = Number(this.refs.amount.getValue());
        let contractId = this.props.contractId;
        let type = this.state.selectedType;
        Utils.cl("Type - "+ typeof amount);
        // validate data before client insert
        if ((!amount || typeof amount !== "number") || !contractId || !type ) {
            // Make sAlert here for the error message
            console.error('Fill out each field correctly!');
        } else {
            // insert client document
            let newCost = {
                type: type,
                amount: amount,
                contractId: contractId
            };

            Meteor.call('contract.addCost', newCost, (error, newCostId) => {
                if (error) {
                    console.error(error.reason);
                } else {
                    Utils.cl("successful! "+newCostId);
                }
            });
        }
        this.refs.addContractModal._dismiss(); // Hide the modal
    },

    getInitialState: function () {
        return {
            selectedType: null
        };
    },

    _handleCostSelectType(e, selectedIndex, menuItem) {
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


    _displayCostModal() {
        this.refs.addContractModal._show(); // ToDo: this is depreciated
    },

    render: function () {

        let addCostModalActions = [
            { text: 'Cancel' },
            { text: 'Submit', onTouchTap: this.onSubmit, ref: 'submit' }
        ];

        //let typeList = Contracts.simpleSchema()._schema["costs.$.type"].allowedValues;
        let typeList = [
            { payload:"Materials", name: "Materials"},
            { payload:"Parking", name: "Parking"},
            { payload:"Gas", name: "Gas"},
            { payload:"Lunch",  name: "Lunch"},
            { payload:"Other",  name: "Other"}
        ]

        let dialogWrapper = (
            <Dialog
                title="New Cost"
                actions={addCostModalActions}
                style={{"textAlign":"center", "minHeight": "300px"}}
                actionFocus="submit"
                ref="addContractModal"
                autoDetectWindowHeight={true}
                autoScrollBodyContent={true}>
                <div><TextField
                    hintText="How Much"
                    style={{"marginRight":"10px"}}
                    ref="amount"
                    type="number" />
                </div>
                <SelectField
                    value={this.state.selectedType}
                    onChange={this._handleCostSelectType}
                    hintText="Select a Type"
                    menuItems={typeList}
                    displayMember="name"
                    //valueMember="name"
                    ref="selectType"
                    style={{"marginRight":"10px"}} />
            </Dialog>
        );

        return (
            <div>
                <RaisedButton
                    primary={true}
                    labelPosition="after"
                    style={{verticalAlign: "top"}}
                    onClick={this._displayCostModal}>
                    <div>
                        <SvgIcons.ContentAddCircle style={{"marginRight":".1em"}}/>
                        <span className="font-btn">Add Cost</span>
                    </div>
                </RaisedButton>
                {dialogWrapper}
            </div>

        );
    }
});