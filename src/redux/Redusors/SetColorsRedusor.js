import * as actionTypes from '../Actions/type';

const setColors =(state={primaryColor:"#4c3c4c",secondaryColor:"#eee"}, action)=> {
    switch (action.type) {
        case actionTypes.SET_COLORS:

        return {primaryColor:action.data.primary,secondaryColor:action.data.secondry};
        
        default:
            return state
    }
}

export default setColors;