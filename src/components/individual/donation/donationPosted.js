import React from 'react';
import Grid from '@material-ui/core/Grid';
import image from '../../../constants/image';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { donationPosted } from '../../../actions/individualUser';
import Moment from 'react-moment';
import { imageUrl } from '../../../constants/type';
import Notifications, { notify } from 'react-notify-toast';
class DonationPosted extends React.Component {
    componentDidMount() {
        this.props.donationPosted();
    }
    render() {
        const { updateError } = this.props;
        if (updateError.error) {
            let myColor = { background: '#ea4c4c', fontWeight: "500", text: "#FFFFFF" };
            notify.show(updateError.message, "custom", 5000, myColor);
        }
        const { donation } = this.props
        return (
            <>
                <Notifications />
                {donation && donation.message && donation.message.length && donation.message.map(items => {
                    return <div className="cardListing" key={items.itemId}>
                        <Grid container alignItems="center">
                            <Grid item xs={3} sm={2}>
                                <img src={imageUrl + items.itemImage} alt="donation item" className="img-fluid" style={{ borderRadius: "10px" }} />
                            </Grid>
                            <Grid item xs={9} sm={10}>
                                <div className="cardItem_detail pl-15">
                                    <h4>{items.itemName}</h4>
                                    <p className="color-primary font-11 fontWeight-600">
                                        Added on:
                                        <Moment format="DD MMM YYYY">
                                            {items.createdAt}
                                        </Moment>
                                    </p>
                                    <p className="color-grey font-11 fontWeight-600 flex align-items-center"><img src={image.mapArrow} alt="location" width="15px" />Item must be {items.itemMethod} up</p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                })}
            </>
        )
    }
}
const mapGetDispatch = (dispatch) => {
    return bindActionCreators({
        donationPosted
    }, dispatch)
}
const mapSetState = (state) => {
    return {
        donation: state.individualUser.donationsPosted,
        updateError: state.individualUser
    }
}
export default connect(mapSetState, mapGetDispatch)(DonationPosted);