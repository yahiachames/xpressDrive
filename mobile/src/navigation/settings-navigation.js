import VehicleManagementScreen from "../screens/driver/settings/vehicle-management-screen";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import routes from "./routes";
import SettingsScreen from "../screens/settings-screen";
import CustomHeader from "../components/custom-header";
import {View} from "react-native";
import DocumentManagementScreen from "../screens/driver/settings/document-management-screen";
import NotificationScreen from "../screens/driver/settings/notification-screen";
import ContactUsScreen from "../screens/driver/settings/contact-us-screen";
import LanguageScreen from "../screens/driver/settings/language-screen";
import TermsScreen from "../screens/driver/settings/terms-screen";
import ReviewsScreen from "../screens/driver/settings/reviews-screen";
import ReviewStack from "./review-navigation";

const SettingStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={routes.SETTINGS_NAVIGATION}
                options={{
                    headerShown: true,
                    header: ({scene, previous, navigation}) => (
                        <CustomHeader
                            goBack={false}
                            title={routes.SETTINGS_NAVIGATION}
                            navigation={navigation}
                            children={<View/>}
                        />
                    ),
                }}
                component={SettingsScreen}
            />
            <Stack.Screen
                name={routes.VEHICLE_MANAGEMENT}
                component={VehicleManagementScreen}
                options={{
                    headerShown: true,
                    header: ({scene, previous, navigation}) => (
                        <CustomHeader
                            goBack={true}
                            title={routes.VEHICLE_MANAGEMENT}
                            navigation={navigation}
                            children={<View/>}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name={routes.DOCUMENT_MANAGEMENT}
                component={DocumentManagementScreen}
                options={{
                    headerShown: true,
                    header: ({scene, previous, navigation}) => (
                        <CustomHeader
                            goBack={true}
                            title={routes.DOCUMENT_MANAGEMENT}
                            navigation={navigation}
                            children={<View/>}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name={routes.REVIEWS}
                component={ReviewStack}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name={routes.LANGUAGE}
                component={LanguageScreen}
                options={{
                    headerShown: true,
                    header: ({scene, previous, navigation}) => (
                        <CustomHeader
                            goBack={true}
                            title={routes.LANGUAGE}
                            navigation={navigation}
                            children={<View/>}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name={routes.NOTIFICATION}
                component={NotificationScreen}
                options={{
                    headerShown: true,
                    header: ({scene, previous, navigation}) => (
                        <CustomHeader
                            goBack={true}
                            title={routes.NOTIFICATION}
                            navigation={navigation}
                            children={<View/>}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name={routes.TERMS_PRIVACY}
                component={TermsScreen}
                options={{
                    headerShown: true,
                    header: ({scene, previous, navigation}) => (
                        <CustomHeader
                            goBack={true}
                            title={routes.TERMS_PRIVACY}
                            navigation={navigation}
                            children={<View/>}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name={routes.CONTACT_US}
                component={ContactUsScreen}
                options={{
                    headerShown: false,
                    header: ({scene, previous, navigation}) => (
                        <CustomHeader
                            goBack={true}
                            title={routes.CONTACT_US}
                            navigation={navigation}
                            children={<View/>}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default SettingStack
