import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { StackActions } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = {
    usernameOrEmail: email,
    password: password,
  };

  const [id, setUser] = useState(null);

  const onSubmit = async () => {
    const jsonUserData = JSON.stringify(userData);

    try {
      const response = await fetch(
        "http://10.159.143.121:8080/api/auth/signin",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: jsonUserData,
        }
      );

      console.log("Response Status Code:", response.status);

      if (response.status === 200) {
        const id = await response.json();
        setUser(id);
        console.log("User:", id);

        AsyncStorage.setItem("id", String(id));

        navigation.navigate("HomeNav");
        navigation.dispatch(StackActions.popToTop());
        navigation.dispatch(StackActions.replace("HomeNav"));
      } else {
        // Handle other status codes or error scenarios
        console.error("Sign in failed - User not found");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="auto" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        extraScrollHeight={-150}
        extraHeight={350}
        enableOnAndroid
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Login</Text>
          <Text
            style={{
              fontSize: 18,
              opacity: 0.6,
              marginTop: "5%",
            }}
          >
            Please sign in to continue
          </Text>
        </View>

        <View style={styles.inputView}>
          <MaterialIcons
            style={styles.icons}
            name="email"
            size={24}
            color="black"
          />
          <TextInput
            style={styles.TextInput}
            spellCheck={false}
            autoCorrect={false}
            placeholder="Email"
            autoCapitalize="none"
            placeholderTextColor="grey"
            onChangeText={(email) => setEmail(email)}
          />
        </View>

        <View style={styles.inputView}>
          <Entypo style={styles.icons} name="lock" size={24} color="black" />
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity style={{ alignSelf: "flex-start" }}>
          <Text> Forgot password? </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginBtn} onPress={(e) => onSubmit(e)}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "500",
            }}
          >
            Login
          </Text>
        </TouchableOpacity>

        <View style={{ flexDirection: "row", margin: "7%" }}>
          <Text
            style={{
              alignSelf: "center",
              fontSize: 15,
            }}
          >
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity
            style={{ alignSelf: "center" }}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={{ fontWeight: "600", fontSize: 15 }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: "9%",
  },

  headerContainer: {
    alignSelf: "flex-start",
    marginBottom: "8%",
    width: "100%",
  },

  headerText: {
    fontSize: 30,
    fontWeight: "700",
  },
  inputView: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    height: "8%",
    marginBottom: "7%",
    alignItems: "center",
    flexDirection: "row",
  },

  icons: {
    paddingLeft: "5%",
  },

  TextInput: {
    height: "100%",
    flex: 1,
    marginHorizontal: "4%",
    fontSize: 17,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 8,
    height: "8%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "15%",
    backgroundColor: "#5DB075",
    borderColor: "black",
    borderWidth: 1,
  },
});
