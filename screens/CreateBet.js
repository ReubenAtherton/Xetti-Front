import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateBet() {
  const [amount, setAmount] = useState("");
  const [id, setUser_id] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("id").then((userId) => {
      if (userId) {
        setUser_id(userId);
      }
    });
  }, []);

  const bet = {
    amount: amount,
    user_id: id,
  };

  const onSubmit = async () => {
    const jsonBetData = JSON.stringify(bet);

    try {
      const response = await fetch(
        "http://10.159.143.121:8080/api/auth/createBet",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: jsonBetData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create bet - check account");
      } else {
        // Do something with the response data
        setAmount("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  {
    /*const handleTextChange = (text) => {
    let formattedAmount = "00.00";
  
    if (text.length > 0) {
      const numericValue = parseFloat(text.replace(/[^0-9]/g, "")) / 100;
      formattedAmount = numericValue.toFixed(2);
    }
  
    setAmount(formattedAmount);
  };*/
  }

  const handleTextChange = (text) => {
    {
      /*
    let formattedAmount = "00.00";
  
    if (text.length > 0) {
      const numericValue = parseFloat(text.replace(/[^0-9]/g, "")) / 100;
      const roundedValue = Math.round(numericValue * 100) / 100;
      formattedAmount = roundedValue.toFixed(2).padStart(5, "0");
    }
  */
    }

    setAmount(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            backgroundColor: "white",
            paddingTop: StatusBar.currentHeight,
          }}
        >
          <View
            style={{
              flex: 2,
              backgroundColor: "white",
              width: "100%",
              alignItems: "center",
              marginTop: "18%",
              paddingHorizontal: "5%",
            }}
          >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  marginTop: "9%",
                  borderColor: "black",
                  borderWidth: 1,
                  borderRadius: 8,
                  width: "60%",
                  height: "11%",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingLeft: "5%",
                }}
              >
                <FontAwesome5
                  name="pound-sign"
                  size={30}
                  color="black"
                  style={{ marginRight: "1%" }}
                />

                <TextInput
                  keyboardType="decimal-pad"
                  style={{
                    flex: 1,
                    fontSize: 40,
                    height: "90%",
                    paddingHorizontal: "10%",
                    textAlign: "right",
                  }}
                  value={amount}
                  onChangeText={setAmount}
                />
              </View>
            </TouchableWithoutFeedback>

            <TouchableOpacity
              style={{
                borderRadius: 8,
                height: "10%",
                width: "40%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "15%",
                backgroundColor: "#5DB075",
                borderColor: "black",
                borderWidth: 1,
              }}
              onPress={onSubmit}
            >
              <Text style={{ fontSize: 17, fontWeight: "500", color: "white" }}>
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingTop: StatusBar.currentHeight,
  },
});
