import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
const GuestRoute = ({isLoggedin, component: Component, ...rest}) => {
    return <div>
        <Route {...rest} render={props => !isLoggedin ? <Component {...props}/> : <Redirect to="/home" /> }/>
    </div>
}
const mapStateAuth = (state) =>{
    return{
        isLoggedin: state.users.token
    }
}
export default connect(mapStateAuth)(GuestRoute);