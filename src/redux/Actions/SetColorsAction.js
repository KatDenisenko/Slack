import * as actionTypes from './type';

export const setColors=(primary, secondry)=>({
    type: actionTypes.SET_COLORS,
    data: {primary, secondry},

})

