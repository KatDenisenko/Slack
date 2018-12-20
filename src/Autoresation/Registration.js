import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

import { Grid, Header, Icon, Form, Message, Segment, Button } from 'semantic-ui-react';

class Registration extends Component {
    render() {
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
            <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' icon color = 'blue' textAlign='center'>
            <Icon name='comment alternate' color = 'blue'/>
            Register for Slack Clone
            </Header>
            <Form size='large'>
            <Segment stacked>

            <Form.Input
            fluid
            name='username'
            icon='user'
            iconPosition='left'
            placeholder='Username'
            type='text'/>

<Form.Input
            fluid
            name='email'
            icon='mail'
            iconPosition='left'
            placeholder='Mail'
            type='email'/>

<Form.Input
            fluid
            name='password'
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'/>

<Form.Input
            fluid
            name='passwordConfirm'
            icon='repeat'
            iconPosition='left'
            placeholder='Password Confirm'
            type='password'/>

            <Button color='blue' fluid size='large'>Submit</Button>

            </Segment>
            </Form>
            <Message>
                Already a user?
                <NavLink to='/login'>&nbsp;&nbsp;Login</NavLink>
            </Message>

            </Grid.Column>
            </Grid>
        );
    }
}

export default Registration;