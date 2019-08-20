import React, { Component } from 'react';
import PostForm from './postForm';
import Header from '../../shared/header';
import { organizationForm } from '../../shared/validate';
import { fromError } from '../../../actions/authentication';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from '@material-ui/core/Container';
import DashboardTabs from '../../shared/dashboardTabs'
import { itemPost } from '../../../actions/organization';
class PostOrg extends Component {
    state = {
        data: {
            itemNeed: '',
            itemMessage: ''
        },
        errors: {},
    }
    onChange = (e) => {
        this.setState({
            data: { ...this.state.data, [e.target.name]: e.target.value }
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const errors = organizationForm(this.state.data)
        this.props.fromError(errors);
        this.setState({ errors });
        if (Object.keys(errors).length === 0) {
            console.log(this.state.data);
            this.props.itemPost(this.state.data)
        }
    }
    render() {
        return (
            <>
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Post" back="d-none" />
                        <div className="dashboardBox">
                            <PostForm onSubmit={this.onSubmit} onChange={this.onChange} />
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
        itemPost
    }, dispatch)
}
export default connect(null, mapDispatchError)(PostOrg);