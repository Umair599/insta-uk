import {SIGN_IN, SIGN_OUT} from '../actions/types';
const INITIAL_STATE={
    isSignedIn: null,
    userId: null,
    accessToken: null,
};
export default (state=INITIAL_STATE, action)=>{
switch (action.type){
    case SIGN_IN:
        return {...state, isSignedIn: true, accessToken: action.payload.access_token, userId: action.payload.userId};
    case SIGN_OUT:
        return {...state, isSignedIn: false, userId: null, accessToken: null};
    default:
        return state;
    }
};