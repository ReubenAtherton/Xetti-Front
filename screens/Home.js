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
        `http://10.159.143.121:8081/api/auth/show-following/${id}`
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
      await fetchFollowingUsers();
    } catch (error) {
      console.log("Error 3: " + error);
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
          <Header viewAll={viewAll} />
          <View style={styles.body}>
            <Body
              following={following}
              handleRefresh={handleRefresh}
              viewProfile={viewProfile}
              navigation={navigation}
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
        <View style={{ flex: 6, alignSelf: "flex-end", marginBottom: 10 }}>
          <Text style={styles.headerText}>Betti</Text>
        </View>
        <View style={{ flex: 1, alignSelf: "flex-end", marginBottom: 14 }}>
          <TouchableOpacity onPress={() => viewAll()}>
            <Ionicons name="person-add" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// ... (existing code)

const Body = ({ following, handleRefresh, viewProfile }) => {
  return (
    <View style={{ width: "100%", flex: 1 }}>
      <View style={{ flexDirection: "row" }}>
        <Text
          style={{ fontSize: 20, marginBottom: 25, fontWeight: "500", flex: 6 }}
        >
          {" "}
          Friends{" "}
        </Text>
      </View>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // Turn off the vertical scroll bar
        refreshControl={<RefreshControl onRefresh={handleRefresh} />}
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
                    paddingRight: 8,
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
    backgroundColor: "#5DB075",
    width: "100%",
    flex: 1,
  },
  headerText: {
    fontSize: 32,
    marginLeft: 12,
    fontWeight: "bold",
    color: "white",
  },

  body: {
    flex: 6,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingVertical: 5,
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
  lastUserCard: {
    borderBottomWidth: 0.3,
    paddingBottom: 10,
  },
  userCardContent: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  userInfo: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 17,
  },
  userName: {
    paddingTop: 2,
    fontSize: 14,
    opacity: 0.5,
  },
  followButton: {
    borderRadius: 14,
    backgroundColor: "rgba(93, 176, 117, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  followButtonText: {
    fontSize: 15,
    fontWeight: "400",
    color: "black",
  },

  dots: {
    alignSelf: "flex-end",
    padding: 3,
    paddingHorizontal: 8,
    marginRight: 5,
    //borderWidth: 0.7,
    borderRadius: 14,
    //backgroundColor: "rgba(93,176,117,0.5)",
    backgroundColor: "rgba(183,183,183,0.5)",

    //paddingHorizontal: 4,
    //paddingVertical: 7,
  },
});
