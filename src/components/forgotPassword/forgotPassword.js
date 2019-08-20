import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {forgotValidator} from '../shared/validate';
import InlineError from '../shared/inlineError';
import image from '../../constants/image';
import {forgot} from '../../actions/authentication';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Dialog from '@material-ui/core/Dialog';

class ForgotPassword extends React.Component{
    
    state = {
        data:{
            email:''
        },
        errors:{}
    }
    onChange = (e) =>{
        this.setState({
            data:{...this.state.data, [e.target.name]: e.target.value}
        })
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const errors = forgotValidator(this.state.data);
        this.setState({errors});
        if (Object.keys(errors).length === 0) {
            this.props.forgot(this.state.data);
        }
    }
    
    render(){
        const {  errors } = this.state;
        return(
            <Dialog onClose={this.props.handleClose} {...this.props}>
                <div className="forgotPass">
                    <h4 className="text-center headingPop">Forgot Password <div><img src={image.headingBorder} alt="" className="headingBorder"/></div></h4>
                    <p className="color-grey font-13 text-center" style={{marginTop:"10px"}}>Don't worry, just enter your registered email address and we'll send a link to reset your Password</p>
                    <form onSubmit={this.onSubmit}>
                        <Grid item xs={12} error={!errors.email}>
                            <TextField onChange={this.onChange} label="Email" margin="normal" name="email" type="email" className="formInput" fullWidth/>
                            { errors.email && <InlineError text={errors.email}/>}
                        </Grid>
                        <div className="text-center btnSpace_Login"><Button type="submit" className="btnPrimary">Send Link</Button></div>
                    </form>
                </div>
            </Dialog>
        )
    }
}
const mapDispacthForgot = (dispatch) =>{
    return bindActionCreators({
        forgot
    }, dispatch)
}
export default connect(null, mapDispacthForgot)(ForgotPassword);