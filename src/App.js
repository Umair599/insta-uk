import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import React, {Component} from 'react';
import {Button} from 'antd';
import {InstagramFilled} from '@ant-design/icons';
class App extends Component {
  handleInstaClick = (e) => {
    console.log('hello world');  
  };

  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>
          <Text style={styles.welcome}>Welcome to insta-uk</Text>
          <Button onClick={this.handleInstaClick}>
            <InstagramFilled width="2rem" />
            Login with Instagram
          </Button>
        </View>
      </SafeAreaView>
    );
  }
}
export default App;
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: '#142a3d',
    display: 'flex',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
  },
});
