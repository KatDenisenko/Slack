import React, { Component } from 'react';
import MessageForm from './MessageForm'
import MessageHeader from './MessageHeader'
import { Segment, Comment } from 'semantic-ui-react';
import firebase from '../fireBase';
import {connect} from 'react-redux';
import SingleMessage from './SingleMessage';

class Messages extends Component {

    state={
        messagesRef: firebase.database().ref('messages'),
        messages:[],
        loading: true,
    }

    componentDidMount () {
        
        console.log('Hello');
        setTimeout (()=>{
            const {currentChanel, currentUser} = this.props;
            
            if (currentChanel&&currentUser) {
                console.log('object');
                this.addListeners(currentChanel.id)
            }
        },3000)
        
    }

    addListeners=chanelId=> {
        let loadedMessages=[];
        this.state.messagesRef.child(chanelId).on('child_added', snap=> {
            loadedMessages.push(snap.val())
            this.setState ({
                messages: loadedMessages,
                loading:false,
            })
        })
        
    }
    render() {
        const {messagesRef, messages}=this.state
       

        return (
            <React.Fragment>
                 <MessageHeader/>
            <Segment>
                <Comment.Group className='messages'>
                {messages.length>0 && messages.map(el=>
                <SingleMessage
                key={el.time}
                message={el}
                user={el.user}
                /> )}

                </Comment.Group>
            </Segment>
            <MessageForm messagesRef={messagesRef}/>
            </React.Fragment>
        );
    }
}

function MSTP (state) {
    return {
        currentUser:state.user.currentUser,
        currentChanel:state.chanel,
    }
}


export default  connect(MSTP,null) (Messages);