import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'
import image from '../../constants/image';
const Success = (props) =>{
    return(
        <Dialog onClose={props.onClose} {...props} >
            <div className="forgotPass">
                <h4 className="text-center headingPop">Success <div><img src={image.headingBorder} alt="" className="headingBorder"/></div></h4>
                <p className="color-grey font-13 text-center" style={{marginTop:"10px"}}>{props.text}</p>
                <div className="text-center" style={{padding:"25px 0px"}}>
                    <img src={props.successimg} alt="" width="90px"/>
                </div>
                <div className="text-center btnSpace_Login" className={props.button}><Button onClick={props.onClose} type="button" className="btnPrimary">oK</Button></div>
                <div className="text-center btnSpace_Login" className={props.link}><Link to={props.redirectUrl} type="button" className="btnPrimary">oK</Link></div>
            </div>
        </Dialog>
    )
}
export default Success;