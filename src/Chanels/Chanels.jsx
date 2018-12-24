

import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Button } from 'semantic-ui-react';
import firebase from '../fireBase';
import {connect} from 'react-redux';
import {setCurrentChannel} from '../redux/Actions/channelsAction';

class Channels extends Component {
    state = {

        activeChannel:'',
        firstLoad: true,
        channels: [],
        modalStatus: false,
        title: '',
        description: '',
        channelsRef: firebase.database().ref('channels'),//получаем ссылку на channels в firebase.
    }

    componentDidMount () {
        this.addListeners();
    }

    closeModal = () => {
        this.setState(previous => ({
            modalStatus: !previous.modalStatus,
        }))
    }
    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        this.setState({
            [name]: value,
        })
    }

    handleSubmit =(e)=> {
        e.preventDefault();
        if (this.state.title && this.state.description) {
            this.addChannel();
        }
    }
    addChannel =()=> {
        const {title, description,channelsRef }=this.state;
        const key=channelsRef.push().key;
        const newChanel = {
            id: key,
            name: title,
            details:description,
            createdBy: {
                name:this.props.user.displayName,
                avatar: this.props.user.photoURL,
            }
        }
        channelsRef
        .child(key)
        .update(newChanel)
        .then (()=>{
            this.setState({
                title: '',
                description: '',

            })
            this.closeModal();
            console.log('newChanel');
        })
        .catch(err=>console.log(err))
       
       //console.log(this.props.user);
    }

    addListeners=()=>{
        let loadedChanels=[];
        this.state.channelsRef.on('child_added', snap=> {
            loadedChanels.push(snap.val())
            console.log(loadedChanels);
            this.setState({
                channels: loadedChanels
            }, ()=>{this.loadFirstChannel()})
        })
    }

    loadFirstChannel =()=> {
        if (this.state.firstLoad && this.state.channels.length>0) {
            this.changeActiveChanel(this.state.channels[0])
           // this.props.setCurrentChannel(this.state.channels[0]);
            //this.showActiveChanel(this.state.channels[0]);
        }
        this.setState ({
            firstLoad: false
        })

    }
     
     changeActiveChanel=(el)=> {
        this.props.setCurrentChannel(el)
        this.setState({
            activeChannel:el.id
        })
     }



    render() {
        const { channels, modalStatus} = this.state;
        return (
            <React.Fragment>
                <Menu.Menu style={{ paddingBottom: '2rem' }} >
                    <Menu.Item>
                <span>
                    <Icon name='exchange' /> Channels
               </span> ({channels.length}) <Icon name='add' onClick={this.closeModal} />
                    </Menu.Item>
                    {channels.length>0 && channels.map(el=>(
                        <Menu.Item
                        onClick={()=>this.changeActiveChanel(el)}
                        key={el.id}
                        name={el.name}
                        style={{opacity:0.7}}
                        active={el.id===this.state.activeChannel? true:false}
                        >
                        # {el.name}
                        </Menu.Item>
                    ))}
                </Menu.Menu>
                <Modal open={modalStatus} onClose={this.closeModal} style={{ background: '#fff' }} size='large' dimmer='blurring' > 
                    <Modal.Header >Add a channel</Modal.Header>
                    <Modal.Content style={{ marginTop: '2rem', marginBottom:'2rem'}} >
                        <Form onSubmit ={this.handleSubmit}>
                        <Form.Input  fluid name='title' placeholder='Channel name' type='text' onChange={this.handleChange} />
                        <Form.Input  style={{ marginTop: '2rem'}}   fluid name='description' placeholder='Channel description' type='text' onChange={this.handleChange} />
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' size='large' onClick ={this.handleSubmit}>Save</Button>
                        <Button color='red' size='large' onClick={this.closeModal}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}

function mapStateToProps (state) {
    return {
        user:state.user.currentUser,
        channel:state.channel,
    }
}

function mapDispatchToProps (dispatch) {
return {
    setCurrentChannel: function (data) {
        dispatch(setCurrentChannel(data))
    }
}
}



export default connect(mapStateToProps,  mapDispatchToProps) (Channels);