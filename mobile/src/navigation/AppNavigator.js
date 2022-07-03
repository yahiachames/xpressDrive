import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// components
import CustomDrawerContent from "../components/custom-drawer";
import { colors, sizes } from "../constants";
import { Ionicons } from "@expo/vector-icons";

import CustomHeader from "../components/custom-header";
import { View } from "react-native";
import routes from "./routes";
import ProfileScreen from "../screens/account/profile/profile-screen";
import HomeNavigator from "./home-rider";
import ProfileNavigation from "../screens/account/profile/navigation/profile-navigation";
import HistoryScreen from "../screens/history/history-screen";

const Drawer = createDrawerNavigator();

export default () => (
  <Drawer.Navigator
    drawerContent={CustomDrawerContent}
    screenOptions={{
      headerShown: false,
      drawerActiveBackgroundColor: colors.primary,
      drawerActiveTintColor: colors.white,
      drawerInactiveTintColor: colors.black,
      drawerLabelStyle: {
        marginLeft: -25,
        fontFamily: "latoMedium",
        fontSize: sizes.font,
      },
    }}
  >
    <Drawer.Screen
      name={routes.HOME}
      component={HomeNavigator}
      options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" size={sizes.icon} color={color} />
        ),
        headerShown: true,
      }}
    />
    <Drawer.Screen
      name={routes.PROFILE}
      component={ProfileScreen}
      options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="person-outline" size={sizes.icon} color={color} />
        ),
        headerShown: true,
        header: ({ scene, previous, navigation }) => (
          <CustomHeader
            goBack={true}
            children={<ProfileNavigation />}
            navigation={navigation}
          />
        ),
      }}
    />
    <Drawer.Screen
      name={routes.HISTORY}
      component={HistoryScreen}
      options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="person-outline" size={sizes.icon} color={color} />
        ),
        headerShown: true,
        header: ({ scene, previous, navigation }) => (
          <CustomHeader
            goBack={true}
            children={<View />}
            navigation={navigation}
          />
        ),
      }}
    />
  </Drawer.Navigator>
);
