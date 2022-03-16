import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";
import {colors} from "../constants";
import Map from "../components/map";

const MapScreen = () => {
    const Stack = createNativeStackNavigator();
    const navigation = useNavigation();

    return (
        <View>
            <TouchableOpacity
                onPress={() => navigation.navigate("HomeScreen")}
                style={styles.menu}
            >
                <Icon name="menu" />
            </TouchableOpacity>

            <View style={{height: '50%'}}>
                <Map />
            </View>
            {/*<View style={{height: '50%'}}>
                <Stack.Navigator>
                    <Stack.Screen
                        name="NavigateCard"
                        component={NavigateCard}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="RideOptionsCard"
                        component={RideOptionsCard}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </View>*/}
        </View>
    );
};

export default MapScreen;

const styles = StyleSheet.create({
    menu: {
        position: 'absolute',
        top: 16,
        left: 8,
        zIndex: 50,
        borderRadius: 50,
        backgroundColor: colors.greyLight
    }
});
