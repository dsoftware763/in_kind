import React from 'react';
import { Grid } from '@material-ui/core';
import image from '../../constants/image';
import { Link } from 'react-router-dom';
import { InputBase, IconButton } from '@material-ui/core';
import { imageUrl } from '../../constants/type'
import Moment from 'react-moment';
import 'moment-timezone';
class MessageList extends React.Component {
    render() {
        const { chatList, typing } = this.props
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
                {
                    chatList && chatList.map(items =>{
                        if (items.senderId == localStorage.uId){
                            return <div className="chatList pt-15" key={items.messageId}>
                            <Link to={{ pathname: "/chatDetail/" + items.receiverId + '/' + items.conversationId + '/'+items.ReciverprofilePicture}}>
                                <Grid container alignItems="center">
                                    <Grid item xs={2}>
                                        <img src={items.ReciverprofilePicture== null ?image.avatar:imageUrl+items.ReciverprofilePicture} alt="Avatar" className="chatProfile" />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Grid container alignItems="ceneter" style={{ lineHeight: "25px" }}>
                                            <Grid item xs={10}>
                                                <div className="nameMessage">
                                                    <h4 className="color-label">{items.ReciversfullName}</h4>
                                                    {
                                                        typing.typing && typing.conversationId == items.conversationId                                                        ?
                                                        <p className="color-primary font-12 fontWeight-600">typing...</p>
                                                        :
                                                        <p className="color-label font-12 fontWeight-500">{items.message}</p>
                                                    } 
                                                </div>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <div className="timeRead text-right">
                                                    <p className="font-12 color-label fontWeight-500"><Moment format="HH:mm">{items.createdAt}</Moment></p>
                                                    {
                                                        items.unread_count  >= 1?
                                                        <span className="messageNumber">{items.unread_count}</span>
                                                        :
                                                        ''
                                                    }
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Link>
                        </div>
                        }else{
                            return <div className="chatList pt-15" key={items.messageId}>
                            <Link to={{ pathname: "/chatDetail/" + items.senderId + '/' + items.conversationId + '/'+items.SenderprofilePicture }}>
                                <Grid container alignItems="center">
                                    <Grid item xs={2}>
                                        <img src={items.SenderprofilePicture== null ?image.avatar:imageUrl+items.SenderprofilePicture} alt="Avatar" className="chatProfile" />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Grid container alignItems="ceneter" style={{ lineHeight: "25px" }}>
                                            <Grid item xs={10}>
                                                <div className="nameMessage">
                                                    <h4 className="color-label">{items.SenderfullName}</h4>
                                                    {
                                                            // console.log(typing.senderId,"dd", items.receiverId)
                                                        typing.typing && typing.conversationId == items.conversationId
                                                        ?
                                                        <p className="color-primary font-12 fontWeight-600">typing...</p>
                                                        :
                                                        <p className="color-label font-12 fontWeight-500">{items.message}</p>
                                                    } 
                                                </div>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <div className="timeRead text-right">
                                                    <p className="font-12 color-label fontWeight-500"><Moment format="HH:mm" local>{items.createdAt}</Moment></p>
                                                    {
                                                        items.unread_count  >= 1?
                                                        <span className="messageNumber">{items.unread_count}</span>
                                                        :
                                                        ''
                                                    }
                                                </div>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Link>
                        </div>
                        }
                    })
                }
                {/* <div className="chatList pt-15">
                    <Grid container alignItems="center">
                        <Grid item xs={2}>
                            <img src={image.avatar} alt="Avatar" className="chatProfile" />
                        </Grid>
                        <Grid item xs={10}>
                            <Grid container alignItems="ceneter" style={{ lineHeight: "25px" }}>
                                <Grid item xs={10}>
                                    <div className="nameMessage">
                                        <h4>Jessy Jacke</h4>
                                        <p className="color-label font-12 fontWeight-500">Hello</p>
                                    </div>
                                </Grid>
                                <Grid item xs={2}>
                                    <div className="timeRead text-right">
                                        <p className="font-12 color-label fontWeight-500">01:30 AM</p>
                                        <span className="messageNumber">12</span>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div> */}
            </>
        )
    }
}
export default MessageList;