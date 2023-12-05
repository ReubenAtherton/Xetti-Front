import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from 'react-native';
import Home from "../screens/Home";
import ViewProfile from "../screens/ViewProfile"
import Profile from "../screens/Profile";
import Vote from "../screens/Vote";
import { Ionicons } from '@expo/vector-icons';
import CreateBet from "../screens/CreateBet";
import AddFriends from "../screens/AddFriends";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function HomeTabGroup() {
  return (
    <Tab.Navigator
      screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackGroup}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'ios-home' : 'ios-home-outline'}
              size={25}
              color={focused ? "#5b8969" : "black"}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Create"
        component={CreateBet}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'add-circle' : 'add-circle-outline'}
              size={40}
              color={focused ? "#5b8969" : "black"}
              style={styles.tabIcon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackGroup}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'ios-person' : 'ios-person-outline'}
              size={25}
              color={focused ? "#5b8969" : "black"}
              style={styles.tabIcon}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {

  },
  tabItem: {

  },
  tabIcon: {

  },
});

function HomeStackGroup() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home-Profile"
        component={Home}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="View"
        component={ViewProfile}
        options={{
          headerTitle: "",
          headerTintColor: "black",
          headerTransparent: true,
        }}
      />
      <Stack.Screen
        name="Add"
        component={AddFriends}
        options={{
          headerTitle: "",
          headerTintColor: "black",
          headerTransparent: true,
        }}
      />

    </Stack.Navigator>
  );
}

function ProfileStackGroup() {

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home-Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Vote"
        component={Vote}
        options={{
          headerTitle: "",
          headerTintColor: "black",
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}



export default function HomeNav() {
  return (
    <View style={{ flex: 1, width: '100%' }}>
      <NavigationContainer independent={true}>
        <HomeTabGroup />
      </NavigationContainer>
    </View>
  );
}
