import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";

export default function AddFriends({ navigation }) {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [id, setUserID] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("id").then((userId) => {
      if (userId) {
        setUserID(userId);
      }
    });
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, users]);

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(
        "http://172.20.10.9:8080/api/auth/show-users"
      );
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.log("Error: " + response.status);
      }
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const handleRefresh = async () => {
    try {
      await fetchAllUsers();
    } catch (error) {
      console.log("Error: " + error);
    }
  };

  const filterUsers = () => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const addUser = async (to_follow_id) => {
    console.log(id + " is following");
    console.log(to_follow_id);

    try {
      const response = await fetch(
        `http://172.20.10.9:8080/api/auth/add-user/${id}/${to_follow_id}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("User authentication failed");
      } else {
        const user = await response.json();
        // Handle the response data if needed
      }
    } catch (error) {
      console.error(error);
    }

    // Add any additional logic here
  };

  const viewProfile = (id) => {
    navigation.navigate("View", { idview: id });
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}></View>
      <View style={styles.body}>
        <View style={styles.searchInput}>
          <FontAwesome
            name="search"
            size={24}
            color="black"
            style={{ alignSelf: "center", paddingRight: "4%" }}
          />
          <TextInput
            placeholder="Search Users"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            style={{ flex: 1 }}
          />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false} // Turn off the vertical scroll bar
        >
          {filteredUsers.map((user, index) => (
            <TouchableOpacity
              key={user.id}
              style={[
                styles.userCard,
                index === filteredUsers.length - 1 && styles.lastUserCard,
              ]}
              onPress={() => viewProfile(user.id)}
            >
              <View style={styles.userCardContent}>
                <FontAwesome
                  name="user-circle"
                  size={30}
                  color="black"
                  style={{
                    paddingRight: "2%",
                    alignSelf: "center",
                    opacity: 1,
                  }}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.name}>{user.name}</Text>
                  <Text style={styles.userName}>
                    @{user.username.toLowerCase()} • {user.rating}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.followButton}
                  onPress={() => addUser(user.id)}
                >
                  <Text style={styles.followButtonText}>Follow</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    backgroundColor: "#4dd173",
    height: "13.85%",
  },

  body: {
    flex: 1,
    paddingHorizontal: "4%",
    marginTop: "6%",
  },

  searchInput: {
    flexDirection: "row",
    alignItems: "center",
    height: "7%",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: "4%",
    paddingHorizontal: "3%",
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

  userInfo: {
    flex: 1,
    marginLeft: "1.5%",
  },

  name: {
    fontSize: 17,
  },

  userName: {
    paddingTop: "1%",
    fontSize: 14,
    opacity: 0.5,
  },

  followButton: {
    borderRadius: 14,
    backgroundColor: "rgba(93, 176, 117, 0.7)",
    paddingHorizontal: "3%",
    paddingVertical: "1.5%",
  },
  followButtonText: {
    fontSize: 15,
    fontWeight: "400",
    color: "black",
  },
});
