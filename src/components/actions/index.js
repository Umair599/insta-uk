import {SIGN_IN, SIGN_OUT, FETCH_POSTS,SIGN_UP} from './types';
import {INSTAGRAM_APP_ID, REDIRECT_URI, INSTAGRAM_APP_SECRET} from '../apis/credentials';
import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import history from '../../history';
const ROOT_URL='https://graph.instagram.com';
export const signOut = ()=>{
    return {
        type: SIGN_OUT
    };
    
};
export const signUp = formValues=>async dispatch =>{
    await firebase.auth().createUserWithEmailAndPassword(formValues.email,formValues.password ).then(async (resp) => {
        const docRef = firebase.firestore().doc(`/users/${formValues.email}`);
        let user = {};
        user.name = formValues.name;
        user.email = formValues.email;
        user.photoURL = resp.user.photoURL;
        user.age = formValues.age;
        user.address = formValues.address;
        user.instaUserId='';
        user.instaAccessToken='';
        docRef.set(user);
        dispatch({ type: SIGN_IN, payload: user});
        window.location = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
      })
      .catch((e) => {
        console.log(e.message);
      });
}
export const signIn = formValues=> async dispatch=>{
    firebase.auth().signInWithEmailAndPassword(formValues.email, formValues.password).then(async (resp) => {
        const docRef = firebase.firestore().doc(`/users/${formValues.email}`);
        docRef.get().then((data) => {
            dispatch({ type: SIGN_IN, payload: data.data()});
            history.push(`/${data.data().instaUserId}/?accessToken=${data.data().instaAccessToken}`);
        });
      })
      .catch((e) => {
          console.log(e.message);
      });
}
export const fetchCode = (code, email) => async dispatch=> {
    const formData = new FormData();
    formData.append('client_id', INSTAGRAM_APP_ID);
    formData.append('client_secret', INSTAGRAM_APP_SECRET);
    formData.append('grant_type', 'authorization_code');
    formData.append('redirect_uri', REDIRECT_URI);
    formData.append('code', code);
    fetch('https://api.instagram.com/oauth/access_token', {
        method: 'post',
        body: formData
    })
    .then(res => res.json())
    .then(
    (result) => {
        fetch(`${ROOT_URL}/access_token?client_secret=${INSTAGRAM_APP_SECRET}&access_token=${result.access_token}&grant_type=ig_exchange_token`).then(response => response.json()).then(res => {
            firebase.firestore().collection("users").doc(email).update({
                instaUserId:result.user_id,
                instaAccessToken: res.access_token,
            });
            dispatch({type: SIGN_UP, payload: {access_token: res.access_token, instaUserId: result.user_id, userEmail: email}});
            history.push(`/${result.user_id}/?accessToken=${res.access_token}`);
        }).catch(err => {
        console.log(err, 'Error occured while getting Long Access Token');
    });
    }).catch(err => {
        console.log(err, 'Error occured while getting shortAccessToken and userId Failed');
    });
};
export const fetchPosts = token=>async dispatch=> {
    const query = 'id,username,timestamp,caption,media_url,media_type,permalink,children';
    const final_url = `https://graph.instagram.com/me/media?fields=${query}&access_token=${token}`;
    fetch(final_url).then(response => response.json()).then(res => {
    console.log(res.data);
    dispatch({type: FETCH_POSTS, payload: res.data});
    }).catch(err => {
    dispatch({type: FETCH_POSTS, payload: []});
    console.log(err, 'Error occured while getting User Media Information');
});
};
