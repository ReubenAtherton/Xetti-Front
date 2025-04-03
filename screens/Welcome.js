import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import { StackActions } from "@react-navigation/native";

export default Signup = ({ navigation }) => {
  const handleLogin = (navigation) => {
    navigation.navigate("HomeNav");
    navigation.dispatch(StackActions.popToTop());
    navigation.dispatch(StackActions.replace("HomeNav"));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome to Betti</Text>
        <Text style={styles.text}>
          The sociable betting app that lets you bet on anything with anyone!
        </Text>
      </View>

      <TouchableOpacity
        style={styles.getStartedBtn}
        onPress={() => handleLogin(navigation)}
      >
        <Text
          style={{
            fontSize: 17,
          }}
        >
          Get Started
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: "8%",
  },

  headerContainer: {
    marginBottom: "4%",
  },

  headerText: {
    fontSize: 30,
    fontWeight: "700",
    alignSelf: "center",
  },

  text: {
    fontSize: 18,
    opacity: 0.6,
    marginTop: "10%",
    textAlign: "center",
  },

  getStartedBtn: {
    width: "80%",
    borderRadius: 8,
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "10%",
    backgroundColor: "#4dd173",
    borderColor: "black",
    borderWidth: 1,
  },
});
