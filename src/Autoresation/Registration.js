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
    errors:[],
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
    if (this.isFormValid()) {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(createdUser=>{console.log(createdUser);
    }).catch(err=>{
        console.error(err);
        this.setState({errors: this.state.errors.concat(err)})
    })}
}
isFormEmpty = () => { 
    return this.state.username.length!==0 && this.state.email.length!==0&&this.state.password.length!==0 && this.state.passwordConfirm.length!==0
}
 

isPasswordValid=()=>{
 return this.state.password===this.state.passwordConfirm;}

isFormValid=()=>{
    let errors=[];
    let error;
    if (!this.isFormEmpty()) {
        error = {
            message:'Fill in all fields'
        };
        this.setState({
            errors: errors.concat(error)
        })
        return false;
    } else if (!this.isPasswordValid()){
        error = {
            message:'Password is invalid'
        };
        this.setState({
            errors: errors.concat(error)
        })
        return false;
    } else {
        this.setState({
            errors: []
        })
        return true;
    }
}

handleInput =(errors, inputName) => {
    return errors.some(el=>el.message.toLowerCase().includes(inputName)) ?
    'error':''
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
            value={this.state.username}
            className={this.handleInput(this.state.errors, 'username')}/>

<Form.Input
            fluid
            name='email'
            icon='mail'
            iconPosition='left'
            placeholder='Mail'
            type='email'
            onChange={this.handlerChange}
            value={this.state.email}
            className={this.handleInput(this.state.errors, 'email')}/>

<Form.Input
            fluid
            name='password'
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={this.handlerChange}
            value={this.state.password}
            className={this.handleInput(this.state.errors, 'password')}/>

<Form.Input
            fluid
            name='passwordConfirm'
            icon='repeat'
            iconPosition='left'
            placeholder='Password Confirm'
            type='password'
            onChange={this.handlerChange}
            value={this.state.passwordConfirm}
            className={this.handleInput(this.state.errors, 'password')}/>

            <Button color='blue' fluid size='large'>Submit</Button>

            </Segment>
            </Form>
            {this.state.errors.length>0 && (
                <Message error>
                <h3>Error</h3>
                {this.state.errors.map(el => <p key={el.message}>{el.message}</p>)}
                </Message>
            )

            }
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