import {FETCH_CODE, SIGN_IN, SIGN_OUT, FETCH_POST, FETCH_POSTS} from './types';
import basic from '../apis/basic';
import axios from 'axios';
export const fetchCode = ()=>async dispatch=> {
    const response=await basic.get();
    dispatch({type: FETCH_CODE, payload: response.data});
};
export const fetchPosts = ()=>async dispatch=> {
    const token= 'IGQVJYYlhSTy1UaWJxQlo3NWdHaWs5V3BHMUNZAd29VNkt5MmF3OHRHSERvQkxuN3cyd25KRGJYa3dlOVZAVRGJCdFVXV2gyWUZA0OVFOWE96MVZASNGJ2aVhMWXFBSjBSY3FCUUZANbGR3NkJKaDRZAeVZAoVwZDZD';
    const query = 'id,username,timestamp,caption,media_url,media_type,permalink,children';
    const final_url = `https://graph.instagram.com/me/media?fields=${query}&access_token=${token}`;
    const response=await axios.get(final_url);
    dispatch({type: FETCH_POSTS, payload: response.data});
};
export const fetchPost = id=>async dispatch=> {
    const response=await streams.get(`/streams${id}`);
    dispatch({type: FETCH_POST, payload: response.data});
};