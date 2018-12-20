import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import firebase from '../fireBase';
import { Grid, Header, Icon, Form, Message, Segment, Button } from 'semantic-ui-react';


class Registration extends Component {
state = {
    username:'',
    email:'',
    password: '',
    passwordConfirm: '',
}

handlerChange=(e)=> {
    let key = e.target.name;
    let value = e.target.value;
    this.setState({
        [key]:value,
    })
}
handleSubmit=(e)=>{
    e.preventDefault();
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(createdUser=>{console.log(createdUser);
    }).catch(err=>{
        console.error(err);
    })

}

    render() {
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
            <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' icon color = 'blue' textAlign='center'>
            <Icon name='comment alternate' color = 'blue'/>
            Register for Slack Clone
            </Header>
            <Form size='large' onSubmit={this.handleSubmit}>
            <Segment>

            <Form.Input
            fluid
            name='username'
            icon='user'
            iconPosition='left'
            placeholder='Username'
            type='text'
            onChange={this.handlerChange}
            value={this.state.username}/>

<Form.Input
            fluid
            name='email'
            icon='mail'
            iconPosition='left'
            placeholder='Mail'
            type='email'
            onChange={this.handlerChange}
            value={this.state.email}/>

<Form.Input
            fluid
            name='password'
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={this.handlerChange}
            value={this.state.password}/>

<Form.Input
            fluid
            name='passwordConfirm'
            icon='repeat'
            iconPosition='left'
            placeholder='Password Confirm'
            type='password'
            onChange={this.handlerChange}
            value={this.state.passwordConfirm}/>

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