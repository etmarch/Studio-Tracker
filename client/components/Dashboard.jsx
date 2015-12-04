/**
 * Dashboard Component
 */

const {
    Avatar,
    List,
    ListItem,
    ListDivider,
    RaisedButton,
    Styles
    } = MUI;

let {SvgIcons} = MUI.Libs;

const {ThemeManager} = Styles;

Dashboard = React.createClass({

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    /*getChildContext: function() {
        return {
            muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
        };
    },*/

    // This mixin makes the getMeteorData method work
    mixins: [ReactMeteorData, TimerMixin],

    // Retrieve the required data
    getMeteorData() {
        let query = {};
        //let handleCon = Meteor.subscribe("allContracts");
        //let handleCli = Meteor.subscribe("allClients");
        
        return {
            contracts: Contracts.find(query, {sort: {createdAt: -1}}).fetch(),
            contractsLoading: ! (handleCon.ready() && handleCli.ready())
        }
    },

    _navigateToLink(event) {
        event.preventDefault();
        FlowRouter.go(`/contracts/${ this.props._id }`);
    },

    renderContracts() {
        // Get contracts from this.data.contracts
        return this.data.contracts.map((contract) => {
            let contractPath = `/contracts/${ contract._id}`;
            return <ListItem
                key={contract._id}
                primaryText={<a href={contractPath}>{contract.title}</a>}
                //onTouch={this._navigateToContract}
                initiallyOpen={false}
                disabled={true}
                secondaryText={"Started: "+moment(contract.dateDue).format('hh:mm:ss A L')}
                rightIcon={<a href={contractPath}><SvgIcons.HardwareKeyboardArrowRight /></a>} >
                <ListDivider inset={false} />
            </ListItem>
        });
    },

    render () {
        let contracts = this.renderContracts();
        if (this.data.contractsLoading) {
            return (<Loading />);
        } else {
            return (
                <div className="">
                    <h3>Welcome, Marcel</h3>
                    <div className="">
                        <p>Recently Live</p>
                        <p>Contract Name</p>
                    </div>
                    <List subheader="Current Contracts">
                        {contracts}
                    </List>
                </div>
            )
        }
    }
});