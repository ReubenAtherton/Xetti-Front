import { StyleSheet, Text, View } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

import {
  useFonts,
  Montserrat_800ExtraBold_Italic,
} from "@expo-google-fonts/montserrat";

const Circle = () => {
  const [fontsLoaded] = useFonts({
    MontserratExtraBoldItalic: Montserrat_800ExtraBold_Italic,
  });

  if (!fontsLoaded) {
    return null; // or any loading indicator
  }

  return (
    <View style={style.container}>
      <StatusBar style="auto" />
      <FontAwesome5 name="handshake" size={60} color="white" />
      <Text style={style.text}>xetti</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#4dd173",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "MontserratExtraBoldItalic",
    fontSize: 47,
    textAlign: "center",
    color: "white",
    fontWeight: "800",
    paddingTop: 5,
  },
});

export default Circle;
