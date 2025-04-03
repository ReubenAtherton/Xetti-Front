import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  BackHandler,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AntDesign } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

export default BetCard = () => {
  return (
    <View
      style={{
        borderColor: "black",
        borderWidth: 0.7,
        borderRadius: 10,
        width: "87%",
        height: 125,
        marginBottom: 20,

        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <BetCardHeader />
      <BetCardBody />
    </View>
  );
};

const BetCardHeader = () => {
  return (
    <View
      style={{
        height: 40,
        backgroundColor: "#a8dab6",
        borderColor: "black",
        borderTopLeftRadius: 10.3,
        borderTopRightRadius: 10.3,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <View
        name="left"
        style={{
          flex: 1,
          paddingLeft: 10,
        }}
      >
        <Text>Reuben</Text>
      </View>
      <View
        name="right"
        style={{
          paddingRight: 12,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            paddingHorizontal: 15,
          }}
        >
          £2.00
        </Text>
        <AntDesign name="checkcircle" size={24} color="#3dc264" />
      </View>
    </View>
  );
};

const BetCardBody = () => {
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "left",
      }}
    >
      <BetCardPlayers />
      <BetCardSeeDetails />
    </View>
  );
};

const BetCardPlayers = () => {
  return (
    <View
      style={{
        height: "40%",
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "black",

        borderBottomWidth: 0.4,
        width: "100%",

        paddingHorizontal: 15,
      }}
    >
      <View name="left" style={{ flex: 1 }}>
        <FontAwesome5 name="users" size={20} color="black" />
      </View>
      <View name="right" style={{ flex: 6.5 }}>
        <Text>Lucy, Lewis, Chris</Text>
      </View>
    </View>
  );
};

const BetCardSeeDetails = () => {
  return (
    <View
      style={{
        height: "60%",
        width: "100%",
        alignItems: "left",
        justifyContent: "center",

        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingHorizontal: 15,
      }}
    >
      <View>
        <TouchableOpacity>
          <Text
            style={{
              opacity: 0.8,
            }}
          >
            See Details
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    backgroundColor: "#4dd173",
    width: "100%",
    height: 105,
    justifyContent: "flex-end",
  },

  headerText: {
    fontSize: 32,
    marginLeft: 12,
    marginBottom: 5,
    fontWeight: "bold",
    color: "white",
  },

  body: {
    width: "100%",
    flex: 1,
    marginVertical: 30,
    alignItems: "center",
  },
});
