import React from 'react';
import SignupStepTwo from './signupSteptwo';
import SignupStepOne from './signupStepOne';
import Organization from './organization';
import { nonprofitStepOne, nonprofitStepTwo, organizationSignup } from '../../shared/validate';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fromError, organizationSignupData } from '../../../actions/authentication';
import { withRouter } from "react-router-dom";

class NonProfitSignup extends React.Component {
    constructor() {
        super()
        this.state = {
            page: 1,
            data: {
                ein_number: '',
                organization_name: '',
                zip_code: ''
            },
            dataNew: {
                email: '',
                name: '',
                password: '',
                confirm_password: '',
                address: '',
                website: '',
                city: '',
                state: '',
                phone_number: '',
                missionStatement: '',
                orgDescription: '',
                uploadLogo: '',
                logoUrl: '',
                storiesFile: [],
                storiesUrl: []
            },
            dataOrg: {
                organization: ''
            },
            errors: {},
            errorsNew: {},
            errorsOrg: {}
        }
    }
    nextPage = (e) => {
        e.preventDefault();
        const errors = nonprofitStepOne(this.state.data);
        this.props.fromError(errors)
        if (Object.keys(errors).length === 0) {
            this.setState({ page: this.state.page + 1 })
        }
    }
    nextOrg = (e) => {
        e.preventDefault();
        const errors = organizationSignup(this.state.dataOrg);
        this.props.fromError(errors);
        if (Object.keys(errors).length === 0) {
            this.setState({ page: this.state.page + 1 })
        }
    }
    onChangeStepOne = (e) => {
        this.setState({
            dataOrg: { ...this.state.dataOrg, [e.target.name]: e.target.value }
        })
    }
    onChangeStepTwo = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    onChangeStepThree = (e) => {
        this.setState({
            dataNew: { ...this.state.dataNew, [e.target.name]: e.target.value }
        })
    }
    uploadLogo = (e) => {
        let reader = new FileReader();
        let uploadLogo = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                dataNew: {
                    ...this.state.dataNew,
                    uploadLogo: uploadLogo,
                    logoUrl: reader.result
                }
            });
        }
        reader.readAsDataURL(uploadLogo);
    }
    uploadStories = (e) => {
        let storiesFile = Array.from(e.target.files);
        storiesFile.forEach((storiesFile) => {
            let reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    dataNew: {
                        ...this.state.dataNew,
                        storiesFile: [...this.state.dataNew.storiesFile, storiesFile],
                        storiesUrl: [...this.state.dataNew.storiesUrl, reader.result]
                    }
                });
            }
            reader.readAsDataURL(storiesFile);
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        const errors = nonprofitStepTwo(this.state.dataNew);
        this.props.fromError(errors);
        let credential = {
            ...this.state.data,
            ...this.state.dataNew,
            ...this.state.dataOrg
        }
        if (Object.keys(errors).length === 0) {
            this.props.organizationSignupData(credential);
            this.props.history.push('/causearea')
        }
    }
    render() {
        const { page, dataNew } = this.state
        console.log(dataNew)
        return (
            <div>
                {page === 1 && <Organization handleChange={this.onChangeStepOne} onSubmit={this.nextOrg} />}
                {page === 2 && <SignupStepOne onSubmit={this.nextPage} onChange={this.onChangeStepTwo} />}
                {page === 3 && <SignupStepTwo onSubmit={this.onSubmit} onChange={this.onChangeStepThree} uploadLogo={this.uploadLogo}
                    logoUrl={dataNew.logoUrl} uploadStories={this.uploadStories} storiesUrl={dataNew.storiesUrl}
                />}
            </div>
        )
    }
}
const mapDispatchErrors = (dispatch) => {
    return bindActionCreators({
        fromError,
        organizationSignupData
    }, dispatch)
}
const mapStepGet = (state) => {
    return {
        newprops: state.users
    }
}
const ShowTheLocationWithRouter = withRouter(NonProfitSignup);
export default connect(mapStepGet, mapDispatchErrors)(ShowTheLocationWithRouter);