import React, {Component} from 'react';
import PostForm from './postForm';
import Header from '../../shared/header';
import { itemDonatePost } from '../../shared/validate';
import { fromError } from '../../../actions/authentication';
import { donationPost } from '../../../actions/individualUser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from '@material-ui/core/Container';
import DashboardTabs from '../../shared/dashboardTabs'

class Post extends Component {
    
    state = {
        data: {
            imagePost: '',
            itemDonate: '',
            sendMethod: '',
            miles: '',
            imagePreviewUrl:''
        },
        value: '',
        errors: {},
    }
    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    handelFileUpload = (e) =>{
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                data: {
                    ...this.state.data,
                    imagePost: file,
                    imagePreviewUrl: reader.result
                }
            });
        }
        reader.readAsDataURL(file);
    }
    onClick = (value) => {
        if (value === "picked") {
            this.setState({
                data: { ...this.state.data.miles = 0 }
            })
        }
    }
    onSubmit = (e) => {
        e.preventDefault();
        const errors = itemDonatePost(this.state.data)
        this.props.fromError(errors);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            this.props.donationPost(this.state.data);
        }
    }
    render() {
        const {data} =this.state
        return (
            <>
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Post" back="d-none"/>
                        <div className="dashboardBox pt-0">
                            <PostForm onSubmit={this.onSubmit}  onChange={this.onChange} handelFileUpload={this.handelFileUpload} handelclickOpen={this.onClick} 
                            miles={data.miles} imagePreviewUrl={data.imagePreviewUrl}/>
                        </div>
                        <DashboardTabs />
                    </Container>
                </div>
            </>
        )
    }
}
const mapDispatchError = (dispatch) => {
    return bindActionCreators({
        fromError,
        donationPost
    }, dispatch)
}
export default connect(null, mapDispatchError)(Post);