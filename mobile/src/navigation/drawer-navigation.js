import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// components
import CustomDrawerContent from '../components/custom-drawer';
import HomeScreen from "../screens/driver/home/home-screen";
import {colors, sizes} from "../constants";
import {Ionicons} from "@expo/vector-icons";
import ProfileScreen from "../screens/account/profile-screen";
import SettingsScreen from "../screens/settings-screen";
import RequestsScreen from "../screens/driver/requests-screen";
import CustomHeader from "../components/custom-header";

const Drawer = createDrawerNavigator();

export default () => (
    <Drawer.Navigator
        drawerContent={CustomDrawerContent}
        screenOptions={{
            headerShown: false,
            drawerActiveBackgroundColor: colors.primary,
            drawerActiveTintColor: colors.white,
            drawerInactiveTintColor: colors.black,
            drawerLabelStyle: {
                marginLeft: -25,
                fontFamily: 'latoMedium',
                fontSize: sizes.font,
            },
        }}
    >
        <Drawer.Screen
            name="Home"
            component={HomeScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="home-outline" size={sizes.icon} color={color}/>
                ),
                headerShown: true,
                header: ({scene, previous, navigation}) => (
                    <CustomHeader navigation={navigation}/>
                ),
            }}
        />
        <Drawer.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="person-outline" size={sizes.icon} color={color}/>
                ),
                headerShown: true,
                header: ({scene, previous, navigation}) => (
                    <CustomHeader navigation={navigation}/>
                ),
            }}
        />
        <Drawer.Screen
            name="Requests"
            component={RequestsScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="git-pull-request" size={sizes.icon} color={color}/>
                ),
                headerShown: true,
                header: ({scene, previous, navigation}) => (
                    <CustomHeader navigation={navigation}/>
                ),            }}
        />
        <Drawer.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="settings-outline" size={sizes.icon} color={color}/>
                ),
                headerShown: true,
                header: ({scene, previous, navigation}) => (
                    <CustomHeader navigation={navigation}/>
                ),
            }}
        />
    </Drawer.Navigator>
);
