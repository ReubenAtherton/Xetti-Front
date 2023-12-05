import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

import Login from "../screens/Login";
import HomeNav from "./HomeNav";
import Welcome from "../screens/Welcome";

import { NavigationContainer } from "@react-navigation/native";
import Signup from "../screens/Signup";

const Stack = createNativeStackNavigator();

function LoginStackGroup() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      ></Stack.Screen>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerTintColor: "black",
        }}
        name="Signup"
        component={Signup}
      ></Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false }}
        name="Welcome"
        component={Welcome}
      ></Stack.Screen>
      <Stack.Screen
        options={{ headerShown: false }}
        name="HomeNav"
        component={HomeNav}
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default function LoginNav() {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <NavigationContainer independent={true}>
        <LoginStackGroup />
      </NavigationContainer>
    </View>
  );
}
