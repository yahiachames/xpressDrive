import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import routes from "./routes";

import RegisterScreen from "../screens/riderScreens/register-screen";
import NewListingButton from "./NewListingButton";
import ProfileScreen from "../screens/riderScreens/ProfileScreen";
import RequestScreen from "../screens/riderScreens/RequestScreen";
import HomeScreen from "../screens/riderScreens/home-screen";
import DestinationScreen from "../screens/riderScreens/DestinationScreen";
import LoginScreen from "../screens/riderScreens/login-screen";

const AppNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="Navigate">
      <Tab.Screen
        name="Navigate"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="Account"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="equest"
        component={RequestScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="destination"
        component={DestinationScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default AppNavigator;
