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
import { adaptToHeight } from "../config/dimensions";
import CustomModal from "../components/Modals/custom-modal";

const Drawer = createDrawerNavigator();

export default () => (
  <Drawer.Navigator
    drawerContent={RiderCustomDrawr}
    screenOptions={{
      headerShown: false,

      drawerActiveTintColor: colors.white,
      drawerInactiveTintColor: colors.white,
      drawerLabelStyle: {
        fontFamily: "latoMedium",
        fontSize: adaptToHeight(0.025),
        margin: 5,
        color: colors.black,
      },
    }}
  >
    <Drawer.Screen
      name="Home"
      component={HomeNavigator}
      options={{
        headerShown: true,
        header: ({ scene, previous, navigation }) => (
          <CustomRiderHeader navigation={navigation} />
        ),
        headerTransparent: true,
      }}
    />
  </Drawer.Navigator>
);
