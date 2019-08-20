import React from 'react';
import Header from '../shared/header';
import Container from '@material-ui/core/Container';
import DashboardTabs from '../shared/dashboardTabs'
import MessageList from './messageList';
import { messageListConnect, typingChat } from '../../actions/chatUser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import io from 'socket.io-client';
import { chatUrl } from '../../constants/type';
const socket = io(chatUrl);
class MessageOrg extends React.Component {
    componentDidMount() {
        let self = this
        socket.emit('RECEIVE_CHAT_LIST', {
            id: localStorage.uId,
        })
        socket.on('CHAT_LIST', function (data) {
            self.props.messageListConnect(data);
        })
        socket.on('TYPING', function (data){
            self.props.typingChat(data)
        })
    }
    componentWillUnmount() {
        socket.off('CHAT_LIST')
    }
    render() {
        const { chatList, typing } = this.props
        return (
            <>
                <div className="backSplash">
                    <Container className="loginSignup h-100 dashboard" >
                        <Header heading="Message" back="d-none" />
                        <div className="dashboardBox messaging">
                            <MessageList chatList={chatList} typing={typing} />
                        </div>
                        <DashboardTabs />
                    </Container>
                </div>
            </>
        )
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
        messageListConnect,
        typingChat
    }, dispatch)
}
const mapState = (state) => {
    return {
        chatList: state.chatUser.chatList,
        typing: state.chatUser.typing
    }
}
export default connect(mapState, mapDispatch)(MessageOrg);