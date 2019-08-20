import React from 'react';
import Header from '../../shared/header';
import Container from '@material-ui/core/Container';
import ChatList from './chatList';
import ChatForm from './chatForm';
import { sendMessage, recevieMessage, chatHistory, isRead } from '../../../actions/chatUser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { chatUrl } from '../../../constants/type';
const socket = io(chatUrl);

class ChatDetailOrg extends React.Component {
    constructor() {
        super();
        this.state = {
            messageSend: '',
        }
    }
    sendMessage = (e) => {
        e.preventDefault();
        let self = this
        let { conId, id } = self.props.match.params
        let data = {
            senderId: localStorage.uId,
            receiverId: id,
            message: self.state.messageSend
        }
        socket.emit('SEND_MESSAGE', {
            data
        })
        self.props.sendMessage(data);
        self.setState({
            messageSend: ''
        })
    }
    onChange = (e) => {
        let value = e.target.value.trim()
        this.setState({
            messageSend: value,
        })
    }
    onKeypress = (e) => {
        let self = this
        let { conId, id } = self.props.match.params
        socket.emit('START_TYPING', {
            typing: true,
            conversationId: conId,
            senderId: localStorage.uId,
            receiverId: id,
        })
    }

    onKeyUp = () => {
        setTimeout(() => {
            let self = this
            let { conId, id } = self.props.match.params
            socket.emit('START_TYPING', {
                typing: false,
                conversationId: conId,
                senderId: localStorage.uId,
                receiverId: id,
            })
        }, 5000);
    }
    componentDidMount() {
        let self = this
        let { conId, id } = self.props.match.params
        socket.emit('JOIN_ROOM', {
            conversationId: conId
        })
        socket.on('MSG_READ', function (data) {
            console.log("read msg", data)
            self.props.isRead(data)
        })
        socket.on('RECEIVE_MESSAGE', function (data) {
            self.props.recevieMessage(data);
            console.log(data.receiverId,"d")
            if (id == localStorage.uId && self.props.match.isExact) {
                socket.emit('IS_READ', {
                    conversationId: conId,
                    senderId: localStorage.uId,
                    receiverId: id,
                    isred: 1
                })
            }
        })
        self.props.chatHistory(conId);
    }
    componentWillUnmount() {
        socket.off('RECEIVE_MESSAGE');
    }
    render() {
        let { chatMessage, isReadTrue } = this.props;
        console.log(isReadTrue,"dd")
        let { conId, picPro } = this.props.match.params
        return (
            <>
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Message" menu="d-none" redirectUrl="/message" />
                        <div className="dashboardBox p-0 messaging">
                            <ChatList chatMessage={chatMessage} conId={conId} picPro={picPro} isReadTrue={isReadTrue}/>
                            <ChatForm onSubmit={this.sendMessage} onChange={this.onChange} value={this.state.messageSend} onKeypress={this.onKeypress} onKeyUp={this.onKeyUp} />
                        </div>
                    </Container>
                </div>
            </>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        sendMessage,
        recevieMessage,
        chatHistory,
        isRead
    }, dispatch)
}
const mapState = (state) => {
    return {
        chatMessage: state.chatUser.messageChat,
        isReadTrue: state.chatUser.isReadTrue
    }
}
export default connect(mapState, mapDispatch)(ChatDetailOrg);