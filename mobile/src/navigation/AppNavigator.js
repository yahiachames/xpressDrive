import * as React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

// components
import CustomDrawerContent from "../components/custom-drawer";

import { colors, sizes } from "../constants";
import { Ionicons } from "@expo/vector-icons";

import CustomHeader from "../components/custom-header";
import HomeNavigator from "./home-rider";
import RiderCustomDrawr from "../components/chames/RiderCustomDrawer";
import CustomRiderHeader from "../components/CustomRiderHeader";

const Drawer = createDrawerNavigator();

export default () => (
  <Drawer.Navigator
    drawerContent={RiderCustomDrawr}
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
      name="Home"
      component={HomeNavigator}
      options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" size={sizes.icon} color={color} />
        ),
        headerShown: true,
        header: ({ scene, previous, navigation }) => (
          <CustomRiderHeader navigation={navigation} />
        ),
        headerTransparent: true,
      }}
    />
  </Drawer.Navigator>
);
