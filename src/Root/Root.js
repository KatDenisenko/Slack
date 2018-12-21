import React, { Component } from 'react';
import {Switch,Route, withRouter} from 'react-router-dom';
import App from '../App';
import Login from '../Autoresation/Login';
import Registration from '../Autoresation/Registration';
import firebase from 'firebase';
import {connect} from 'react-redux';
import {setUser} from '../redux/Actions/setUserAction'

class Root extends Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user=>{
          if(user) {
            console.log(user)
            this.props.setUser(user);
            this.props.history.push('/');
          }
        })
      }
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

function MDTP (dispatch) {//MDTP = mapDispatchToProps
    return {
        setUser: function (user){
            dispatch(setUser(user))
        }
    }
}
export default  withRouter(connect(null,MDTP)(Root));//withRouter HOC который принимает аргументом компонент и даёт этому объекту доступ к истории браузера history