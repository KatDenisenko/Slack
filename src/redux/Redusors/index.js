import {combineReducers} from 'redux';
import user from './setUserReducer';
import chanel from './ChanelRedusor';
import setColors from './SetColorsRedusor';

const rootReducer = 
combineReducers({
    user,
    chanel,
    colors:setColors
})

export default rootReducer;