import React from 'react';
import Button from '@material-ui/core/Button';
import image from '../../../../constants/image';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import { connect } from 'react-redux';
import InlineError from '../../../shared/inlineError';
import { bindActionCreators } from 'redux';
import { donationPosted } from '../../../../actions/individualUser';
import Moment from 'react-moment';
import { imageUrl } from '../../../../constants/type';
class DonateStepOne extends React.Component {
    componentDidMount() {
        this.props.donationPosted();
    }
    render() {
        const { errors } = this.props;
        const { donation, selectList } = this.props
        return (
            <>
                <div className="font-13 color-label fontWeight-600 pb-15">Select from your available Donations</div>
                <form onSubmit={this.props.nextPage}>
                    <div error={errors.donationList}>
                        {donation && donation.message && donation.message.map(items => {
                            return <div className="cardListing">
                                <Grid container alignItems="center" spacing={2}>
                                    <Grid item xs={3} sm={2}>
                                        <img src={imageUrl + items.itemImage} alt="donation item" className="img-fluid" style={{ borderRadius: "10px" }} />
                                    </Grid>
                                    <Grid item xs={9} sm={10}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={10} sm={10}>
                                                <div className="cardItem_detail pl-15 pl-xs-0">
                                                    <h4>{items.itemName}</h4>
                                                    <p className="color-primary font-11 fontWeight-600">
                                                        <Moment format="DD MMM YYYY">
                                                            {items.createdAt}
                                                        </Moment>
                                                    </p>
                                                    <p className="color-grey font-11 fontWeight-600 flex align-items-center">
                                                        <img src={image.mapArrow} alt="location" width="15px" />Item must be {items.itemMethod} up
                                            </p>
                                                </div>
                                            </Grid>
                                            <Grid item xs={2} sm={2}>
                                                <Radio color="primary" name="donationList" checked={selectList == items.itemId}
                                                 value={items.itemId} onChange={this.props.handleChange} />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                            </div>
                        })
                        }
                        {errors.donationList && <InlineError text={errors.donationList} />}
                    </div>
                    <div className="text-center btnSpace_Login"><Button type="submit" className="btnPrimary">Next</Button></div>
                </form>
            </>
        )
    }
}
const mapGetDispatch = (dispatch) => {
    return bindActionCreators({
        donationPosted
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        errors: state.users.nonProfitSignupError,
        donation: state.individualUser.donationsPosted
    }
}
export default connect(mapGetState, mapGetDispatch)(DonateStepOne);