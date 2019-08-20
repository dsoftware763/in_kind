import React, { Component } from "react";
import image from "../../../constants/image";
import { imageUrl } from "../../../constants/type";
import Moment from "react-moment";
class ChatList extends Component {
    // componentDidMount() {
    //     const objDiv = document.getElementById('scrollBottom');
    //     objDiv.scrollTop = objDiv.scrollHeight;
    // }
    componentDidUpdate() {
        const objDiv = document.getElementById('scrollBottom');
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    render() {
        const { chatMessage, conId, picPro, isReadTrue } = this.props
        console.log(isReadTrue,"isRead")
        return (
            <div className="messages" id="scrollBottom">
                <ul>
                    {
                        (Object.keys(chatMessage).length > 0 && chatMessage[conId]) && chatMessage[conId].map(items => {
                            return <div>
                                {
                                    items.senderId != localStorage.uId ?
                                        <li className="message pull-left flex" style={{ alignItems: "flex-end" }}>
                                            <img src={picPro && picPro == 'null' ? image.avatar : imageUrl + picPro} alt="Avatar" className="chatProfile pull-left" />
                                            <div className="message-body chat-bubble pull-left">
                                                {items.message}
                                            </div>
                                        </li>
                                        :
                                        <li className="message pull-right">
                                            <div className="message-body user-chat-bubble pull-right">
                                                {items.message}
                                            </div>
                                            <div className="messageRead">
                                                {
                                                    items.isred || isReadTrue.msgStat?
                                                        <img src={image.readMessage} alt="read" width="14px" />
                                                        :
                                                        <img src={image.unReadMessage} alt="unRead" width="14px" />

                                                }
                                                <Moment format="HH:mm">{items.createdAt}</Moment>
                                            </div>
                                        </li>
                                }
                            </div>
                        })
                    }
                </ul>

            </div>
        )
    }
}

export default ChatList;