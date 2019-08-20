import React from 'react';
import Grid from '@material-ui/core/Grid';
import image from '../../../constants/image';
import Header from '../../shared/header';
import Container from '@material-ui/core/Container';
import DashboardTabs from '../../shared/dashboardTabs';
import { Link } from 'react-router-dom';
import { getDonation } from '../../../actions/organization';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';
import Notifications, { notify } from 'react-notify-toast';

class DonationsOrg extends React.Component {
    componentDidMount() {
        this.props.getDonation();
    }
    render() {
        const { donation } = this.props;
        const { updateError } = this.props;
        if (updateError.error) {
            let myColor = { background: '#ea4c4c', fontWeight: "500", text: "#FFFFFF" };
            notify.show(updateError.errorMessage, "custom", 5000, myColor);
        }
        return (
            <>
                <Notifications />
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Donations" back="d-none" />
                        <div className="homeList dashboardBox">
                            {donation && donation.message && donation.message.map(items => {
                                return <div className="cardListing" key={items.organisationRequitmentId}>
                                <Link to={{ pathname: "/donation_detail/" + items.organisationRequitmentId }}>
                                    <div className="cardItem_detail pl-15">
                                        <Grid container alignItems="center" spacing={2}>
                                            <Grid item xs={10} sm={10}>
                                                <h4 className="color-label">{items.itemTitle}</h4>
                                                <p className="color-primary font-11 fontWeight-600">
                                                    Added on:
                                                    <Moment format="DD MMM YYYY">
                                                        {items.createdAt}
                                                    </Moment>
                                                </p>
                                            </Grid>
                                            <Grid item xs={2} sm={2}>
                                                <p className="color-grey font-11 fontWeight-600 text-right">
                                                    <img src={image.donationOrg} alt="location" width="40%" />
                                                </p>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    </Link>
                                </div>
                            })
                            }
                        </div>
                        <DashboardTabs />
                    </Container>
                </div>
                }
            </>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        getDonation
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        donation: state.organizationUser.donation,
        updateError: state.organizationUser
    }
}
export default connect(mapGetState, mapDispatch)(DonationsOrg);