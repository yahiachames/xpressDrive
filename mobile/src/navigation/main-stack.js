import * as React from 'react';
import HomeScreen from "../screens/home-screen";
import LoginScreen from "../screens/login-screen";
import RegisterScreen from "../screens/register-screen";
import routes from "./routes";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import ForgetPasswordScreen from "../screens/forget-password-screen";
import MapScreen from "../screens/map-screen";

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={routes.HOME} component={HomeScreen} />
      <Stack.Screen name={routes.LOGIN} component={LoginScreen} />
      <Stack.Screen name={routes.REGISTER} component={RegisterScreen} />
      <Stack.Screen
        name={routes.FORGET_PASSWORD}
        component={ForgetPasswordScreen}
      />
      <Stack.Screen name={routes.MAP} component={MapScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);
