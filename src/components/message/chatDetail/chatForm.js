import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class ChatForm extends Component {
    constructor(){
        super();
        this.ref = React.createRef(); 
    }
    resetForm = (e) =>{
        this.ref.current.reset();    
    }

    render() {
        const {value} = this.props
        return (
            <div className="chatFrom">
                <form onSubmit={this.props.onSubmit} ref={this.ref}>
                    <div className="flex align-items-center w-100">
                        <div className="form-control">
                            <input type="text" placeholder="Type here..." onKeyUp={this.props.onKeyUp} onKeyPress={this.props.onKeypress} name="messageSend" onChange={this.props.onChange} />
                        </div>
                        <div className="text-center btnSpace_Login">
                            <Button type="submit" className="btnPrimary btnChatSend" disabled={!value} onClick={this.resetForm}>Send</Button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
export default ChatForm; 