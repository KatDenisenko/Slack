import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import firebase from '../fireBase'
import {connect} from 'react-redux'

class DirectMessage extends Component {

    state = {
        users: [],
        usersRef: firebase.database().ref('users'),
        connectedRef: firebase.database().ref('.info/connected'),
        onlineRef: firebase.database().ref('omlineUsers')
    }

    componentDidMount() {
        if (this.props.user) {
            this.addListener(this.props.user.uid)
        }
    }
    addListener=id=>{
        let loadedUsers=[];
        this.state.usersRef.on('child_added', snap=>{//snap объект с ключами и методами 
            if (id!==snap.key){// snap.key юзер id
                let user=snap.val();//возвращает объект юзера
                user.uid=snap.key;
                user.status='offline';
                loadedUsers.push(user);
                this.setState({
                    users:loadedUsers
                })
            }
        })
        this.state.connectedRef.on('value', snap=>
        {
            if (snap.val()) {
                const ref=this.state.onlineRef.child(id);
                ref.set(true);
                ref.onDisconnect().remove(err=> {
                    if (err!==null) {
                        console.log(err)
                    }
                })
            }
        })
        this.state.onlineRef.on('child_added', snap=> {
            if (id!==snap.key) {
                this.setUserStatus(snap.key);
            }
        })
        this.state.onlineRef.on('child_removed', snap=> {
            if (id!==snap.key) {
                this.setUserStatus(snap.key,false);
            }
        })
    }

    setUserStatus = (id, status=true)=> {
        const updateUsers=this.state.users.map(el=>{
            if (el.uid===id) {
                el.status=`${status? 'online': 'offline'}`
            }
        })
        this.setState({
            users:updateUsers
        })
    }

    render() {
        const {users}=this.state;
        return (
            
                <Menu.Menu className="menu">
                <Menu.Item>
                    <span>
                        <Icon name="mail"/> DIRECT MESSAGES
                    </span> ({users.length})
                </Menu.Item>
                {
                    users.length>0 && users.map(el=><Menu.Item
                        key={el.uid}
                        onClick={()=>console.log(el)}
                        style={{opacity:0.7, fontStyle: 'italic'}}>
                        <Icon name='circle'
                        color={el.status === 'online'? 'green':'blue'}/>
                        @ {el.name}
                        </Menu.Item>
                        )
                }
                </Menu.Menu>
            
        );
    }
}
function MSTP (state) {
    return {
        user:state.user.currentUser,
        
    }

}

export default connect (MSTP)(DirectMessage);