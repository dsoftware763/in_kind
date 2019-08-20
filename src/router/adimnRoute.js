import React from 'react';
import { Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
const AdminRoute = ({isLoggedin, component: Component, ...rest}) => {
    return <div>
        <Route {...rest} render={props => isLoggedin ? <Component {...props}/> : <Redirect to="/" /> }/>
    </div>
}
const mapStateAuth = (state) =>{
    console.log(state.user)
    return{
        isLoggedin: state.users.token
    }
}
export default connect(mapStateAuth)(AdminRoute);