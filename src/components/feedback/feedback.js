import React from 'react';
import Header from '../shared/header';
import Container from '@material-ui/core/Container';
import DashboardTabs from '../shared/dashboardTabs';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { feedback } from '../../actions/individualUser';
import { bindActionCreators } from 'redux';
import Notifications, { notify } from 'react-notify-toast';

class Feedback extends React.Component {
    constructor() {
        super();
        this.state = {
            donationMessage: ''
        }
        this.ref = React.createRef();
    }
    onChange = (e) => {
        this.setState({
            donationMessage: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.feedback(this.state)
    }
    componentWillReceiveProps(props){
        const {postSuccess,postError} = props
        if(postSuccess.status){
            let myColor = { background: '#00ca30', fontWeight: "500", text: "#FFFFFF" };
            notify.show(postSuccess.message, "custom", 5000, myColor);
            this.ref.current.reset();
        }else{
            let myColor = { background: '#ea4c4c', fontWeight: "500", text: "#FFFFFF" };
            notify.show(postError.message, "custom", 5000, myColor);
        }
    }
    render() {
        
        return (
            <>
                <Notifications />
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Feedback" back="d-none"/>
                        <div className="dashboardBox p-0">
                            <form onSubmit={this.onSubmit} ref={this.ref}>
                                <div className="font-13 color-label fontWeight-600 pb-15">Write a your feedback</div>
                                <textarea className="textarea" name="donationMessage" placeholder="Write here..." onChange={this.onChange}></textarea>
                                <div className="text-center btnSpace_Login">
                                    <Button type="submit" className="btnPrimary">Submit Feedback</Button>
                                </div>
                            </form>
                        </div>
                        <DashboardTabs />
                    </Container>
                </div>
            </>
        )
    }
}
const mapDispatchState = (dispatch) => {
    return bindActionCreators({
        feedback
    }, dispatch)
}
const mapStateGet =(state) =>{
    return{
        postSuccess: state.individualUser.formPost,
        postError: state.individualUser
    }
}
export default connect(mapStateGet, mapDispatchState)(Feedback);