import React, { Component } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';
import {connect} from 'react-redux';
import firebase from '../fireBase';
import FileModal from './FileModal';
import uuidv4 from 'uuid/v4';



class MessageForm extends Component {

    state={
        message:'',
        loading: false,
        errors: [],
        modal: false,
        uploadTask: null,
        storageRef: firebase.storage().ref()//берём доступ к storage в firebase, .ref() - фунция с помощью которой получаем ссылку на storage
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

    createMessage =(url=null)=> {
        const message={
            // content: this.state.message,
            time: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id:this.props.currentUser.uid,
                name:this.props.currentUser.displayName,
                avatar:this.props.currentUser.photoURL
            }
        }
        if (url !== null) {
            message['image']=url
        } else {
            message ['content']=this.state.message;
        }
        console.log(message);
        return message;
    }

    uploadFile=(file,metadata)=>{
        const pathToUpload = this.props.currentChanel.id;
        const ref=this.props.messagesRef;
        const filePath = `chat/public/image${uuidv4()}.jpg`;
        this.setState ({
            uploadTask: this.state.storageRef.child(filePath).put(file,metadata)
        },
        ()=>{
            this.state.uploadTask.on(
                "state_changed",
                ()=>{
                    this.state.uploadTask.snapshot.ref
                    .getDownloadURL()
                    .then(downLoadUrl => {
                        this.sendFileMessage(downLoadUrl, ref, pathToUpload);
                    })
                    .catch(err=>{
                        console.error(err);
                    });
                }
            )
        })
      
    }

    sendFileMessage = (url, ref, path)=>{
        ref.child(path)
        .push()
        .set(this.createMessage(url))
        .catch(err=>{
            console.error(err)
        })

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
                <FileModal modal={this.state.modal} uploadFile = {this.uploadFile} closeModal={this.handleModal}/>
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