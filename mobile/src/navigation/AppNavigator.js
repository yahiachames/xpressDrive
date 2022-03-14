import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import routes from "./routes";
import HomeScreen from "../screens/home-screen";
import LoginScreen from "../screens/login-screen";
import RegisterScreen from "../screens/register-screen";
import NewListingButton from "./NewListingButton";
import ProfileScreen from "../screens/ProfileScreen";

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
    </Tab.Navigator>
  );
};

export default AppNavigator;
