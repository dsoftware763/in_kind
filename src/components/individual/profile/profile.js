import React from 'react';
import Header from '../../shared/header';
import Container from '@material-ui/core/Container';
import DashboardTabs from '../../shared/dashboardTabs';
import { fromError } from '../../../actions/authentication';
import { profileInfo, profileUpdate, initialState } from '../../../actions/individualUser';
import { profileForm } from '../../shared/validate';
import ProfileForm from './profileForm';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notifications, { notify } from 'react-notify-toast';
class Profile extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                name: '',
                address: '',
                zipcode: '',
                city: '',
                state: '',
                phoneNumber: '',
                imagePost: '',
                file: '',
                imagePreviewUrl: ''

            },
            errors: {}
        }
    }
    handelFileUpload = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(reader)
        reader.onloadend = () => {
            this.setState({
                data: {
                    ...this.state.data,
                    file: file,
                    imagePreviewUrl: reader.result
                }
            });
        }
        reader.readAsDataURL(file);
        this.setState({
            data: { ...this.state.data, imagePreviewUrl: file }
        })
    }
    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const errors = profileForm(this.state.data)
        this.setState({ errors })
        this.props.fromError(errors);
        if (Object.keys(errors).length === 0) {
            this.props.profileUpdate(this.state.data)
        }
    }
    componentDidMount() {
        this.props.profileInfo();
    }
    componentWillMount(){
        this.props.initialState()
    }
    componentWillReceiveProps(profileValues) {
        console.log("profileValues", profileValues)
        const profileDetail = profileValues.profileValues
        if (profileDetail.status) {
            this.setState({
                data: {
                    ...this.state.data,
                    name: profileDetail.message.fullName,
                    address: profileDetail.message.address,
                    zipcode: profileDetail.message.zipcode,
                    city: profileDetail.message.city,
                    state: profileDetail.message.state,
                    phoneNumber: profileDetail.message.phoneNumber,
                    imagePost: profileDetail.message.profilePicture,
                }
            })
        }
        if(profileValues.updateSuccess.status){
            let myColor = { background: '#00ca30', fontWeight: "500", text: "#FFFFFF" };
            notify.show('Successfully update your profile', "custom", 5000, myColor);
        }else if(profileValues.updateError.error){
            let myColor = { background: '#ea4c4c', fontWeight: "500", text: "#FFFFFF" };
            notify.show(profileValues.updateError.message, "custom", 5000, myColor);
        }
    }
    render() {
        const { data } = this.state;
        const profileValues = this.props.profileValues.message;
        return (
            <>
                <Notifications />
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Profile" back="d-none" />
                        <div className="dashboardBox">
                            <ProfileForm onChange={this.onChange} onSubmit={this.onSubmit} name={data.name} address={data.address}
                                zipcode={data.zipcode} city={data.city} state={data.state} phoneNumber={data.phoneNumber}
                                imagePreviewUrl={data.imagePreviewUrl} imagePost={data.imagePost} memberSince={profileValues && profileValues.createdAt}
                                handelFileUpload={this.handelFileUpload} itemDonated={profileValues && profileValues.ItemsDonated.length}
                                addressNonedit={profileValues && profileValues.address} nameNonedit={profileValues && profileValues.fullName}
                                />
                        </div>
                        <DashboardTabs />
                    </Container>
                </div>
            </>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        fromError,
        profileInfo,
        profileUpdate,
        initialState
    }, dispatch)
}
const mapStateGet = (state) => {
    return {
        profileValues: state.individualUser.profileDetail,
        updateSuccess: state.individualUser.formPost,
        updateError: state.individualUser
    }
}
export default connect(mapStateGet, mapDispatch)(Profile);