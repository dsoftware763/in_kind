import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import InlineError from '../../shared/inlineError';
import Success from '../../shared/success';
import image from '../../../constants/image';

class PostForm extends React.Component {
    constructor(){
        super();
        this.state = {
            successOpen: false,
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
    componentWillReceiveProps(postSuccess){
        console.log("postSuccess", postSuccess)
        if(postSuccess.postSuccess.status){
            this.ref.current.reset();
            this.setState({
                successOpen:true 
            })
        }
    }
    render() {
        const { errors } = this.props
        return (
            <>
                <form onSubmit={this.props.onSubmit} ref={this.ref}>
                    <div error={!errors.itemNeed}>
                        <p className="font-13 color-label fontWeight-600 pt-15">Item Needed</p>
                        <TextField margin="normal" variant="outlined" name="itemNeed" placeholder="eg. Kids Train Set" className="formInput"
                            fullWidth onChange={this.props.onChange} />
                        {errors.itemNeed && <InlineError text={errors.itemNeed} />}
                    </div>
                    <div error={!errors.itemMessage}>
                        <p className="font-13 color-label fontWeight-600 pb-15 pt-15">How this item will help your organization</p>
                        <textarea className="textarea" placeholder="Write here..." name="itemMessage" onChange={this.props.onChange}></textarea>
                        {errors.itemMessage && <InlineError text={errors.itemMessage} />}
                    </div>
                    <div className="text-center btnSpace_Login w-100">
                        <div className="h-45"></div>
                        <div className="h-45"></div>
                        <Button type="submit" className="btnPrimary">Post</Button>
                    </div>
                </form>
                <Success open={this.state.successOpen} onClose={this.handleClose} link="d-none" button="text-center"
            text="You've successfully submitted request for donation to Donor" successimg={image.success}/>
            </>
        )
    }
}
const mapSetStates = (state) => {
    console.log(state)
    return {
        errors: state.users.nonProfitSignupError,
        postSuccess: state.organizationUser.donationPost
    }
}
export default connect(mapSetStates)(PostForm);