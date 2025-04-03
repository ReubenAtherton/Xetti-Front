import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default Signup = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const userData = {
    name: name,
    username: name,
    email: email,
    password: password,
  };

  const [user, setUser] = useState(null);

  const onSubmit = async (e) => {
    const jsonUserData = JSON.stringify(userData);

    console.log(jsonUserData);

    try {
      const response = await fetch("http://172.20.10.9:8080/api/auth/signup", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: jsonUserData,
      });

      if (!response.ok) {
        throw new Error("User authentication failed");
      } else {
        const user = await response.json();

        setUser(user); // Update the state with the received user information
        AsyncStorage.setItem("id", String(user));

        console.log(user);

        navigation.navigate("Welcome");
      }
    } catch (error) {
      console.error("error");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="auto" />
      <KeyboardAwareScrollView
        contentContainerStyle={styles.container}
        extraScrollHeight={-170}
        extraHeight={500}
        enableOnAndroid={true}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Sign Up</Text>
          <Text
            style={{
              fontSize: 18,
              opacity: 0.6,
              marginTop: "3%",
            }}
          >
            Please create an account to continue
          </Text>
        </View>

        <View style={styles.inputView}>
          <Ionicons
            name="person"
            size={24}
            color="black"
            style={styles.icons}
          />
          <TextInput
            style={styles.TextInput}
            spellCheck={false}
            autoCorrect={false}
            placeholder="Name"
            autoCapitalize="none"
            placeholderTextColor="grey"
            onChangeText={(name) => setName(name)}
          />
        </View>

        <View style={styles.inputView}>
          <MaterialIcons
            name="email"
            size={24}
            color="black"
            style={styles.icons}
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
          <Entypo name="lock" size={24} color="black" style={styles.icons} />
          <TextInput
            style={styles.TextInput}
            placeholder="Password"
            placeholderTextColor="grey"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={(e) => onSubmit(e)}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "600",
            }}
          >
            Create Account
          </Text>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    paddingTop: "30%",
    alignItems: "center",
    marginHorizontal: "9%",
  },

  headerContainer: {
    alignSelf: "flex-start",
    marginBottom: "10%",
  },

  headerText: {
    fontSize: 30,
    fontWeight: "700",
  },

  icons: {
    paddingLeft: "5%",
  },

  inputView: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    height: "9.5%",
    marginVertical: "3.5%",
    alignItems: "center",
    flexDirection: "row",
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
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 35,
    backgroundColor: "#4dd173",
    borderColor: "black",
    borderWidth: 1,
  },
});
