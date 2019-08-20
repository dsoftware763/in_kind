import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import image from '../../constants/image';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {logoutuser} from '../../actions/authentication';
const Logout = (props) => {
    return (
        <Dialog onClose={props.onClose} {...props} >
            <div className="forgotPass">
                <h4 className="text-center headingPop">Log Out <div><img src={image.headingBorder} alt="" className="headingBorder" /></div></h4>
                <p className="color-grey font-13 text-center" style={{ marginTop: "10px" }}>{props.text}</p>
                <div className="flex justify-content-center">
                    <div className="text-center btnSpace_Login" style={{marginRight:"10px"}}><Button onClick={props.onClose} type="button" className="btnPrimary btnWarning">No</Button></div>
                    <div className="text-center btnSpace_Login"><Button type="button" className="btnPrimary" onClick={() => props.logoutuser()}>Yes</Button></div>
                </div>
            </div>
        </Dialog>
    )
}
const mapDispatchLogout = (dispatch) =>{
    return bindActionCreators({
        logoutuser
    }, dispatch)
}
export default connect(null, mapDispatchLogout)(Logout);