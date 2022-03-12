import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// screens
import HomeScreen from '../screens/home-screen';

// components
import CustomDrawerContentComponent from '../components/custom-drawer-content.component';

const Drawer = createDrawerNavigator();

export default () => (
    <Drawer.Navigator
        drawerContent={CustomDrawerContentComponent}
        screenOptions={{ headerShown: false }}
    >
        <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
);
