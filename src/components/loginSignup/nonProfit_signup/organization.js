import React from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import InlineError from '../../shared/inlineError';
import { bindActionCreators } from 'redux';
import { fetchOrganization } from '../../../actions/authentication';
import { withRouter } from "react-router-dom";

class Organization extends React.Component {
    componentDidMount() {
        this.props.fetchOrganization();
    }
    render() {
        const { errors } = this.props
        return (
            <div className="loginForm">
                <div className="organizationSelect">
                    <p className="color-label fontWeight-600" style={{fontSize:'15px', paddingBottom:'20px'}}>Who can get donations...</p>
                    <form onSubmit={this.props.onSubmit}>
                        <div error={!errors.organization}>
                            {this.props.getOrganization.message && this.props.getOrganization.message.map(items => {
                                return <div key={items.organisationTypeId}>
                                    <input type="radio" color="primary" value={items.organisationTypeId} name="organization" id={items.organisationTypeId} onChange={this.props.handleChange} style={{ display: "none" }} />
                                    <div className="oragSelectBox">
                                        <label htmlFor={items.organisationTypeId} className="cursor-pointer">
                                            <h4 className="Subheading color-label text-capitalize">{items.organisationTypeName}</h4>
                                            <p className="color-grey font-13">{items.organisationTypeDescription}</p>
                                        </label>
                                    </div>
                                </div>
                            })}
                            {errors.organization && <InlineError text={errors.organization} />}
                        </div>
                        <div className="text-center btnSpace_Login"><Button type="submit" className="btnPrimary">Next</Button></div>
                    </form>
                </div>
            </div>
        )
    }
}
const mapSetSignupdata = (state) => {
    return {
        getOrganization: state.users.getOrganization,
        errors: state.users.nonProfitSignupError
    }
}
const mapDispatchOrganization = (dispatch) => {
    return bindActionCreators({
        fetchOrganization
    }, dispatch)
}
const ShowTheLocationWithRouter = withRouter(Organization);
export default connect(mapSetSignupdata, mapDispatchOrganization)(ShowTheLocationWithRouter)