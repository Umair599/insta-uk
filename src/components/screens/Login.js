import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Image} from 'antd';

import {fetchCode, fetchPosts} from '../actions';
import {connect} from 'react-redux';
import LoginImage from '../images/login.jpg';
import {useLocation} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {INSTAGRAM_APP_ID, REDIRECT_URI} from '../apis/credentials';
import { faInstagram} from '@fortawesome/free-brands-svg-icons';
const Login = (props)=>{
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryCode = searchParams.get('code');
  const [code]= useState(queryCode);
 
  useEffect(()=>{
if(code) {
  props.fetchCode(code); 
}
  },[code]);
  useEffect(() => {
    console.log('Long Access = ', props.accessToken);
    if (props.accessToken) props.history.push(`/${props.userId}/?accessToken=${props.accessToken}`);
  }, [props.accessToken]);
  const handleInstaClick = e => {
    window.location = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
    
  };
  if (props.isSignedIn) props.history.push(`/${props.userId}/?accessToken=${props.accessToken}`);
    return (
        <View style={styles.container}>
        <Image preview={false} width={700} height={400} src={LoginImage}/>
          <Text style={styles.welcome}>Welcome to Insta-React-UK-App</Text>
          <TouchableOpacity style={{cursor: 'pointer', flexWrap:'wrap'}} onPress={handleInstaClick} >
            <View style={{flexDirection: 'row', justifyContent: 'center',alignContent:'center', backgroundColor: '#fafafa',
          alignItems: 'center', marginVertical: 7, borderWidth: 2, width: '100%',
           borderColor: 'black', borderRadius: 10, paddingHorizontal:5, paddingVertical:10 }}>
             <FontAwesomeIcon icon={faInstagram} size="2x" style={{marginInline:12}}/>

            <Text style={{fontSize: 15, fontWeight: '400'}}>Login with Instagram</Text>
            </View>
          </TouchableOpacity>
        </View>
   
    );
  
}
const mapStateToProps=(state)=>{
  return {
    isSignedIn: state.auth.isSignedIn,
    accessToken: state.auth.accessToken,
    userId: state.auth.userId
  };
}
export default connect(mapStateToProps, {fetchCode, fetchPosts})(Login);
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'column',
    position: 'relative',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#ffffff',

  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    color: '#000000',
  },
  
});
