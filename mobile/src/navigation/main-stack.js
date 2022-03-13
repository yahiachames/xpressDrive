import * as React from 'react';
import HomeScreen from "../screens/home-screen";
import LoginScreen from "../screens/login-screen";
import RegisterScreen from "../screens/register-screen";
import routes from "./routes";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import ForgetPasswordScreen from "../screens/forget-password-screen";
import MapScreen from "../screens/map-screen";
import Drawar from "./drawer-stack";
import AppNavigator from "./AppNavigator";
const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <AppNavigator />
  </NavigationContainer>
);
