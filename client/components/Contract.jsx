
var {RaisedButton, Checkbox, ListItem, List} = MUI;

// Task component - represents a single todo item
Contract = React.createClass({
  propTypes: {
    // This component gets the contract to display through a React prop.
    // We can use propTypes to indicate it is required
    contract: React.PropTypes.object.isRequired
  },

  toggleChecked() { // set checked property to opposite of its current value
    Meteor.call("setChecked", this.props.contract._id, ! this.props.contract.checked);
  },

  deleteThisContract() {
    Meteor.call("removeContract", this.props.contract._id);
    console.log(this.props.contract._id+ "removed!"); // debugging - only works on client not server, since its deleted
  },

  render() {

    // variable to compare for checked list item or not
    const contractClassName = this.props.contract.checked ? "checked" : "";

    let contractDate = moment(this.props.contract.createdAt).fromNow(true); // properly format date object

    let checkboxStyle = {
      display: 'inline-block', width: 'auto'
    }

    return (
        <div className="col-sm-12">
        <div className={contractClassName}>
          <RaisedButton className="delete btn btn-sm" onClick={this.deleteThisContract} label="X" primary={true}/>

          <Checkbox
              secondary={true}
              style={checkboxStyle}
              onClick={this.toggleChecked}
              checked={this.props.contract.checked}
              readOnly={false} />

          <span className="text">{this.props.contract.text} || {this.props.contract.username}</span>
          <span className="createdText">{contractDate}</span>
          <hr/>
        </div>
          </div>
    );
  }
});