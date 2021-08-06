import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
const Footer = () => {
  return (
    <View style={{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-end',
      alignContent: 'flex-end',
      alignItems: 'center',
    }}> 
      <Text style={styles.footer}>
        Made By{" "}
        <a href="http://merisite.online">Umair Khalid</a></Text>
    </View>
  );
};

export default Footer;
const styles = StyleSheet.create({
  footer: {
    fontSize: 15,
    textAlign: 'center',
    textAlignVertical: 'bottom',
    marginTop: 10,
    marginBottom: 5,
    color: '#fa923f',
  },
  
});