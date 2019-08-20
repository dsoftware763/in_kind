import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Container from '@material-ui/core/Container';
import LoginForm from './loginForm.js';
import SignupForm from './individual_Signup/signupForm';
import NonProfitSignup from './nonProfit_signup/nonProfitSignup';
import image from '../../constants/image';
import {connect} from 'react-redux';

function LoginSignup(props){
    const [value, setValue] = React.useState(0);

    function handleChange(event, newValue) {
      setValue(newValue);
    }
    const userRole = props.role.SignupRole;
    if (props.role.nextstep === false){
        props.history.push('/')
    }
    return(
        <div className="backSplash">
            <Container className="loginSignup h-100" style={{display:"flex",alignItems:"center"}}>
                <div className="boxLogin p-0">
                    <AppBar position="static" className="loginHeader">
                        <Tabs value={value} onChange={handleChange} >
                            <Tab label="Log In" className="tabs_Signup"/>
                            <Tab label="Sign up" className="tabs_Signup" />
                        </Tabs>
                    </AppBar>
                    <div style={{background:"#f8f8f8",borderRadius:"30px",marginTop: "20px",paddingTop: "10px"}}>
                        {userRole.Role === "individual" && <h4 className="loginHeading text-center"><img src={image.accIconRight} alt="" width="10px"/>Account Profile<img src={image.accIconLeft} width="10px" alt=""/></h4>}
                        {userRole.Role === "nonprofit" && <h4 className="loginHeading text-center"><img src={image.accIconRight} alt="" width="10px"/>Non Profit Registration<img src={image.accIconLeft} width="10px" alt=""/></h4>}
                        {value === 0 && <LoginForm></LoginForm>}
                        {value === 1 && userRole.Role === "individual" && <SignupForm></SignupForm>}
                        {value === 1 && userRole.Role === "nonprofit" && <NonProfitSignup></NonProfitSignup>}
                    </div>
                </div>
            </Container>
        </div>
    )
}
const mapUserRole = (state) => {
    return {
        role: state.users
    }
}
export default connect(mapUserRole)(LoginSignup);