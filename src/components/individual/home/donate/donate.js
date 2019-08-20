import React from 'react';
import DonateStepOne from './donateStepOne';
import DonateStepTwo from './donateStepTwo';
import Container from '@material-ui/core/Container';
import Header from '../../../shared/header';
import {donationListSelect, donationListMessage} from '../../../shared/validate';
import {fromError} from '../../../../actions/authentication';
import {donationDonate} from '../../../../actions/individualUser';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
class Donate extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            stepOneData:{
                donationList: ''
            },
            stepTwoData:{
                donationMessage:''
            },
            errors:{},
            errorMessage:{}
        }
    }
    nextPage = (e) => {
        e.preventDefault();
        const errors = donationListSelect(this.state.stepOneData);
        this.props.fromError(errors)
        if (Object.keys(errors).length === 0) {
            this.setState({ page: this.state.page + 1 })
        }
    }
    handleChange = (e) =>{
        let index;
        if (e.target.checked){
            this.setState({
                // stepOneData:{ [e.target.name]: [...this.state.stepOneData.donationList, e.target.value]}
                stepOneData:{...this.state.stepOneData,[e.target.name]: e.target.value}
            })
        }
        else{
            index = this.state.stepOneData.donationList.indexOf(e.target.value)
            this.state.stepOneData.donationList.splice(index, 1)
            this.setState({
                // stepOneData:{...this.state.stepOneData.donationList}
                stepOneData:{ [e.target.name]: [...this.state.stepOneData.donationList]}
            })
        }
    }
    onChange = (e) =>{
        this.setState({
            stepTwoData:{...this.state.stepTwoData, [e.target.name]: e.target.value}
        })
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const errors = donationListMessage(this.state.stepTwoData)
        this.props.fromError(errors);
        let organisationId = this.props.match.params.id
        const data = {
            ...this.state.stepOneData,
            ...this.state.stepTwoData,
            organisationId
        }
        if (Object.keys(errors).length === 0) {
            this.props.donationDonate(data)
        }
    }
    render() {
        const { page, stepOneData } = this.state
        return (
            <>
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Donations" back="backIcon" redirectUrl="/" menu="d-none" />
                        <div className="homeList dashboardBox">
                            {page === 1 && <DonateStepOne nextPage={this.nextPage} handleChange={this.handleChange} selectList={stepOneData.donationList}/>}
                            {page === 2 && <DonateStepTwo onSubmit={this.onSubmit} onChange={this.onChange}/>}
                        </div>
                    </Container>
                </div>
            </>
        )
    }
}
const mapDispatchErrors = (dispatch) =>{
    return bindActionCreators({
        fromError,
        donationDonate
    }, dispatch)
}
export default connect(null, mapDispatchErrors)(Donate);