import React, { Component } from 'react';
import { Segment, Header, Icon, Input } from 'semantic-ui-react';


class MessageHeader extends Component {

   

    render() {

        
        return (
            <Segment clearing>
            <Header
            fluid='true'
            as='h2'
            floated='left'
            style={{
                marginBottom:0
            }}>
            {this.props.currentChanel === null?
            <span>
            Chanel
                <Icon name='star outline' color='black'/>
            </span>:
            <span>
            {this.props.currentChanel.name}
                <Icon name='star outline' color='black'/>
            </span>}
            <Header.Subheader>
                {this.props.countUser}
            </Header.Subheader>
            </Header>
            <Header floated='right'>
                <Input size='mini' icon='search' name='searchValue' placeholder='Ssearch' value = {this.props.value} onChange={this.props.onChangeInput
                }/>
            </Header>
            </Segment>
            
        );
    }
}



export default MessageHeader;