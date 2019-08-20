import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import image from '../../constants/image';
import ForgotPassword from '../forgotPassword/forgotPassword';
import { loginValidator } from '../shared/validate';
import InlineError from '../shared/inlineError';
import { login } from '../../actions/authentication';
import Success from '../shared/success';
import { Link } from 'react-router-dom';
import Notifications, { notify } from 'react-notify-toast';

class LoginForm extends React.Component {
    constructor() {
        super()
        this.state = {
            open: false,
            successOpen: false,
            data: {
                login_email: '',
                login_password: ''
            },
            login_errors: {},
            loginCredential: false
        }
    }
    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const login_errors = loginValidator(this.state.data);
        this.setState({ login_errors });
        if (Object.keys(login_errors).length === 0) {
            this.props.login(this.state.data);
        }
    }
    handleClickOpen = () => {
        this.setState({
            open: true
        })
    }
    handleCloseForgot = () => {
        this.setState({
            open: false
        })
    }
    handleClose = () => {
        this.setState({
            successOpen: false
        })
    }
    componentWillReceiveProps(loginStatus) {
        if (loginStatus.loginStatus.status) {
            this.setState({
                successOpen: true
            })
            this.handleCloseForgot();
        }
        else {
            let myColor = { background: '#ea4c4c', fontWeight: "500", text: "#FFFFFF" };
            notify.show(loginStatus.loginStatus.message, "custom", 5000, myColor);
        }
    }
    render() {
        const { login_errors } = this.state;
        return (
            <div className="loginForm">
                <Notifications />
                <form onSubmit={this.onSubmit} className="fromDesign">
                    <Grid container >
                        <Grid item xs={12} error={!login_errors.login_email}>
                            <TextField name="login_email" margin="normal" onChange={this.onChange} label="Email" type="email" className="formInput" fullWidth />
                            {login_errors.login_email && <InlineError text={login_errors.login_email} />}
                        </Grid>
                        <Grid item xs={12} error={!login_errors.login_password}>
                            <TextField onChange={this.onChange} label="password" margin="normal" name="login_password" type="password" className="formInput" fullWidth />
                            {login_errors.login_password && <InlineError text={login_errors.login_password} />}
                        </Grid>
                        <p onClick={this.handleClickOpen} style={{ paddingTop: "10px" }} className="text-uppercase color-primary font-12 cursor-pointer fontWeight-600 w-100">Forgot Password?</p>
                        <Link to="/privacy-policy" className="color-grey font-13 fontWeight-600 w-100" style={{ paddingTop: "20px" }}>Terms of Services and Privacy Policy</Link>
                    </Grid>
                    <div className="text-center btnSpace_Login">
                        <Button type="submit" className="btnLogin"><img src={image.btnRightArrow} alt="login button" width="32px" /></Button>
                        <Link to="/" className="color-primary text-uppercase fontWeight-500" style={{ width: "100%", display: "block", paddingTop: "14px", fontSize: "18px" }}>Back</Link>
                    </div>
                </form>
                <ForgotPassword open={this.state.open} onClose={this.handleCloseForgot} />
                <Success open={this.state.successOpen} onClose={this.handleClose}
                    text="Great job an Email has been sent. just click on the link to reset your Password" successimg={image.successMail} />
            </div>
        )
    }
}
const mapDispatchLogin = (dispatch) => {
    return bindActionCreators({
        login
    }, dispatch)
}
const mapGetResponse = (state) => {
    return {
        loginStatus: state.users.user,
    }
}
export default connect(mapGetResponse, mapDispatchLogin)(LoginForm);