import {SIGN_IN, SIGN_OUT, FETCH_CODE} from '../actions/types';
const INITIAL_STATE={
    isSignedIn: null,
    userId: null,
    access_token: null
};
export default (state=INITIAL_STATE, action)=>{
switch (action.type){
    case FETCH_CODE:
        return {...state, isSignedIn: true, access_token: action.payload.access_token, userId: action.payload.user_id};
    case SIGN_IN:
        return {...state, isSignedIn: true, userId: action.payload};
    case SIGN_OUT:
        return {...state, isSignedIn: false, userId: null};
    default:
        return state;
    }
};
