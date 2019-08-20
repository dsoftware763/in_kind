import React from 'react';
import Grid from '@material-ui/core/Grid';
import image from '../../../constants/image';
import { donation } from '../../../actions/individualUser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';
import { imageUrl } from '../../../constants/type';
import Notifications, { notify } from 'react-notify-toast';
class Donated extends React.Component {
    componentDidMount() {
        this.props.donation();
    }
    render() {
        const { donated } = this.props;
        const { updateError } = this.props;
        if (updateError.error) {
            let myColor = { background: '#ea4c4c', fontWeight: "500", text: "#FFFFFF" };
            notify.show(updateError.message, "custom", 5000, myColor);
        }
        return (
            <>
                <Notifications />
                {donated && donated.message && donated.message.map(itemsDonated => {
                    return <div className="cardListing" key={itemsDonated && itemsDonated.donatedIemid}>
                        <Grid container alignItems="center" spacing={2}>
                            <Grid item xs={3} sm={2}>
                                <img src={itemsDonated.donationDetail && imageUrl + itemsDonated.donationDetail.itemImage} alt="donation item" className="img-fluid" style={{ borderRadius: "10px" }} />
                            </Grid>
                            <Grid item xs={9} sm={10}>
                                <div className="cardItem_detail pl-15">
                                    <h4>{itemsDonated.donationDetail && itemsDonated.donationDetail.itemName}</h4>
                                    <p className="color-primary font-11 fontWeight-600">
                                        Donated on: 
                                        <Moment format="DD MMM YYYY">
                                            {itemsDonated.createdAt}
                                        </Moment>
                                    </p>
                                    <p className="color-grey font-11 fontWeight-600 flex align-items-center"><img src={image.mapArrow} alt="location" width="15px" />Item must be {itemsDonated.donationDetail && itemsDonated.donationDetail.itemMethod} up</p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                })
            }
            </>
        )
    }
}
const mapGetDispatch = (dispatch) => {
    return bindActionCreators({
        donation
    }, dispatch)
}
const mapSetState = (state) => {
    return {
        donated: state.individualUser.donations,
        updateError: state.individualUser
    }
}
export default connect(mapSetState, mapGetDispatch)(Donated);