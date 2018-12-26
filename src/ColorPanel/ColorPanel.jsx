import React, { Component } from 'react';
import { Sidebar, Menu, Divider, Button, Modal, Segment, Icon, Label } from 'semantic-ui-react';
import {SketchPicker} from 'react-color';
import {connect} from 'react-redux';
import firebase from '../fireBase';
import {setColors} from '../redux/Actions/SetColorsAction';

class ColorPanel extends Component {

state ={
    modal: false,
    primary:'',
    secondry:'',
    usersRef: firebase.database().ref("users"),
    userColors: []
};

componentDidMount() {
    console.log(this.props.user.currentUser.uid);
    if (this.props.user) {
        this.addListener(this.props.user.currentUser.uid);
    }
}

addListener = userId=>{
    let userColors=[];
    this.state.usersRef.child(`${userId}/colors`).on("child_added", snap=>{
        userColors.unshift(snap.val());
        console.log(userColors)
        this.setState({userColors})
    })
}
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

displayUserColors = colors => 
colors.length > 0 &&
colors.map((color,i)=>(
    <React.Fragment key={i}>
    <Divider/>
    <div className="color__container"
    onClick={() => this.props.setColors(color.primary, color.secondry)}>
        <div className="color__square" style = {{background: color.primary}}>
            <div className="color__overlay" style= {{background: color.secondry}}/>

        </div>
    </div>
    </React.Fragment>
))

    render() {
        const {primary,secondry,modal,userColors}=this.state;
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
            {this.displayUserColors(userColors)}
            <Modal basic open={modal} onClose={this.handleModal}>
            <Modal.Header>Choose app Colors</Modal.Header>
            <Modal.Content>
                <Segment>
                    <Label content="Primary Color"/>
                    <SketchPicker onChange={this.handleChangePrimaryColor} color={primary}/>
                </Segment>
                <Segment>
                <Label content="Secondary Color"/>
                    <SketchPicker onChange={this.handleChangeSecondaryColor} color={secondry}/>
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

const MDTP= (dispatch)=>{
    return {
        setColors: function (primary,secondry){
            dispatch(setColors(primary,secondry))
        }, }
    }

export default connect(MSTP,MDTP)(ColorPanel);