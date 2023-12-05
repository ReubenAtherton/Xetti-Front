import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("active");

  // Sample data for active and history lists
  const activeData = ["Item 1", "Item 2", "Item 3"];
  const historyData = ["Item A", "Item B", "Item C"];

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
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
          <FlatList
            data={activeData}
            renderItem={({ item }) => (
              <Text style={styles.listItem}>{item}</Text>
            )}
            keyExtractor={(item) => item}
          />
        ) : (
          <FlatList
            data={historyData}
            renderItem={({ item }) => (
              <Text style={styles.listItem}>{item}</Text>
            )}
            keyExtractor={(item) => item}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 200,
    flex: 1,
    paddingTop: 20,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#000",
    backgroundColor: "#FFF",
  },
  activeTabButton: {
    backgroundColor: "#000",
  },
  tabButtonText: {
    color: "#000",
  },
  activeTabButtonText: {
    color: "#FFF",
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listItem: {
    fontSize: 16,
    marginBottom: 12,
  },
});
