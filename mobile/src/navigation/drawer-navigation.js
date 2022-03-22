import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// components
import CustomDrawerContent from '../components/custom-drawer';
import HomeScreen from "../screens/driver/home/home-screen";
import {colors, sizes} from "../constants";
import {Ionicons} from "@expo/vector-icons";
import ProfileScreen from "../screens/account/profile-screen";
import SettingsScreen from "../screens/settings-screen";
import RequestScreen from "../screens/driver/request/request-screen";
import CustomHeader from "../components/custom-header";
import {View} from "react-native";
import routes from "./routes";
import BasicButton from "../components/basic-button";
import PickUpScreen from "../screens/driver/pick-up-screen";

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
            name={routes.HOME}
            component={HomeScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="home-outline" size={sizes.icon} color={color}/>
                ),
                headerShown: true,
                header: ({scene, previous, navigation}) => (
                    <CustomHeader title={"Offline"} navigation={navigation} children={<View/>}/>
                ),
            }}
        />
        <Drawer.Screen
            name={routes.PROFILE}
            component={ProfileScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="person-outline" size={sizes.icon} color={color}/>
                ),
                headerShown: true,
                header: ({scene, previous, navigation}) => (
                    <CustomHeader
                        goBack={true}
                        children={
                            <BasicButton
                                bgColor={colors.transparent}
                                textColor={colors.secondary}
                                title={'edit'}
                                style={{height: 'auto'}}
                            />
                        } navigation={navigation}/>
                ),
            }}
        />
        <Drawer.Screen
            name={routes.REQUESTS}
            component={RequestScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="git-pull-request" size={sizes.icon} color={color}/>
                ),
                headerShown: true,
                header: ({scene, previous, navigation}) => (
                    <CustomHeader title={routes.REQUESTS} navigation={navigation} children={<View/>}/>
                ),
            }}
        />
        <Drawer.Screen
            name={routes.PICK_UP}
            component={PickUpScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="git-pull-request" size={sizes.icon} color={color}/>
                ),
                headerShown: true,
                header: ({scene, previous, navigation}) => (
                    <CustomHeader goBack={true} title={routes.PICK_UP} navigation={navigation} children={<View/>} />
                ),
            }}
        />
        <Drawer.Screen
            name={routes.SETTINGS}
            component={SettingsScreen}
            options={{
                drawerIcon: ({color}) => (
                    <Ionicons name="settings-outline" size={sizes.icon} color={color}/>
                ),
                headerShown: true,
                header: ({scene, previous, navigation}) => (
                    <CustomHeader title={routes.SETTINGS} navigation={navigation} children={<View/>}/>
                ),
            }}
        />
    </Drawer.Navigator>
);