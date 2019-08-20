import React from 'react';
import Grid from '@material-ui/core/Grid';
import image from '../../../constants/image';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import { allOrganization } from '../../../actions/individualUser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Moment from 'react-moment';
import InfiniteScroll from 'react-infinite-scroller';
import { imageUrl } from '../../../constants/type';

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
            this.props.allOrganization(page, item_Search);
        }
    }
    getPosts = (page) => {
        console.log(this.props.arraylength)
        if (this.props.arraylength >= 10) {
            this.props.allOrganization(page, this.state.item_Search);
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
        this.props.allOrganization(page, item_Search);
    }
    render() {
        const { organizationAll } = this.props
        const { page, hasMore } = this.state
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
                <div className="postItem-link text-center">
                    <div className="donateHome-img">
                        <img src={image.donateHome} />
                    </div>
                    <div className="postBtn-home">
                        <Link to="/post" className="btnPrimary font-13 text-uppercase">POst Your Item</Link>
                    </div>
                </div>
                <div className="homeHead">
                    <h4 className="text-center headingPop text-uppercase mb-15">Items needed in your community
                    <div><img src={image.headingBorder} alt="" className="headingBorder" /></div></h4>
                </div>
                <div ref={(ref) => this.scrollParentRef = ref}>
                    <InfiniteScroll pageStart={page} initialLoad={false} loadMore={this.getPosts} getScrollParent={() => this.scrollParentRef}
                        hasMore={hasMore} threshold={1020} initialLoad={false} useWindow={true}>
                        {organizationAll && organizationAll.map((items, index) => {
                            console.log(items,"")
                            return <div className="cardListing" key={index}>
                                <Grid container alignItems="center">
                                    <Grid item xs={3} sm={2}>
                                        <img src={items.orgRequitments.UserOrg[0].logo ? imageUrl + items.orgRequitments.UserOrg[0].logo : image.avatar} alt="donation item" className="img-fluid imgSqu" style={{borderRadius: '10px'}}/>
                                    </Grid>
                                    <Grid item xs={9} sm={10}>
                                        <div className="flex align-items-center" style={{ justifyContent: "space-between" }}>
                                            <div className="cardItem_detail home_List pl-15">
                                                <h4>{items.itemTitle}</h4>
                                                <p className="color-primary font-11 fontWeight-600">
                                                    <Moment format="DD MMM YYYY">
                                                        {items.createdAt}
                                                    </Moment>
                                                </p>
                                            </div>
                                            <div>
                                                <div className="text-center btnSpace_Login">
                                                    <Link to={{ pathname: "/detail/" + items.organisationRequitmentId }} className="btnPrimary btnList font-13">Donate</Link>
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
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        allOrganization
    }, dispatch)
}
const mapGetState = (state) => {
    return {
        organizationAll: state.individualUser.organizationAll,
        arraylength: state.individualUser.arraylength,
        page: state.individualUser.page
    }
}
export default connect(mapGetState, mapDispatch)(IndividualList);