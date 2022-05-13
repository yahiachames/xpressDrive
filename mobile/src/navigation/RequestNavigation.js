import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import routes from "./routes";
import RequestScreen from "../screens/driver/request/request-screen";
import PickUpScreen from "../screens/driver/pick-up-screen";

const RequestNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={routes.REQUEST} component={RequestScreen} />
      <Stack.Screen
        name={routes.PICK_UP}
        options={{ headerShown: true }}
        component={PickUpScreen}
      />
    </Stack.Navigator>
  );
};

export default RequestNavigation;

const styles = StyleSheet.create({});
