import React, { Component } from 'react';
import { Segment, Input, Button } from 'semantic-ui-react';

class MessageForm extends Component {
    render() {
        return (
            <div>
                <Segment className='message_form'>
                <Input
                    fluid
                    name='message'
                    style={{
                        marginBottom: '0.7rem',
                    }}
                    label={<Button icon='add'/>}
                    labelPosition='left'
                    placeholder='Wright your message'/>
                <Button.Group icon widths='2'>
                    <Button color='orange' content='Add Reply' labelPosition='left' icon='edit'/>
                    <Button color='teal' content='Upload media' labelPosition='right' icon='cloud upload'/>
                </Button.Group>
                </Segment>
            </div>
        );
    }
}

export default MessageForm;