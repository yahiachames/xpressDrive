import {StyleSheet} from "react-native";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../screens/account/login-screen";
import RegisterScreen from "../screens/account/register/register-screen";
import routes from "./routes";
import OnBoardingScreen from "../screens/on-boarding-screen";

const GuestStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name={routes.BOARDING} component={OnBoardingScreen} options={{headerShown: false}}/>
            <Stack.Screen name={routes.LOGIN} component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name={routes.REGISTER} component={RegisterScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default GuestStack;

const styles = StyleSheet.create({});
