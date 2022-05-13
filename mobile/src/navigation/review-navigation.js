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
import RankingScreen from "../screens/driver/settings/ranking-screen";

const ReviewStack = () => {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={routes.REVIEWS}
                component={ReviewsScreen}
                options={{
                    headerShown: true,
                    header: ({scene, previous, navigation}) => (
                        <CustomHeader
                            goBack={true}
                            title={routes.REVIEWS}
                            navigation={navigation}
                            children={<View/>}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name={routes.RANKING}
                component={RankingScreen}
                options={{
                    headerShown: true,
                    header: ({scene, previous, navigation}) => (
                        <CustomHeader
                            goBack={true}
                            title={routes.RANKING}
                            navigation={navigation}
                            children={<View/>}
                        />
                    ),
                }}
            />
        </Stack.Navigator>
    );
};

export default ReviewStack
