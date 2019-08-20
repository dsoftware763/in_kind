import React from 'react';
import image from '../../../constants/image';
import {InputBase, IconButton, Grid} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { allIndividualList } from '../../../actions/organization';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { imageUrl } from '../../../constants/type'
import InfiniteScroll from 'react-infinite-scroller';
import Moment from 'react-moment';
class IndividualList extends React.Component {
    constructor() {
        super();
        this.state = {
            page: 1,
            hasMore: true,
            page_size: 10,
            item_Search: '',
        }
    }
    componentDidMount() {
        const { page } = this.props
        const { item_Search } = this.state
        if (page == 1) {
            this.props.allIndividualList(page, item_Search);
        }
    }
    getPosts = (page) => {
        console.log(page,"page")
        console.log(this.props.arraylength,"page")
        if (this.props.arraylength >= 10) {
            this.props.allIndividualList(page, this.state.item_Search);
        } else {
            this.setState({
                hasMore: false
            })
        }
    }
    
    onChange = (e) => {
        this.setState({
            item_Search: e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        const { item_Search, page } = this.state
        this.props.allIndividualList(page, item_Search);
    }
    render() {
        const { individualList } = this.props;
        const { page, hasMore } = this.state
        console.log(this.state)
        return (
            <>
                <div className="seacrh_filter">
                    <form onSubmit={this.onSubmit}>
                        <Grid container alignItems="center">
                            <Grid item xs={12}>
                                <div className="seacrhBar flex align-items-center">
                                    <IconButton type="submit" aria-label="Search">
                                        <img src={image.searchIcon} alt="search" />
                                    </IconButton>
                                    <InputBase
                                        style={{ width: '100%' }}
                                        onChange={this.onChange}
                                        name="item_Search"
                                        placeholder="Search..."
                                        inputProps={{ 'aria-label': 'Search...' }}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </div>
                <div className="homeHead">
                    <h4 className="text-center headingPop text-uppercase mb-15">Items needed in your community
                    <div><img src={image.headingBorder} alt="" className="headingBorder" /></div></h4>
                </div>
                <div ref={(ref) => this.scrollParentRef = ref}>
                    <InfiniteScroll pageStart={page} initialLoad={false} loadMore={this.getPosts} getScrollParent={() => this.scrollParentRef}
                        hasMore={hasMore} threshold={1020} useWindow={true} isReverse={false} getScrollParent={this.getPostsNew}> 
                        {individualList && individualList.map((items, index) => {
                            return <div className="cardListing" key={index}>
                                <Grid container alignItems="center">
                                    <Grid item xs={3} sm={2}>
                                        <img src={items.donationDetail && imageUrl + items.donationDetail.itemImage} style={{borderRadius: '10px'}} alt="donation item" className="img-fluid" />
                                    </Grid>
                                    <Grid item xs={9} sm={10}>
                                        <div className="flex align-items-center" style={{ justifyContent: "space-between" }}>
                                            <div className="cardItem_detail home_List pl-15">
                                                <h4>{items.donationDetail && items.donationDetail.itemName}</h4>
                                                <p className="color-primary font-11 fontWeight-600">Posted on:
                                                    <Moment format="DD MMM YYYY">
                                                        {items.createdAt}
                                                    </Moment>
                                                </p>
                                            </div>
                                            <div>
                                                <div className="text-center btnSpace_Login">
                                                    <Link to={{ pathname: "/detail/" + items.itemId }} className="btnPrimary btnList font-13">Accept Donation</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        })
                        }
                    </InfiniteScroll>
                </div>
            </>
        )
    }
}
const mapDipatch = (dispatch) => {
    return bindActionCreators({
        allIndividualList
    }, dispatch)
}
const mapStateGet = (state) => {
    return {
        individualList: state.organizationUser.individualList,
        errorList: state.organizationUser.errorMessage,
        page: state.organizationUser.page,
        arraylength: state.organizationUser.arraylength,
    }
}
export default connect(mapStateGet, mapDipatch)(IndividualList);