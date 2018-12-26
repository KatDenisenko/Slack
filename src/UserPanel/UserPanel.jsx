import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown, Image, Modal, Input, Button } from 'semantic-ui-react';
import firebase from '../fireBase';
import {connect} from 'react-redux';
import AvatarEditor from 'react-avatar-editor';
import { read } from 'fs';

class UserPanel extends Component {

    state= {
        modal: false,
        previewImage:'',
        croppedImage:'',
        blob:'',
        uploadedCroppedImage: "",
        storageRef: firebase.storage().ref(),
        userRef: firebase.auth().currentUser,
        usersRef: firebase.database().ref("users"),
        metadata: {
        contentType: "image/jpeg"
    }
    }

    handleModal =()=> {
        this.setState(prev=>({
            modal:!prev.modal
        }))
    }

    dropdownOptions=()=>[
        {
            key:'user',
            text:<span><Icon name='smile outline'/>Signed in as <strong>User</strong></span>,
            disabled:true,
        },
        {
            key:'avatar',
            text:<span onClick={this.handleModal}><Icon name='id card'/>Change Avatar</span>,

            
        },
        {
            key:'out',
            text:<span onClick={this.signOut}><Icon name='sign-out'/> Sign out</span>,
            
        }
    ]

    signOut=()=>{
        firebase
        .auth()
        .signOut()
        .then(()=>{
            console.log('sined out');
        })
    }

    handleChange=event=>{
        const file = event.target.files[0];
        const reader = new FileReader();
        if  (file) {
        reader.readAsDataURL(file);
        reader.addEventListener("load", ()=>{
            this.setState({ previewImage: reader.result})
        })
        }
    }

    handleCropImage =()=> {
        if (this.avatarEditor) {
            this.avatarEditor.getImageScaledToCanvas().toBlob(blob=>{
                let imageUrl = URL.createObjectURL(blob);
                this.setState({
                    croppedImage: imageUrl,
                    blob
                })
            })
        }
    }

    uploadedCroppedImage = ()=> {
            const {storageRef, userRef, blob, metadata} = this.state;
            storageRef
            .child(`avatars/user-${userRef.uid}`)
            .put(blob, metadata)
            .then (snap => {
                snap.ref.getDownloadURL().then(downloadURL=>{
                    this.setState({ uploadedCroppedImage: downloadURL}, ()=>
                    this.changeAvatar()
                    );
                });
            });
    }

    changeAvatar = () => {
        this.state.userRef
        .updateProfile({
            photoURL: this.state.uploadedCroppedImage
        })
        .then(()=>{
            console.log("PhotoURL updated");
            this.handleModal();
        })
        .catch(err=>{
            console.error(err);
        })

        this.state.usersRef
        .child(this.props.user.currentUser.uid)
        .update({ avatar: this.state.uploadedCroppedImage})
        .then(()=>{
            console.log("User avatar updated");
        })
        .catch(err=>{
            console.error(err);
        })
    }

    render() {
        return (
            <Grid style={{
                background: this.props.primaryColor
            }}>
                <Grid.Column>
                    <Grid.Row style={{
                        padding:'2rem',
                        margin: '0',
                    }}>
                    <Header inverted floated='left' as='h2'>
                        <Icon name='cloud'/>
                        <Header.Content>Slack clone</Header.Content>
                    </Header>
                    <Header style={{padding: '0.25rem'}} as='h4' inverted>
                        <Dropdown trigger={
                           <span> <Image src={this.props.user.currentUser.providerData[0].photoURL} spaced='right' avatar/>{this.props.user.currentUser.providerData[0].displayName}</span>
                        } options={this.dropdownOptions()}/>
                    </Header>
                    </Grid.Row>

            <Modal open={this.state.modal} onClose={this.handleModal}>
            <Modal.Header>Change Avatar</Modal.Header>
            <Modal.Content>
              <Input fluid type="file" label="New Avatar" name="previewImage" onChange={this.handleChange} />
              <Grid centered stackable columns={2}>
                <Grid.Row centered>
                  <Grid.Column className="ui center aligned grid">
                  {this.state.previewImage && (
                      <AvatarEditor
                        ref={node => (this.avatarEditor = node)}//ref атрибут раект тега который дает возможность к куску реального дом дерева
                        image={this.state.previewImage}
                        width={120}
                        height={120}
                        border={50}
                        scale={1.2}
                      />
                    )}
                  </Grid.Column>
                  <Grid.Column>{/* Cropped Image Preview */}
                  {this.state.croppedImage && (
                      <Image
                        style={{ margin: '3.5em auto' }}
                        width={100}
                        height={100}
                        src={this.state.croppedImage}
                      />
                    )}
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Modal.Content>
            <Modal.Actions>
              <Button color="green" inverted onClick ={this.uploadedCroppedImage}>
                <Icon name="save" /> Change Avatar
              </Button>
              <Button color="green" inverted onClick={this.handleCropImage}>
                <Icon name="image" /> Preview
              </Button>
              <Button color="red" inverted onClick={this.handleModal}>
                <Icon name="remove" /> Cancel
              </Button>
            </Modal.Actions>
          </Modal>
                   
                </Grid.Column>
            </Grid>
                
            
        );
    }
}

function mapStateToProps (state) {
    return {
        user:state.user,
        primaryColor: state.colors.primaryColor,
    }
}



export default connect(mapStateToProps,null)(UserPanel);