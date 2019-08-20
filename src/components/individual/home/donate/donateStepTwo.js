import React from 'react';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import InlineError from '../../../shared/inlineError';
import Success from '../../../shared/success';
import image from '../../../../constants/image';
import Notifications, { notify } from 'react-notify-toast';

class DonateStepTwo extends React.Component {
    constructor(){
        super();
        this.state = {
            successOpen: false
        }
        this.ref = React.createRef();   
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
        if(postForm.postForm.status){
            this.ref.current.reset();
            this.setState({
                successOpen:true 
            })
        }
        else{
            let myColor = { background: '#ea4c4c', fontWeight: "500", text: "#FFFFFF" };
            notify.show(postForm.postForm && postForm.postForm.message, "custom", 5000, myColor);
        }
    }
    render() {
        const { errors } = this.props;
        return (
            <>
                <Notifications />
                <div className="font-13 color-label fontWeight-600 pb-15">Write a message to non profit</div>
                <form onSubmit={this.props.onSubmit} ref={this.ref}>
                    <div error={errors.donationMessage}>
                        <textarea className="textarea" name="donationMessage" placeholder="Write here..." onChange={this.props.onChange}></textarea>
                        {errors.donationMessage && <InlineError text={errors.donationMessage} />}
                    </div>
                    <div className="text-center btnSpace_Login"><Button type="submit" className="btnPrimary">Done</Button></div>
                </form>
                <Success open={this.state.successOpen} onClose={this.handleClose} link="d-none" button="text-center"
            text="Congratulations! You are helping making your community a better place! Your donation request has been submitted" successimg={image.success}/>
            </>
        )
    }
}
const mapGetState = (state) => {
    return {
        errors: state.users.nonProfitSignupError,
        postForm: state.individualUser.formPost
    }
}
export default connect(mapGetState)(DonateStepTwo);
