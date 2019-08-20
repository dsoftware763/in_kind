import React from 'react';
import { Link } from 'react-router-dom';
import image from '../../../constants/image';
import {Container, Grid, Button} from '@material-ui/core';
import {causeArea} from '../../shared/validate'; 
import InlineError from '../../shared/inlineError'; 
import {fetchCauseArea, organisationSignUp} from '../../../actions/authentication';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Success from '../../shared/success';
import Notifications, { notify } from 'react-notify-toast';
import { imageUrl } from '../../../constants/type';

class CauseArea extends React.Component {
    constructor(){
        super()
        this.state = {
            successOpen: false,
            data:{
                causearea:[]
            },
            errors:{}
        }
    }
    onChange = (e) =>{
        let index;
        if (e.target.checked){
            this.setState({
                data:{ [e.target.name]: [...this.state.data.causearea, e.target.value]}
            })
        }
        else{
            index = this.state.data.causearea.indexOf(e.target.value)
            this.state.data.causearea.splice(index, 1)
            this.setState({
                data:{ [e.target.name]: [...this.state.data.causearea]}
            })
        }
    }
    onSubmit = (e) =>{
        e.preventDefault();
        const errors = causeArea(this.state.data)
        const credential ={
            ...this.props.getSignupdata,
            ...this.state.data
        }
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.organisationSignUp(credential);
            console.log("credential", credential)
        }
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
    componentDidMount(){
        this.props.fetchCauseArea();
    }
    componentWillReceiveProps(SignupSuccess){
        console.log(SignupSuccess)
        if(SignupSuccess.SignupSuccess && SignupSuccess.SignupSuccess.status){
            this.setState({
                successOpen:true 
            })
        }
        else if(SignupSuccess.SignupSuccess && !SignupSuccess.SignupSuccess.status) {
            let myColor = { background: '#ea4c4c', fontWeight: "500", text: "#FFFFFF" };
            notify.show(SignupSuccess.SignupSuccess && SignupSuccess.SignupSuccess.message, "custom", 5000, myColor);
        }
    }
    render() {
        const {errors} = this.state
        const {getCauseArea} = this.props
        return (
            <div className="backSplash">
            <Notifications />
                <Container className=" h-100 flex align-items-center">
                    <div className="boxLogin p-0">
                        <div className="loginHeader flex align-items-center pl-15">
                            <Link to="/login"><img src={image.backIcon} alt="prvious page" width="25px" /></Link>
                            <h4 className="donation-heading">Cause Area</h4>
                        </div>
                        <div className="organizationSelect causeArea">
                            <p className="color-label fontWeight-600 text-center pb-15">Select up to cause areas that best define your Organization's work</p>
                            <form onSubmit={this.onSubmit}>
                                <Grid container spacing={2} className="text-center fontWeight-500" error={errors.causearea}>
                                    { getCauseArea.message && getCauseArea.message.map(items => {
                                        return <Grid item xs={4} key={items.causeAreaId}>
                                                <input type="checkbox"  value={items.causeAreaId} name="causearea" id={items.causeAreaId} onChange={this.onChange} style={{ display: "none" }} />
                                                <div className="oragSelectBox p-0">
                                                    <label htmlFor={items.causeAreaId} className="pt-15 pb-15 cursor-pointer" style={{display:"block"}}>
                                                        <img src={imageUrl + items.causeAreaImage} alt="" width="50%"/>
                                                        <p className="color-label fontWeight-600 text-capitalize" style={{fontSize:'10px'}}>{items.causeAreaName}</p>
                                                    </label>
                                                </div>
                                            </Grid>
                                    })}
                                    <Grid item xs={12}>{ errors.causearea && <InlineError text={errors.causearea}/>}</Grid>
                                </Grid>
                                <div className="text-center btnSpace_Login"><Button type="submit" className="btnPrimary">Next</Button></div>
                            </form>
                        </div>
                    </div>
                    <Success open={this.state.successOpen} onClose={this.handleClose} link="text-center" button="d-none" redirectUrl="/"
                    text="Great job an Email has been sent. Please verify your email." successimg={image.successMail}/>  
                </Container>
            </div>
        )
    }
}
const mapDispatchCause = (dispatch) =>{
    return bindActionCreators({
        fetchCauseArea,
        organisationSignUp
    }, dispatch)
}
const mapSetCauseArea = (state) =>{
    return{
        getCauseArea: state.users.user,
        getSignupdata: state.users.organisationData,
        SignupSuccess: state.users.SignupSuccess
    }
}
export default connect(mapSetCauseArea, mapDispatchCause)(CauseArea);