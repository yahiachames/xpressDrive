import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/login-screen";
import RegisterScreen from "../screens/register-screen";
import routes from "./routes";

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;

const styles = StyleSheet.create({});
