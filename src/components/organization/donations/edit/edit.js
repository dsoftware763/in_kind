import React, { Component } from 'react';
import EditForm from './editForm';
import Header from '../../../shared/header';
import { organizationForm } from '../../../shared/validate';
import { fromError } from '../../../../actions/authentication';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from '@material-ui/core/Container';
import DashboardTabs from '../../../shared/dashboardTabs';
import { getIdDonation, updateDonation, initialStateProfile } from '../../../../actions/organization';

class EditOrg extends Component {
    state = {
        data: {
            itemNeed: '',
            itemMessage: '',
            organisationRequitmentId:''
        },
        errors: {},
    }
    
    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const errors = organizationForm(this.state.data)
        this.props.fromError(errors);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            console.log(this.state.data);
            this.props.updateDonation(this.state.data)
        }
    }
    componentDidMount() {
        let id = this.props.match.params.id
        this.props.getIdDonation(id);
    }
    componentWillMount(){
        this.props.initialStateProfile();
    }
    componentWillReceiveProps(donation) {
        const donationValue = donation.donation;
        if (donationValue.status) {
            this.setState({
                data: {
                    ...this.state.data,
                    itemNeed: donationValue.message.itemTitle,
                    itemMessage: donationValue.message.itemDescription,
                    organisationRequitmentId: donationValue.message.organisationRequitmentId
                }
            })
        }
    }
    render() {
        const { data } = this.state
        return (
            <>
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Edit" back="backIcon" redirectUrl="/donations" menu="d-none" />
                        <div className="dashboardBox">
                            <EditForm onSubmit={this.onSubmit} onChange={this.onChange} itemValue={data.itemNeed} messageValue={data.itemMessage} />
                            
                        </div>
                        <DashboardTabs />
                    </Container>
                </div>
            </>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        fromError,
        getIdDonation,
        updateDonation,
        initialStateProfile
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        donation: state.organizationUser.donationbyId,
        
    }
}
export default connect(mapGetState, mapDispatch)(EditOrg);