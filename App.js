import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import Circle from "./screens/Circle";
import LoginNav from "./Navigation/LoginNav";
import "react-native-gesture-handler";

const App = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setAppReady(true);
    }, 3000);

    // Clean up the timer when component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>{appReady ? <LoginNav /> : <Circle />}</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
