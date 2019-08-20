import React from 'react';
import Container from '@material-ui/core/Container';
import Header from '../../../shared/header';
import image from '../../../../constants/image';
import { Link } from 'react-router-dom';
import { IndividualListById } from '../../../../actions/organization';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { imageUrl } from '../../../../constants/type'
class ListDetailOrg extends React.Component {
    componentDidMount() {
        let id = this.props.match.params.id
        this.props.IndividualListById(id);
    }
    render() {
        let individualDetail = this.props.individualDetail.message
        return (
            <>
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Items" back="backIcon" redirectUrl="/" menu="d-none" />
                        {individualDetail &&<div className="homeList dashboardBox">
                            <div className="position-relative profileImg">
                                <img src={imageUrl+individualDetail.itemImage || image.avatar} alt="profile image" className="profileImgChange" />
                            </div>
                            <div className="profileDetail">
                                <div className="nameAddress text-center">
                                    <h4>{individualDetail.itemName}</h4>
                                </div>
                            </div>
                            <div className="text-center btnSpace_Login pb-15">
                                <Link to={{pathname: "/donate/"+individualDetail.userId}} className="btnPrimary text-uppercase btnSmall">Accept Donation</Link>
                                <div className="h-45"></div>
                            </div>
                            <div>
                                <h4 className="text-left pb-15">Item Description</h4>
                                <p className="color-grey font-13" style={{ lineHeight: '20px', textAlign: 'justify' }}>{individualDetail.itemDescription}</p>
                            </div>
                        </div>}
                    </Container>
                </div>
            </>
        )
    }
}
const mapDispatch = (dispatch) =>{
    return bindActionCreators ({
        IndividualListById
    }, dispatch)
}
const mapStateGet = (state) =>{
    return {
        individualDetail:state.organizationUser.donationbyId
    }
}
export default connect(mapStateGet, mapDispatch)(ListDetailOrg);