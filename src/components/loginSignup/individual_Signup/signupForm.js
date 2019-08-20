import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import image from '../../../constants/image';
import { signupValidator } from '../../shared/validate';
import InlineError from '../../shared/inlineError';
import { signUp } from '../../../actions/authentication';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from "react-router-dom";
import Success from '../../shared/success';
import Notifications, { notify } from 'react-notify-toast';

class SignUpStepOne extends React.Component {
    constructor() {
        super();
        this.ref = React.createRef()
        this.state = {
            data: {
                name: '',
                email: '',
                password: '',
                confirm_password: '',
                address: '',
                zipcode: '',
                city: '',
                state: '',
                phone_number: ''
            },
            errors: {}
        }
    }

    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }
    handleClose = () => {
        this.setState({
            successOpen: false
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const errors = signupValidator(this.state.data);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.signUp(this.state.data);
        }
    }
    componentWillReceiveProps(signupSuccess) {
        console.log(signupSuccess)
        if (signupSuccess.signupSuccess.status) {
            this.ref.current.reset();
            this.setState({
                successOpen: true
            })
        }
        else {
            let myColor = { background: '#ea4c4c', fontWeight: "500", text: "#FFFFFF" };
            notify.show(signupSuccess.signupSuccess.message, "custom", 5000, myColor);
        }
    }

    render() {
        const { errors } = this.state;
        return (
            <div className="loginForm">
                <Notifications />
                <form className="fromDesign" onSubmit={this.onSubmit} ref={this.ref}>
                    <Grid container >
                        <Grid item xs={12} error={!errors.name}>
                            <TextField onChange={this.onChange} label="Full Name" name="name" type="text" margin="normal" className="formInput" fullWidth />
                            {errors.name && <InlineError text={errors.name} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.email}>
                            <TextField onChange={this.onChange} label="Email" name="email" type="email" margin="normal" className="formInput" fullWidth />
                            {errors.email && <InlineError text={errors.email} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.password}>
                            <TextField onChange={this.onChange} label="Password" pattern="(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" name="password" type="password" className="formInput" margin="normal" fullWidth />
                            {errors.password && <InlineError text={errors.password} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.confirm_password}>
                            <TextField onChange={this.onChange} label="Confirm Password" name="confirm_password" type="password" className="formInput" margin="normal" fullWidth />
                            {errors.confirm_password && <InlineError text={errors.confirm_password} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.address}>
                            <TextField onChange={this.onChange} label="Address" type="text" name="address" className="formInput" margin="normal" fullWidth />
                            {errors.address && <InlineError text={errors.address} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.zipcode}>
                            <TextField onChange={this.onChange} label="Zipcode" type="text" name="zipcode" className="formInput" margin="normal" fullWidth />
                            {errors.zipcode && <InlineError text={errors.zipcode} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.city}>
                            <TextField onChange={this.onChange} label="City" type="text" name="city" className="formInput" margin="normal" fullWidth />
                            {errors.city && <InlineError text={errors.city} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.state}>
                            <TextField onChange={this.onChange} label="State" name="state" type="text" className="formInput" margin="normal" fullWidth />
                            {errors.state && <InlineError text={errors.state} />}
                        </Grid>
                        <Grid item xs={12} error={!errors.phone_number}>
                            <TextField onChange={this.onChange} label="Phone Number" name="phone_number" type="text" className="formInput" margin="normal" fullWidth />
                            {errors.phone_number && <InlineError text={errors.phone_number} />}
                        </Grid>
                        <p className="color-grey font-13 fontWeight-600 w-100 text-center" style={{ paddingTop: "20px" }}>By creating an account you agree to our <br />Terms of Services and Privacy Policy</p>
                    </Grid>
                    <div className="h-45"></div>
                    <div className="text-center"><Button type="submit" className="btnLogin"><img src={image.btnRightArrow} alt="login button" width="32px" /></Button></div>
                    <div className="h-45"></div>
                </form>
                <Success open={this.state.successOpen} onClose={this.handleClose} link="d-none" button="text-center"
                    text="Great job an Email has been sent. Please verify your email." successimg={image.successMail} />
            </div>
        )
    }
}
const mapStepOneSignup = (dispatch) => {
    return bindActionCreators({
        signUp
    }, dispatch)
}
const mapStepGet = (state) => {
    return {
        signupSuccess: state.users.user
    }
}
const ShowTheLocationWithRouter = withRouter(SignUpStepOne);
export default connect(mapStepGet, mapStepOneSignup)(ShowTheLocationWithRouter);