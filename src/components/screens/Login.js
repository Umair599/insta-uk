import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import React, {Component} from 'react';
import {Button, Image} from 'antd';
import {InstagramFilled} from '@ant-design/icons';
import {fetchCode} from '../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import LoginImage from '../images/login.jpg';
import {INSTAGRAM_APP_ID, REDIRECT_URI} from '../apis/credentials';
class Login extends Component {
   constructor(props) {
    super(props);
    this.handleLoad = this.handleLoad.bind(this);
 }
   state = {
    size: 'large',
    accessCode: '',
  };
  componentDidMount() {
    window.addEventListener('load', this.handleLoad);
 }

 componentWillUnmount() { 
   window.removeEventListener('load', this.handleLoad)  
 }

 handleLoad() {
   this.setState({accessCode: window.location.pathname});
 }
  handleInstaClick = (e) => {
    window.location = `https://api.instagram.com/oauth/authorize?client_id=${INSTAGRAM_APP_ID}&redirect_uri=${REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  };
  render() {
    const { size } = this.state;
    return (
      <SafeAreaView>
        <View style={styles.container}>
        <Image preview={false} width={600} height={400} src={LoginImage}/>
          <Text style={styles.welcome}>Welcome to insta-uk</Text>
          <Button type="primary" size="large" onClick={this.handleInstaClick}>
            <InstagramFilled width={'10rem'} />
            Login with Instagram
          </Button>
{this.state.accessCode}
        </View>
      </SafeAreaView>
    );
  }
}
export default connect(null, {fetchCode})(Login);
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
