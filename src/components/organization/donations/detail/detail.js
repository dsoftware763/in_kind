import React from 'react';
import Container from '@material-ui/core/Container';
import Header from '../../../shared/header';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getIdDonation } from '../../../../actions/organization';
class DetailOrg extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id
        this.props.getIdDonation(id);
    }
    render() {
        const donation = this.props.donation.message;
        console.log(donation)
        return (
            <>
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Items" back="backIcon" redirectUrl="/donations" menu="d-none" />
                        <div className="homeList dashboardBox">
                            {donation && <div>
                                <h4 className="color-label pt-15 pb-15">{donation.itemTitle}</h4>
                                <h4 className="color-label pb-15">How thisitem will help your organization</h4>
                                <p className="color-grey font-13">{donation.itemDescription}</p>
                                <div className="text-center btnSpace_Login w-100">
                                    <div className="h-45"></div>
                                    <div className="h-45"></div>
                                    <Link to={{pathname: "/edit/" + donation.organisationRequitmentId}} className="btnPrimary text-uppercase">Edit</Link>
                                </div>
                            </div>}
                        </div>
                    </Container>
                </div>
            </>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        getIdDonation
    }, dispatch)
}
const mapGetState = (state) => {
    console.log(state)
    return {
        donation: state.organizationUser.donationbyId
    }
}
export default connect(mapGetState, mapDispatch)(DetailOrg);