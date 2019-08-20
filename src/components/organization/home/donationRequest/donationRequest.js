import React from 'react';
import Container from '@material-ui/core/Container';
import Header from '../../../shared/header';
import InlineError from '../../../shared/inlineError';
import Button from '@material-ui/core/Button';
import {donationListMessage} from '../../../shared/validate';
import {firstMessageDonor} from '../../../../actions/organization';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Success from '../../../shared/success';
import image from '../../../../constants/image';
import Notifications, { notify } from 'react-notify-toast';
class DonationRequest extends React.Component {
    constructor(){
        super();
        this.ref = React.createRef();  
    }
    state = {
        stepTwoData:{
            donationMessage:''
        },
        successOpen: false,
        errorMessage:{},
    }
    onChange = (e) =>{
        this.setState({
            stepTwoData:{...this.state.stepTwoData, [e.target.name]: e.target.value}
        })
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const errorMessage = donationListMessage(this.state.stepTwoData)
        this.setState({ errorMessage });
        let id = this.props.match.params.id
        let data = {
            id: id,
            ...this.state.stepTwoData
        }
        if (Object.keys(errorMessage).length === 0) {
            this.props.firstMessageDonor(data);
        }
    }
    handleClickOpen = () => {
        this.setState({
            open:true 
        })
    }
    handleClose = () => {
        this.setState({
            successOpen:false 
        })
    }
    componentWillReceiveProps(postForm){
        console.log("postForm", postForm)
        if(postForm.message.statusSend){
            this.ref.current.reset();
            this.setState({
                successOpen:true 
            })
        }
        else{
            let myColor = { background: '#ea4c4c', fontWeight: "500", text: "#FFFFFF" };
            notify.show(postForm.errorMessage && postForm.errorMessage, "custom", 5000, myColor);
        }
    }
    render(){
        const {errorMessage} = this.state
        return (
            <>
                <Notifications />
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Items" back="backIcon" redirectUrl="/" menu="d-none" />
                        <div className="homeList dashboardBox">
                            <div className="font-13 color-label fontWeight-600 pb-15">Write a message to Donor</div>
                            <form onSubmit={this.onSubmit} ref={this.ref}>
                                <div error={errorMessage.donationMessage}>
                                    <textarea className="textarea" name="donationMessage" placeholder="Write here..." onChange={this.onChange}></textarea>
                                    {errorMessage.donationMessage && <InlineError text={errorMessage.donationMessage} />}
                                </div>
                                <div className="text-center btnSpace_Login">
                                <div className="h-45"></div>
                                <div className="h-45"></div>
                                <Button type="submit" className="btnPrimary">Send Request to Donor</Button>
                                </div>
                            </form>
                        </div>
                        <Success open={this.state.successOpen} onClose={this.handleClose} link="d-none" button="text-center"
            text="You've successfully submitted request for donation to Donor" successimg={image.success}/>
                    </Container>
                </div>
            </>
        )
    }
    
}
const mapDispatch = (dispatch) =>{
    return bindActionCreators ({
        firstMessageDonor
    }, dispatch)
}
const mapGetState =(state) =>{
    return{
        message: state.organizationUser,
    }
}
export default connect(mapGetState, mapDispatch)(DonationRequest);