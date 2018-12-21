import React, { Component } from 'react';
import { Grid, Header, Icon, Form, Message, Segment, Button } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';
import firebase from 'firebase';

class Login extends Component {

    state = {
        email:'',
        password:'',
        errors:[],
    }

    handlerChange=(e)=> {
        let key = e.target.name;
        let value = e.target.value;
        this.setState({
            [key]:value,
        })}

    loginSubmit = (e)=> {
        e.preventDefault();
        if (this.isFormFill()){
            firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(signedInUser=> {
                console.log(signedInUser);
            })
            .catch (err =>{
                console.log(err);
                this.setState({
                    errors:this.state.errors.concat(err)
                })
            })

        }
        else {
            console.error('Something wrong');
        }
    }

    isFormFill = () => { 
        return this.state.email.length!==0&&this.state.password.length!==0 
    }

    render() {
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
            <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' icon color = 'blue' textAlign='center'>
            <Icon name='smile' color = 'blue'/>
            Login for Slack Clone
            </Header>
            <Form size='large' onSubmit={this.loginSubmit}>
            <Segment>

            
<Form.Input
            fluid
            name='email'
            icon='mail'
            iconPosition='left'
            placeholder='Mail'
            type='email'
            onChange={this.handlerChange}
            value={this.state.email}
            // className={this.handleInput(this.state.errors, 'email')}
            />

<Form.Input
            fluid
            name='password'
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            onChange={this.handlerChange}
            value={this.state.password}
            // className={this.handleInput(this.state.errors, 'password')}
            />



            <Button color='blue' fluid size='large' >Submit</Button>

            </Segment>
            </Form>
            {/* {this.state.errors.length>0 && (
                <Message error>
                <h3>Error</h3>
                {this.state.errors.map(el => <p key={el.message}>{el.message}</p>)}
                </Message>
            )

            } */}
            <Message>
                Don't have an acount?
                <NavLink to='/registr'>&nbsp;&nbsp;Registration</NavLink>
            </Message>

            </Grid.Column>
            </Grid>
        );
    }
}

export default Login;