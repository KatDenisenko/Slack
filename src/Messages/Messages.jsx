import React, { Component } from 'react';
import MessageForm from './MessageForm'
import MessageHeader from './MessageHeader'
import { Segment, Comment } from 'semantic-ui-react';
class Messages extends Component {
    render() {
        return (
            <React.Fragment>
                 <MessageHeader/>
            <Segment>
                <Comment.Group className='message'>
                
                </Comment.Group>
            </Segment>
            <MessageForm/>
            </React.Fragment>
        );
    }
}

export default Messages;