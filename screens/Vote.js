import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";

export default function Vote({ route, navigation }) {
  const [id, setUserID] = useState("");
  const bet = route.params.bet;
  const [trueUserNames, setTrueUserNames] = useState([]);
  const [falseUserNames, setFalseUserNames] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("id").then((userId) => {
      if (userId) {
        setUserID(userId);
      }
    });

    // Fetch user names after setting up the user ID
    fetchUserNames();
  }, []);

  const fetchUserNames = async () => {
    const trueVoters = [];
    const falseVoters = [];

    for (const [key, value] of Object.entries(bet.voteHashMap)) {
      if (value === true) {
        trueVoters.push(key);
      } else if (value === false) {
        falseVoters.push(key);
      }
    }

    const userIdsInt = (userIds) => userIds.map((id) => parseInt(id));

    try {
      const trueResponse = await fetchUserNamesTrue(userIdsInt(trueVoters));
      const falseResponse = await fetchUserNamesFalse(userIdsInt(falseVoters));

      if (trueResponse.ok) {
        setTrueUserNames(await trueResponse.json());
      } else {
        console.log("FAIL fetching true user names");
      }

      if (falseResponse.ok) {
        setFalseUserNames(await falseResponse.json());
      } else {
        console.log("FAIL fetching false user names");
      }
    } catch (error) {
      console.error("Error fetching user names:", error);
    }
  };

  const fetchUserNamesTrue = async (userIds) => {
    const requestData = {
      userIds: userIds,
    };

    return fetch(`http://172.20.10.9:8080/api/auth/get-user-names`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
  };

  const fetchUserNamesFalse = async (userIds) => {
    const requestData = {
      userIds: userIds,
    };

    return fetch(`http://172.20.10.9:8080/api/auth/get-user-names`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });
  };

  const vote = async (decision) => {
    const voteDto = {
      creator_user_id: bet.creator.id,
      joining_user_id: id,
      bet_id: bet.id,
      vote: decision,
    };

    const jsonVoteData = JSON.stringify(voteDto);

    try {
      const response = await fetch("http://172.20.10.9:8080/api/auth/vote", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: jsonVoteData,
      });

      if (!response.ok) {
        throw new Error("User authentication failed");
      } else {
        console.log("success");
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>Vote</Text>
      </View>
    );
  };

  const PlayerList = ({ players }) => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {players.map((player, index) => (
          <View key={index}>
            <Text style={{ alignSelf: "center", fontSize: 25 }}>
              {" "}
              {player}{" "}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Header />
      <View style={styles.body}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => vote(true)}>
          <PlayerList players={trueUserNames} />
        </TouchableOpacity>
        <View style={{ borderWidth: 1, width: "100%" }} />
        <TouchableOpacity style={{ flex: 1 }} onPress={() => vote(false)}>
          <PlayerList players={falseUserNames} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4dd173",
  },
  header: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "#4dd173",
  },
  headerText: {
    color: "white",
    fontSize: 30,
    marginBottom: "4%",
  },
  body: {
    flex: 6,
    width: "100%",
    backgroundColor: "white",
  },
  playerList: {
    flex: 1,
  },
  playerText: {
    alignSelf: "center",
  },
});
