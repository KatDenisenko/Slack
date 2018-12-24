// import React, { Component } from 'react';

// class Chanels extends Component {
//     render() {
//         return (
//             <div>
                
//             </div>
//         );
//     }
// }

// export default Chanels;

import React, { Component } from 'react';
import { Menu, Icon, Modal, Form, Button } from 'semantic-ui-react';

class Channels extends Component {
    state = {
        channels: [],
              modalStatus: false,
        title: '',
        description: '',
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
    render() {
        const { channels, modalStatus } = this.state;
        return (
            <React.Fragment>
                <Menu.Menu style={{ paddingBottom: '2rem' }}>
                    <Menu.Item>
                <span>
                    <Icon name='exchange' /> Channels
               </span> ({channels.length}) <Icon name='add' onClick={this.closeModal} />
                    </Menu.Item>
                </Menu.Menu>
                <Modal open={modalStatus} onClose={this.closeModal} style={{ background: '#fff' }} size='large' dimmer='blurring' > 
                    <Modal.Header >Add a channel</Modal.Header>
                    <Modal.Content style={{ marginTop: '2rem', marginBottom:'2rem'}} >
                        <Form.Input  fluid name='title' placeholder='Channel name' type='text' onChange={this.handleChange} />
                        <Form.Input  style={{ marginTop: '2rem'}}  placeholderPosition='right' fluid name='description' placeholder='Channel description' type='text' onChange={this.handleChange} />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color='green' size='large'>Save</Button>
                        <Button color='red' size='large' onClick={this.closeModal}>Cancel</Button>
                    </Modal.Actions>
                </Modal>
            </React.Fragment>
        );
    }
}
export default Channels;