import {combineReducers} from 'redux';
import user from './setUserReducer';
import chanel from './ChanelRedusor';

const rootReducer = 
combineReducers({
    user,
    chanel
})

export default rootReducer;