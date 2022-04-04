import VehicleManagementScreen from "../screens/driver/settings/vehicle-management-screen";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import routes from "./routes";
import SettingsScreen from "../screens/settings-screen";
import CustomHeader from "../components/custom-header";
import {View} from "react-native";

const SettingStack = () => {
    const Stack = createNativeStackNavigator();
    return(
        <Stack.Navigator
            initialRouteName={routes.SETTINGS}
        >
            <Stack.Screen
                name={routes.SETTINGS}
                component={SettingsScreen}
                options={{
                    headerShown: true,
                    header: ({ scene, previous, navigation }) => (
                        <CustomHeader
                            title={routes.SETTINGS}
                            navigation={navigation}
                            children={<View />}
                        />
                    ),
                }}
            />
            <Stack.Screen
                name={routes.VEHICLE_MANAGEMENT}
                component={VehicleManagementScreen}
                options={{
                    headerShown: true,
                    header: ({ scene, previous, navigation }) => (
                        <CustomHeader
                            goBack={true}
                            title={routes.VEHICLE_MANAGEMENT}
                            navigation={navigation}
                            children={<View />}
                        />
                    ),
                }}
            />
            <Stack.Screen name={routes.DOCUMENT_MANAGEMENT} component={VehicleManagementScreen} />
            <Stack.Screen name={routes.REVIEWS} component={VehicleManagementScreen} />
            <Stack.Screen name={routes.LANGUAGE} component={VehicleManagementScreen} />
            <Stack.Screen name={routes.NOTIFICATION} component={VehicleManagementScreen} />
            <Stack.Screen name={routes.TERMS_PRIVACY} component={VehicleManagementScreen} />
            <Stack.Screen name={routes.CONTACT_US} component={VehicleManagementScreen} />
        </Stack.Navigator>
    )
}

export default SettingStack
