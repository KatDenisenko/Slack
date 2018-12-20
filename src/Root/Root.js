import React, { Component } from 'react';
import {Switch,Route} from 'react-router-dom';
import App from '../App';
import Login from '../Autoresation/Login';
import Registration from '../Autoresation/Registration'

class Root extends Component {
    render() {
        return (
            <div>
                <Switch>
          <Route exact path='/' component = {App}/>
          <Route path='/login' component = {Login}/>
          <Route path='/registr' component = {Registration}/>
          {/* <Route path='/contact' render = {(props)=> <Contact {...props} text = {this.state.headerText}/>}/> */}
        </Switch>
            </div>
        );
    }
}

export default Root;