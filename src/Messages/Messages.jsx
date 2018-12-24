import React, { Component } from 'react';
import MessageForm from './MessageForm'
import MessageHeader from './MessageHeader'
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../fireBase'
class Messages extends Component {

    state={
        messagesRef: firebase.database().ref('messages')
    }
    render() {
        const {messagesRef}=this.state
       

        return (
            <React.Fragment>
                 <MessageHeader/>
            <Segment>
                <Comment.Group className='messages'>

                </Comment.Group>
            </Segment>
            <MessageForm messagesRef={messagesRef}/>
            </React.Fragment>
        );
    }
}

export default Messages;