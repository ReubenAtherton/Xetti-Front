import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
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
  RefreshControl,
} from "react-native";

import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const [loading, setLoading] = useState(true); // New loading state

  const [users, setUsers] = useState([]);
  const [id, setUserID] = useState("");
  const [following, setFollowing] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("id").then((userId) => {
      if (userId) {
        setUserID(userId);
      }
    });
  }, []);

  const fetchFollowingUsers = async () => {
    try {
      const response = await fetch(
        `http://172.20.10.9:8080/api/auth/show-following/${id}`
      );
      if (response.ok) {
        const data = await response.json();
        setFollowing(data);
      } else {
        console.log("Error 1: " + response.status);
      }
    } catch (error) {
      console.log("Error 2: " + error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchFollowingUsers();
    }
  }, [id]);

  const handleRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchFollowingUsers();
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const viewProfile = (id) => {
    navigation.navigate("View", { idview: id });
  };

  const viewAll = () => {
    navigation.navigate("Add");
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <Text></Text> // Show a loading indicator
      ) : (
        <>
          <StatusBar style="auto" />
          <Header viewAll={viewAll} />
          <View style={styles.body}>
            <Body
              following={following}
              handleRefresh={handleRefresh}
              viewProfile={viewProfile}
              navigation={navigation}
              refreshing={refreshing}
            />
          </View>
        </>
      )}
    </View>
  );
}

const Header = ({ viewAll }) => {
  return (
    <View style={styles.header}>
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View
          style={{
            flex: 6,
            alignSelf: "flex-end",
            marginStart: "3%",
            marginBottom: "2.5%",
          }}
        >
          <Text style={styles.headerText}>xetti</Text>
        </View>
        <View style={{ flex: 1, alignSelf: "flex-end", marginBottom: "3%" }}>
          <TouchableOpacity onPress={() => viewAll()}>
            <Ionicons name="person-add" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ... (existing code)

const Body = ({ following, handleRefresh, viewProfile, refreshing }) => {
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{
            fontSize: 20,
            marginBottom: "4%",
            fontWeight: "500",
            flex: 6,
          }}
        >
          {" "}
          Friends{" "}
        </Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // Turn off the vertical scroll bar
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        {following.map((user) => (
          <TouchableOpacity
            key={user.id}
            style={styles.userCard}
            onPress={() => viewProfile(user.id)}
          >
            <View style={styles.userCardContent}>
              <View style={{ flex: 0.5 }}>
                <FontAwesome
                  name="user-circle"
                  size={27}
                  color="black"
                  style={{
                    paddingRight: "22%",
                    alignSelf: "center",
                    opacity: 1,
                  }}
                />
              </View>
              <View style={{ flex: 3 }}>
                <Text style={styles.name}>{user.name}</Text>
                <Text style={styles.userName}>
                  @{user.username.toLowerCase()} • {user.rating}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.dots}>
                  <Entypo
                    name="dots-three-horizontal"
                    size={15}
                    color="black"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
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
    flex: 1,
  },

  headerText: {
    fontSize: 32,
    marginLeft: "3.5%",
    fontWeight: "bold",
    color: "white",
  },

  body: {
    flex: 6,
    paddingHorizontal: "4%",
    marginTop: "6%",
  },

  userCard: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: "1%",
    paddingVertical: "2%",
    borderBottomWidth: 0.3,
    paddingBottom: "3%",
  },

  lastUserCard: {
    borderBottomWidth: 0.3,
    paddingBottom: "3%",
  },

  userCardContent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },

  name: {
    fontSize: 17,
  },

  userName: {
    paddingTop: "1%",
    fontSize: 14,
    opacity: 0.5,
  },

  dots: {
    alignSelf: "flex-end",
    padding: "3%",
    paddingHorizontal: "9%",
    marginRight: "5%",
    borderRadius: 14,
    backgroundColor: "rgba(183,183,183,0.5)",
  },
});
