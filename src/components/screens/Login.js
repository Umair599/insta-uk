import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, Image} from 'antd';
import {InstagramFilled, FacebookFilled} from '@ant-design/icons';
import {fetchCode} from '../actions';
import {connect} from 'react-redux';
import LoginImage from '../images/login.jpg';
import {Link, useParams, useLocation} from 'react-router-dom';
import {INSTAGRAM_APP_ID, REDIRECT_URI, INSTAGRAM_APP_SECRET} from '../apis/credentials';
const Login = (props)=>{
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const queryCode = searchParams.get('code');
  const [code, setCode]= useState(queryCode);
  useEffect(()=>{
if(code){
  const requestOptions = {
        method: 'POST',
        body: { 
            client_id: INSTAGRAM_APP_ID,
                 client_secret: INSTAGRAM_APP_SECRET,
                 grant_type: 'authorization_code',
                  redirect_uri: REDIRECT_URI,
                   code: code }
    };
    fetch('https://api.instagram.com/oauth/access_token', requestOptions).then((res)=>{
  console.log(res);
});
}
  },[code]);
  const handleInstaClick = e => {
    window.location = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
    
  };
  const newCodeButton = e =>{
    props.fetchCode('AQDsvA0ICd0lRAZeTw9SvlSptQdMYSeuCT45BzB9nDwEa2rphoDGZBhzHHNOHLDKlRkfZsPUvMVN6zuLe4kZIzG40KbCJjvHSRDph_SunYCFOL7Q4cJfrqwIw4p_Pa814ICdcXX_5GTBvcgUFX8Ca3Q25ITD1tAeq9ZpYiZ2JiDWEFEtzUa3EpvixxXcPcgMVtTuIulVcK40l85nDtpwfoOES-Uot2OqPe3POXdBsqODWQ');
  };
  if(props.isSignedIn){
    return (<View>
<Text style={styles.welcome}>{props.access_token}</Text>
<Text style={styles.welcome}>{props.user_id}</Text>
      Loading...</View>);
}
    return (
      <SafeAreaView>
        <View style={styles.container}>
        <Image preview={false} width={600} height={400} src={LoginImage}/>
          <Text style={styles.welcome}>Welcome to insta-uk</Text>
          <Button type="primary" size="large" onClick={handleInstaClick}>
            <InstagramFilled width={'10rem'} />
            Login with Instagram
          </Button>
          <Button type='primary' size='middle' onClick={newCodeButton}>
            <FacebookFilled width={'10rem'} />
            Login with Instagram
          </Button>
          
        </View>
      </SafeAreaView>
    );
  
}
const mapStateToProps=(state)=>{
  return {
    isSignedIn: state.auth.isSignedIn,
    access_token: state.auth.access_token,
    user_id: state.auth.isSignedIn
  };
}
export default connect(mapStateToProps, {fetchCode})(Login);
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
    fontSize: 40,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20,
    color: '#000000',
  },
  
});
