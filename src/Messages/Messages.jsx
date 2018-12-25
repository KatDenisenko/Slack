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
        searchMessages:[],
        searchValue:'',
        loading: true,
        countUser: '',
        // handleChanels:true,

    }

    searchMessages=()=>{
        // console.log(this.state.searchValue)
        // console.log(this.state.messages)
        let newArr = this.state.messages.filter(el=>el.content?el.content.toLowerCase().includes(this.state.searchValue.toLowerCase()):null)
        this.setState({
            searchMessages:newArr
        })
        console.log(this.state.searchMessages)
    }

    onChangeInput=async(e)=> {
    let key=e.target.name;
    let value = e.target.value;
            await this.setState({
                [key]:value
        
    });
    this.searchMessages();
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

    componentDidUpdate (prevProps) {
        if(prevProps.currentChanel&&this.props.currentChanel) {
          
            if (prevProps.currentChanel.name!==this.props.currentChanel.name) {
              
                this.addListeners(this.props.currentChanel.id)
            }
        }
    }

    addListeners=chanelId=> {
        let loadedMessages=[];
    //     var rootRef = this.state.messagesRef;
    //  var usersRef = rootRef.child(chanelId);

        // console.log(this.state.messagesRef.orderByChild(chanelId))
          // false
       this.state.messagesRef.child(chanelId).on('value', snap=>{
       if (snap.exists()) {
        this.state.messagesRef.child(chanelId).on('child_added', snap=> {
       

            loadedMessages.push(snap.val())
            this.setState ({
                messages: loadedMessages,
                loading:false,})
        this.countUnicUsers(loadedMessages)
        })
       } else {
        this.setState ({
            messages: [],
            loading:false,})
    this.countUnicUsers(loadedMessages)
       } 
    })
}
    
countUnicUsers = messages=> {
    const uniqueUserrs = messages.reduce((acc,el)=>{
        if(!acc.includes(el.user.name)){
            acc.push(el.user.name)
        }
        return  acc
    }, [])
    this.setState({
        countUser: `${uniqueUserrs.length} users`
    })
}
   
    render() {
        const {messagesRef, messages, searchValue,searchMessages }=this.state
       

        return (
            <React.Fragment>
               
                 <MessageHeader  onChangeInput = {this.onChangeInput} value = {searchValue}countUser={this.state.countUser} currentChanel={this.props.currentChanel}/>
            <Segment>
                <Comment.Group className='messages'>
                {searchValue?searchMessages.map(el=>
                <SingleMessage
                key={el.time}
                message={el}
                user={el.user}
                /> ):
                messages.length>0 && messages.map(el=>
                    <SingleMessage
                    key={el.time}
                    message={el}
                    user={el.user}
                    /> )}
                {/* {messages.length>0 && messages.map(el=>
                <SingleMessage
                key={el.time}
                message={el}
                user={el.user}
                /> )} */}
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