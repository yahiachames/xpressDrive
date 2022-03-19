import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// components
import CustomDrawerContent from '../components/custom-drawer-content';
import HomeScreen from "../screens/driver/home-screen";

const Drawer = createDrawerNavigator();

export default () => (
    <Drawer.Navigator
        drawerContent={CustomDrawerContent}
    >
        <Drawer.Screen name="Home" component={HomeScreen}/>
        <Drawer.Screen name="History" component={HomeScreen}/>
        <Drawer.Screen name="Notifications" component={HomeScreen}/>
        <Drawer.Screen name="Invite Friends" component={HomeScreen}/>
        <Drawer.Screen name="Settings" component={HomeScreen}/>
        <Drawer.Screen name="Logout" component={HomeScreen}/>
    </Drawer.Navigator>
);
