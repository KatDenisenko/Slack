import * as actionTypes from '../Actions/type';

const channel =(state=null, action)=> {
    switch (action.type) {
        case actionTypes.SET_CURRENT_CHANEL:

        return {...action.data,isPrivateChannel:false};

        case actionTypes.SET_PRIVATE_CHANEL:

        return {...state,isPrivateChannel:action.data}

        default:
            return state
    }
}

export default channel;