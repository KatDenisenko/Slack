import * as actionTypes from './type';

export const setCurrentChannel=channel=>({
    type: actionTypes.SET_CURRENT_CHANEL,
    data: channel,

})

export const setPrivateChannel = isPrivateChanel=>({
    type: actionTypes.SET_PRIVATE_CHANEL,
    data: isPrivateChanel,
})