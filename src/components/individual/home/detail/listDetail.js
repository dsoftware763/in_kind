import React from 'react';
import Container from '@material-ui/core/Container';
import Header from '../../../shared/header';
import image from '../../../../constants/image';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import {organizationById} from '../../../../actions/individualUser';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
class ListDetail extends React.Component {
    componentDidMount(){
        let id = this.props.match.params.id
        this.props.organizationById(id)
    }
    render() {
        let getDetail = this.props.getDetail.message
        return (
            <>
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Help to Animals" back="backIcon" redirectUrl="/" menu="d-none" />
                        <div className="homeList dashboardBox">
                            <div className="cardListing">
                                 <h4 className="text-left headingPop">{getDetail && getDetail.itemTitle} <div><img src={image.headingBorder} alt="" className="headingBorder" /></div></h4>
                                <p className="color-grey font-13">{getDetail && getDetail.itemDescription}</p>
                            </div>
                            <h4 className="text-left headingPop pt-15 pb-15">About the Non Profit</h4>
                            <div className="cardListing">
                                <Grid container alignItems="center">
                                    <Grid item xs={3} sm={2}>
                                        <img src={image.donationImage} alt="donation item" className="img-fluid" />
                                    </Grid>
                                    <Grid item xs={9} sm={10}>
                                        <div className="flex align-items-center" style={{ justifyContent: "space-between" }}>
                                            <div className="cardItem_detail pl-15">
                                                <h4>Help to Animals</h4>
                                                <p className="color-grey font-13">lorem</p>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                            <div className="text-center btnSpace_Login w-100">
                                <div className="h-45"></div>
                                <div className="h-45"></div>
                                {getDetail && <Link to={{pathname: "/donate/"+ getDetail.userId}} className="btnPrimary text-uppercase">Donate</Link>}
                            </div>
                        </div>
                    </Container>
                </div>
            </>
        )
    }
}
const mapDispatchId = (dispatch) =>{
    return bindActionCreators ({
        organizationById
    }, dispatch)
}
const mapGetState = (state) =>{
    return {
        getDetail: state.individualUser.getDetailById
    }
}
export default connect(mapGetState, mapDispatchId)(ListDetail);