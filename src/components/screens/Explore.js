import {StyleSheet, View, Text} from 'react-native';
import React, { useEffect, useState, useContext } from "react";
const Explore = (props) => {
  const { user, updateProfile } = useContext();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  return (
<View>
    <Text>No Feed Posts</Text>
    </View>
  );
};

export default Explore;
