import React, { Component } from 'react';
import { Sidebar, Menu, Divider, Button, Modal, Segment, Icon, Label } from 'semantic-ui-react';
import {TwitterPicker } from 'react-color';
import {connect} from 'react-redux';
import firebase from '../fireBase'
class ColorPanel extends Component {

state ={
    modal: false,
    primary:'',
    secondry:'',
    usersRef: firebase.database().ref("users")
};

handleModal=()=>{this.setState(prev=>({
    modal: !prev.modal
}))}

handleChangePrimaryColor = color=>
    this.setState({
        primary:color.hex
    })

 saveColors = (primary,secondry) => {
    this.state.usersRef.child(`${this.props.user.currentUser.uid}/colors`)
    .push()
    .update({
        primary,
        secondry
    })
    .then(()=>{
        console.log("Colors added");
        this.handleModal();
    })
    .catch(err=>console.error(err));
 }
 handleSaveColors=()=> {
     this.state.primary
     &&this.state.secondry
     &&this.saveColors(this.state.primary,this.state.secondry)
    
 }

handleChangeSecondaryColor = color=>{
    this.setState({
        secondry:color.hex
    })
}

    render() {
        const {primary,secondry,modal}=this.state;
        return (
            <Sidebar
            as={Menu}
            icon='labeled'
            inverted
            visible
            vertical
            width='very thin'>
            <Divider/>
            <Button icon='add' size='small' color='blue' onClick={this.handleModal}/>
            <Modal basic open={modal} onClose={this.handleModal}>
            <Modal.Header>Choose app Colors</Modal.Header>
            <Modal.Content>
                <Segment>
                    <Label content="Primary Color"/>
                    <TwitterPicker onChange={this.handleChangePrimaryColor} color={primary}/>
                </Segment>
                <Segment>
                <Label content="Secondary Color"/>
                    <TwitterPicker onChange={this.handleChangeSecondaryColor} color={secondry}/>
                </Segment>
            </Modal.Content>
            <Modal.Actions>
                <Button color="green" inverted onClick={this.handleSaveColors}>
                <Icon name="checkmark"/> Save Colors
                </Button>
                <Button color="red" inverted onClick={this.handleModal}>
                <Icon name="remowe"/> Cancel
                </Button>
            </Modal.Actions>
            </Modal>
            </Sidebar>
            
        );
    }
}

const MSTP = state =>({
    user:state.user
})

export default connect(MSTP)(ColorPanel);