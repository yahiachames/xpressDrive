import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

// components
import CustomDrawerContentComponent from '../components/custom-drawer-content.component';
import DashboardScreen from "../screens/driver/dashboard-screen";

const Drawer = createDrawerNavigator();

export default () => (
    <Drawer.Navigator
        drawerContent={CustomDrawerContentComponent}
    >
        <Drawer.Screen name="Home" component={DashboardScreen}/>
        <Drawer.Screen name="History" component={DashboardScreen}/>
        <Drawer.Screen name="Notifications" component={DashboardScreen}/>
        <Drawer.Screen name="Invite Friends" component={DashboardScreen}/>
        <Drawer.Screen name="Settings" component={DashboardScreen}/>
        <Drawer.Screen name="Logout" component={DashboardScreen}/>
    </Drawer.Navigator>
);
