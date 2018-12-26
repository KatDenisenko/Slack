import React, { Component } from 'react';

import './App.css';
import ColorPanel from './ColorPanel/ColorPanel';
import SidePanel from './SidePanel/SidePanel';
import Messages from './Messages/Messages';
import MetaPanel from './MetaPanel/MetaPanel';
import { Grid } from 'semantic-ui-react';
import {connect} from 'react-redux';

class App extends Component {




  render() {
    return (
      <Grid columns='equal' className='app' style={{ background:this.props.secondaryColor}}>
      <ColorPanel/>
      <SidePanel/>
      <Grid.Column style={{marginLeft:320}}>
      <Messages/>
      </Grid.Column>
      <Grid.Column width={4}>
      <MetaPanel/>
      </Grid.Column>
      </Grid>
    );
  }
}

const MSTP=state=> ({
  secondaryColor: state.colors.secondaryColor,
})

export default connect (MSTP)(App);
