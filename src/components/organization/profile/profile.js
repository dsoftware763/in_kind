import React from 'react';
import Header from '../../shared/header';
import Container from '@material-ui/core/Container';
import DashboardTabs from '../../shared/dashboardTabs';
import ProfileForm from './profileForm';
import { profileFormOrg } from '../../shared/validate';
import { fromError } from '../../../actions/authentication';
import { profileInfo, profileUpdate, initialStateProfile } from '../../../actions/organization';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Notifications, { notify } from 'react-notify-toast';
class ProfileOrg extends React.Component {
    constructor() {
        super();
        this.state = {
            data: {
                organisationName: '',
                address: '',
                zipcode: '',
                city: '',
                state: '',
                phoneNumber: '',
                imagePost: '',
                file: '',
                website:'',
                imagePreviewUrl: ''

            },
            errors: {}
        }
    }
    handelFileUpload = (e) => {
        let reader = new FileReader();
        let file = e.target.files[0];
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
    }
    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const errors = profileFormOrg(this.state.data)
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
        this.props.initialStateProfile();
    }
    componentWillReceiveProps(profileValues) {
        console.log("profileValues", profileValues)
        const profileDetail = profileValues.profileValues
        if (profileDetail.status) {
            this.setState({
                data: {
                    ...this.state.data,
                    organisationName: profileDetail.message.UserOrg[0].organisationName,
                    address: profileDetail.message.address,
                    zipcode: profileDetail.message.zipcode,
                    city: profileDetail.message.city,
                    state: profileDetail.message.state,
                    phoneNumber: profileDetail.message.phoneNumber,
                    imagePost: profileDetail.message.UserOrg[0].logo,
                    website:profileDetail.message.UserOrg[0].website
                }
            })
        }
        if(profileValues.updateSuccess.status){
            let myColor = { background: '#00ca30', fontWeight: "500", text: "#FFFFFF" };
            notify.show('Successfully update your profile', "custom", 5000, myColor);
        }else if(profileValues.updateError.error){
            let myColor = { background: '#ea4c4c', fontWeight: "500", text: "#FFFFFF" };
            notify.show(profileValues.updateError && profileValues.updateError.errorMessage, "custom", 5000, myColor);
        }
    }
    render() {
        const { data } = this.state;
        console.log(data.imagePreviewUrl)
        const profileValues = this.props.profileValues.message;
        return (
            <>
                <Notifications />
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Profile" back="d-none" />
                        <div className="dashboardBox">
                        <ProfileForm onChange={this.onChange} onSubmit={this.onSubmit} organisationName={data.organisationName} 
                                address={data.address} website={data.website}
                                zipcode={data.zipcode} city={data.city} state={data.state} phoneNumber={data.phoneNumber}
                                imagePreviewUrl={data.imagePreviewUrl} imagePost={data.imagePost} memberSince={profileValues && profileValues.createdAt}
                                handelFileUpload={this.handelFileUpload} totalPosted={profileValues && profileValues.orgRequitments.length}
                                addressNonedit={profileValues && profileValues.address} nameNonedit={profileValues && profileValues.UserOrg[0].organisationName}
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
        initialStateProfile
    }, dispatch)
}
const mapStateGet = (state) =>{
    return{
        profileValues: state.organizationUser.profileInfo,
        updateSuccess: state.organizationUser.profileUpdate,
        updateError: state.organizationUser
    }
}
export default connect(mapStateGet, mapDispatch)(ProfileOrg);