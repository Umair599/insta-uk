import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import React, {Component} from 'react';
import {Button, Image} from 'antd';
import {InstagramFilled} from '@ant-design/icons';
import {fetchCode} from '../actions';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import LoginImage from '../images/login.jpg';
class Login extends Component {
   state = {
    size: 'large',
    accessCode: '',
  };
    componentDidMount(){
    console.log('initial');
       if(window.location.pathname){
          this.setState({accessCode:  window.location.pathname});
       }
       console.log(this.state.accessCode);
  }
  handleInstaClick = (e) => {
    console.log('hello world'); 
    //this.props.fetchCode(); 
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
<a href='https://api.instagram.com/oauth/authorize?client_id=381976333268643&redirect_uri=https://www.instareactuk.com/&scope=user_profile,user_media&response_type=code'>this is new</a>
<Link to={{ pathname: 'https://api.instagram.com/oauth/authorize?client_id=381976333268643&redirect_uri=https://www.instareactuk.com/&scope=user_profile,user_media&response_type=code'}} target='_blank'>This is second try</Link>
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
