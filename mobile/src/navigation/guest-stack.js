import {StyleSheet} from "react-native";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import LoginScreen from "../screens/account/login-screen";
import RegisterScreen from "../screens/account/register/register-screen";
import routes from "./routes";
import OnBoardingScreen from "../screens/on-boarding-screen";
import ForgetPasswordScreen from "../screens/account/forgot-password/forget-password-screen";
import CodeVerificationScreen from "../screens/account/forgot-password/code-verification-screen";
import ResetPasswordScreen from "../screens/account/forgot-password/reset-password-screen";

const GuestStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen name={routes.BOARDING} component={OnBoardingScreen} options={{headerShown: false}}/>
            <Stack.Screen name={routes.LOGIN} component={LoginScreen} options={{headerShown: false}}/>
            <Stack.Screen name={routes.REGISTER} component={RegisterScreen} options={{headerShown: false}}/>
            <Stack.Screen name={routes.FORGET_PASSWORD} component={ForgetPasswordScreen} options={{headerShown: false}}/>
            <Stack.Screen name={routes.CODE_VERIFICATION} component={CodeVerificationScreen} options={{headerShown: false}}/>
            <Stack.Screen name={routes.RESET_PASSWORD} component={ResetPasswordScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    );
};

export default GuestStack;

const styles = StyleSheet.create({});
