import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Circle from './screens/Circle';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginNav from './Navigation/LoginNav';
import "react-native-gesture-handler";

const Stack = createNativeStackNavigator();

const App = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppReady(true);
    }, 3000); // Adjust the delay
  }, []);

  return (
    <View style={styles.container}>
        {appReady ? <LoginNav/> : <Circle/>} 

  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;