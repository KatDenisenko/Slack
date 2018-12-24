import React, { Component } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import {connect} from 'react-redux';
import firebase from '../fireBase';
import FileModal from './FileModal';

class MessageForm extends Component {

    state={
        message:'',
        loading: false,
        errors: [],
        modal: false,
        // modal:
    }
    handleModal=()=> {
        this.setState(prev=>({
            modal:!prev.modal,
        }))
    }
    addMessage =()=> {
        const {message}=this.state;
        const {messagesRef,currentChanel}=this.props;
            if (message) {
                this.setState({
                    loading:true,
                })
                messagesRef
                .child(currentChanel.id)
                .push()
                .set(this.createMessage())
                .then(()=>{
                    this.setState({
                        loading:false,
                        message: ''
                    })
                })
                .catch(err=>{
                    this.setState({
                        loading: false,
                errors:this.state.errors.concat(err)
                    })
                })
            } 
        }
 

    handleChange=(e)=>{
        let value =e.target.value;
        let key=e.target.name;
        this.setState({
                [key]:value,
        })
    }

    createMessage =()=> {
        const message={
            content: this.state.message,
            time: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id:this.props.currentUser.uid,
                name:this.props.currentUser.displayName,
                avatar:this.props.currentUser.photoURL
            }
        }
        console.log(message);
        return message;
    }

    render() {
        return (
            
                <Segment className='message_form'>
                <Input
                    onChange={this.handleChange}
                    fluid
                    name='message'
                    style={{
                        marginBottom: '0.7rem',
                    }}
                    label={<Button icon='add'/>}
                    labelPosition='left'
                    placeholder='Wright your message'
                    value={this.state.message}/>
                <Button.Group icon widths='2'>
                    <Button onClick = {this.addMessage} color='orange' content='Add Reply' labelPosition='left' icon='edit'/>
                    <Button onClick = {this.handleModal} color='teal' content='Upload media' labelPosition='right' icon='cloud upload'/>
                </Button.Group>
                <FileModal modal={this.state.modal} closeModal={this.handleModal}/>
                </Segment>
            
        );
    }
}

function MSTP (state) {
    return {
        currentUser:state.user.currentUser,
        currentChanel:state.chanel,
    }

}

export default connect (MSTP,null)(MessageForm);