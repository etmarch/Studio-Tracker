
var {RaisedButton, Checkbox, ListItem, List} = MUI;

/**
 * This component renders the single Contract Page
 * Render
 *          PostItem
 *          CommentItem         A list of comments
 *          CommentSubmit       A component to submit new comment
 * Props
 *          _id     String  Post's id
 *
 *          ToDo: create 2 children list components - expenses and payments
 */
/*
SingleContractView = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData () {
    return {
      postData: this.getData(),
      contract: Contracts.find({_id: this.props._id}),
      userIsLogged: Meteor.userId()
    }
  },

  getData () {
    if (FlowRouter.subsReady()) {
      return Posts.findOne();
    } else {
      return "Loading..."
    }
  },

  updateExpense (expense) {
    // Update current contract - add expense to array
    Meteor.call('updateExpense', expense, function (error, contractId) {
      if (error) {
        throwError(error.reason);
      }
    });
  },

  updatePayment (payment) {
    // Update current contract - add payment to payment array
    Meteor.call('updatePayment', payment, function (error, contractId) {
      if (error) {
        throwError(error.reason);
      }
    });
  },

  updateHours (workSession) {
 // Update current contract - hours and another work session
 Meteor.call('updateHours', workSession, function (error, contractId) {
 if (error) {
 throwError(error.reason);
 }
 });
 },

 contractCompletion (completion) {
 // Archive current contract - not listed as 'current' anymore - can still make payments
 Meteor.call('contractCompleted', completion, function (error, contractId) {
 if (error) {
 throwError(error.reason);
 }
 });
 },


  render () {
    let contract = this.data.postData;
    if (FlowRouter.subsReady()) {
      let renderedComments = this.data.comments.map(function (comment) {
        return <CommentItem
            key={comment._id}
            body={comment.body}
            author={comment.author}
            submittedText={comment.submitted}
            />
      });
      return (
          <div className="post-page page">
            <PostItem
                key={post._id}
                _id={post._id}
                title={post.title}
                url={post.url}
                authorId={post.userId}
                commentsCount={post.commentsCount}
                />
            <ul className="comments">
              {renderedComments}
            </ul>
            {this.data.userIsLogged ?
                <CommentSubmit
                    onCommentSubmit={this.submitComment}/> :
                <p id="login-leave-comment">Please log in to leave a comment.</p>
            }
          </div>
      );
    } else {
      return (
          <div>
            <Loading/>
          </div>
      )
    }

  }
});

*/









//


//



// Task component - represents a single todo item
/*Contract = React.createClass({
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
});*/