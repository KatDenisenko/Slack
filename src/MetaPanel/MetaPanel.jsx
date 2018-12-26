import React, { Component } from 'react';
import { Segment, Header, Accordion, Icon, Image } from 'semantic-ui-react';
import {connect} from 'react-redux';

class MetaPanel extends Component {
    state={
        activeIndex:0
    };

    setActiveIndex=(event,titleProps)=>{
        const {index} = titleProps;
        const {activeIndex} = this.state;
        const newindex = activeIndex === index? -1 :index;
        this.setState({activeIndex:newindex});
    };
    render() {
        const {activeIndex}=this.state;

        if (this.props.channel) {
            if (this.props.channel.isPrivateChannel){
                return null;
            }
        }
        console.log(this.props.channel)
        return (
           <Segment>
               <Header as="h3" attached="top">
               About # Channel
               </Header>
               <Accordion styled attached="true">
               <Accordion.Title
               active={activeIndex===0}
               index={0}
               onClick={this.setActiveIndex}>
               <Icon name="dropdown"/>
               <Icon name="info"/>
               Channel Details
               </Accordion.Title>
               <Accordion.Content active={activeIndex === 0}>
               {this.props.channel && this.props.channel.details}
               </Accordion.Content>

               <Accordion.Title
               active={activeIndex===1}
               index={1}
               onClick={this.setActiveIndex}>
               <Icon name="dropdown"/>
               <Icon name="pancil alternate"/>
               Created by 
               </Accordion.Title>
               <Accordion.Content active={activeIndex === 1}>
               <Header as='h3'>
                    <Image circular src={this.props.channel&&this.props.channel.createdBy.avatar}/>
                     {this.props.channel && this.props.channel.createdBy.name}
               </Header>
               </Accordion.Content>
               </Accordion>
           </Segment>
        );
    }
}

const MSTP = state=>({
    channel: state.chanel
})

export default connect (MSTP) (MetaPanel);