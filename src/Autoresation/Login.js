import React, { Component } from 'react';
import { Grid, Header, Icon, Form, Message, Segment, Button } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
            <Grid.Column style={{maxWidth: 450}}>
            <Header as='h2' icon color = 'blue' textAlign='center'>
            <Icon name='smile' color = 'blue'/>
            Login for Slack Clone
            </Header>
            <Form size='large'>
            <Segment>

            
<Form.Input
            fluid
            name='email'
            icon='mail'
            iconPosition='left'
            placeholder='Mail'
            type='email'
            // onChange={this.handlerChange}
            // value={this.state.email}
            // className={this.handleInput(this.state.errors, 'email')}
            />

<Form.Input
            fluid
            name='password'
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            // onChange={this.handlerChange}
            // value={this.state.password}
            // className={this.handleInput(this.state.errors, 'password')}
            />



            <Button color='blue' fluid size='large'>Submit</Button>

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