import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

export default function Profile({ navigation }) {
  const [user, setUser] = useState("");
  const [id, setUserID] = useState("");
  const [bets, setBets] = useState([]);
  //const [idview, setIdView] = useState("");
  //const isSpecial = route.params.isSpecial;

  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    AsyncStorage.getItem("id").then((userId) => {
      if (userId) {
        setUserID(userId);
      }
    });
  }, []);

  const handleRefresh = async () => {
    await fetchUser();
    await fetchBets();
  };

  useEffect(() => {
    if (id) {
      fetchUser();
      fetchBets();
    }
  }, [id]);

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `http://10.159.143.121:8080/api/auth/user/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.log("Error: " + response.status);
      }
    } catch (error) {
      console.log("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  const bet_url = `http://10.159.143.121:8080/api/auth/get-bets/${id}`;

  const fetchBets = async () => {
    try {
      const response = await fetch(bet_url);
      if (response.ok) {
        const data = await response.json();
        setBets(data);
      } else {
        console.log("Error: " + response.status);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text></Text> // Show a loading indicator
      ) : (
        <>
          <StatusBar style="auto" />
          <Header user={user} handleRefresh={handleRefresh} />
          <Body
            id={id}
            bets={bets}
            handleRefresh={handleRefresh}
            navigation={navigation}
          />
        </>
      )}
    </View>
  );
}

const Header = ({ user, handleRefresh }) => {
  return (
    <View style={styles.headerSpecial}>
      <ProfilePicture user={user} />
      <HeaderCard user={user} handleRefresh={handleRefresh} />
    </View>
  );
};

const ProfilePicture = ({ user }) => {
  return (
    <View
      style={{
        width: "31%",
        height: 110,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(93, 176, 117, 1)",
      }}
    >
      <FontAwesome5 name="coins" size={20} color="white" />
      <Text>{/* space */}</Text>
      <Text style={{ fontSize: 23, fontWeight: "400", color: "white" }}>
        {user.accountValue.toFixed(2)}
      </Text>
    </View>
  );
};

const HeaderCard = ({ user, handleRefresh }) => {
  const fontSize = user.name.length > 15 ? 20 - user.name.length / 10 : 25;

  const text = StyleSheet.create({
    name: {
      fontSize,
      alignSelf: "center",
      marginTop: "4%",
      color: "black",
      fontWeight: "400",
    },
    values: {
      alignSelf: "center",
      fontSize: 18,
      fontWeight: "500",
      color: "black",
      fontWeight: "500",
    },
    text: {
      alignSelf: "center",
      fontSize: 16,
      color: "black",
      fontWeight: "400",
    },
  });

  return (
    <View
      style={{ flex: 1, borderWidth: 0, borderRadius: 10, marginLeft: "3%" }}
    >
      <View style={{ flexDirection: "row", flex: 1, alignSelf: "center" }}>
        <View style={{ flex: 1, alignSelf: "center" }}>
          <Text style={text.name} numberOfLines={1}>
            {user ? user.name : ""}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          flex: 1,
          width: "95%",
          alignSelf: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={text.values}>{user ? user.totalGames : ""}</Text>
            <Text style={text.text}>Bets</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={text.values}>{user ? user.winCount : ""}</Text>
            <Text style={text.text}>Wins</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={text.values}>{user ? user.rating : ""}</Text>
            <Text style={text.text}>Trust</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const Body = ({ id, bets, handleRefresh, navigation }) => {
  const BetCardHeader = ({ bet_id, bet_amount }) => {
    return (
      <View
        style={{
          height: "35%",
          backgroundColor: "rgba(93, 176, 117, 0.55)", // Use rgba to set background color with opacity
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
            paddingLeft: "4%",
          }}
        >
          <Text>{bet_id}</Text>
        </View>
        <View
          name="right"
          style={{
            paddingRight: "4%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              paddingRight: "2%",
              color: "black", // Set the text color to default (no opacity change)
              fontSize: 16,
              fontWeight: "500",
            }}
          >
            {bet_amount.toFixed(2)}{" "}
            <FontAwesome5 name="coins" size={15} color="black" />
          </Text>
        </View>
      </View>
    );
  };

  const BetCardBody = ({ name, bet }) => {
    return (
      <View
        style={{
          flex: 1,
          width: "100%",
        }}
      >
        <BetCardPlayers name={name} />
        <BetCardSeeDetails bet={bet} />
      </View>
    );
  };

  const BetCardPlayers = ({ name }) => {
    return (
      <View
        style={{
          flex: 1,
          height: "45%",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          borderBottomColor: "black",
          backgroundColor: "rgba(194, 228, 203, 0.45)", // Use rgba to set background color with opacity
          paddingHorizontal: "4%",
        }}
      >
        <View name="left" style={{ flex: 1 }}>
          <FontAwesome5
            name="users"
            size={19}
            color="black"
            style={{ opacity: 0.75 }}
          />
        </View>
        <View name="right" style={{ flex: 6.5 }}>
          <Text style={{ fontSize: 14 }}>{name}</Text>
        </View>
      </View>
    );
  };

  const BetCardSeeDetails = ({ bet }) => {
    const voteScreen = (bet) => {
      navigation.navigate("Vote", { bet: bet });
    };

    return (
      <View
        style={{
          flex: 1,
          width: "100%",

          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "rgba(194, 228, 203, 0.2)", // Use rgba to set background color with opacity

          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => voteScreen(bet)}
        >
          <View style={{ flex: 9 }}>
            <Text
              style={{
                paddingLeft: "5%",
                opacity: 0.6,
              }}
            >
              See Details
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <FontAwesome5
              name="angle-down"
              size={20}
              color="black"
              style={{ opacity: 0.6 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const [activeTab, setActiveTab] = useState("active");

  const handleTabPress = async (tab) => {
    setActiveTab(tab);
    handleRefresh();
  };

  const handleRefresh1 = async () => {
    handleRefresh();
  };

  return (
    <View style={styles.body}>
      <View
        name="ActiveBets"
        style={{
          flex: 1,
          marginVertical: "5%",
          width: "100%",
        }}
      >
        <View style={styles.container}>
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "active" && styles.activeTabButton,
              ]}
              onPress={() => handleTabPress("active")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === "active" && styles.activeTabButtonText,
                ]}
              >
                Active
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.tabButton,
                activeTab === "history" && styles.activeTabButton,
              ]}
              onPress={() => handleTabPress("history")}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === "history" && styles.activeTabButtonText,
                ]}
              >
                History
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.listContainer}>
            {activeTab === "active" ? (
              <View
                style={{ justifyContent: "center", width: "100%", flex: 1 }}
              >
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={bets}
                  renderItem={({ item }) => (
                    <View>
                      <View
                        style={{
                          flex: 1,
                          borderColor: "black",
                          borderRadius: 10,

                          height: 120,
                          marginVertical: "2%",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                      >
                        <BetCardHeader
                          bet_id={item.id}
                          bet_amount={item.amount}
                        />
                        <BetCardBody
                          name={
                            item.playerList
                              ? item.playerList
                                  .map((player) => player.name)
                                  .join(", ")
                              : ""
                          }
                          bet={item}
                        />
                      </View>
                    </View>
                  )}
                  keyExtractor={(item) => item.id.toString()}
                  refreshControl={<RefreshControl onRefresh={handleRefresh} />}
                />
              </View>
            ) : (
              <FlatList
                //data={historyData}
                renderItem={({ item }) => (
                  <Text style={styles.listItem}>Currently no data</Text>
                )}
                keyExtractor={(item) => item}
              />
            )}
          </View>
        </View>
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
  headerSpecial: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "4%",
    paddingTop: "15%",
    paddingBottom: "0.5%",
    backgroundColor: "rgba(93, 176, 117, 0)",
  },

  headerNotSpecial: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "4%",
    paddingTop: "15%",
    paddingBottom: "0.5%",
    backgroundColor: "rgba(93, 176, 117, 0)",
  },

  body: {
    width: "100%",
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: "4%",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "3%",
    borderWidth: 0,
    height: "6%",
  },
  tabButton: {
    flex: 1,
    backgroundColor: "rgba(255, 255, 255, 1)", // Use rgba to set the background color with opacity
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabButton: {
    backgroundColor: "rgba(0, 0, 0, 0.07)", // Use rgba to set the background color with opacity
  },
  tabButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "400",
    opacity: 0.6,
  },
  activeTabButtonText: {
    color: "#000",
    opacity: 1,
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
  listItem: {
    width: "100%",
    fontSize: 16,
    marginBottom: "5%",
  },
});
