import React, { Component } from 'react';
import { Grid, Header, Icon, Dropdown } from 'semantic-ui-react';
import firebase from '../fireBase'

class UserPanel extends Component {

    dropdownOptions=()=>[
        {
            key:'user',
            text:<span><Icon name='smile outline'/>Signed in as <strong>User</strong></span>,
            disabled:true,
        },
        {
            key:'avatar',
            text:<span><Icon name='id card'/>Change Avatar</span>,

            
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

    render() {
        return (
            <Grid style={{
                background: '4c3c4c'
            }}>
                <Grid.Column>
                    <Grid.Row style={{
                        padding: '1.2rem',
                        margin: '0',
                    }}>
                    <Header inverted floated='left' as='h2'>
                        <Icon name='cloud'/>
                        <Header.Content>Slack clone</Header.Content>
                    </Header>

                    </Grid.Row>
                    <Header style={{padding: '0.25rem'}} as='h4' inverted>
                        <Dropdown trigger={
                            <span>User</span>
                        } options={this.dropdownOptions()}/>
                    </Header>
                </Grid.Column>
            </Grid>
                
            
        );
    }
}

export default UserPanel;