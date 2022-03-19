import * as React from 'react';
import {StyleSheet} from 'react-native';
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";

const CustomDrawerContentComponent = (props) => (
    <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
            label="Close drawer"
            onPress={() => props.navigation.closeDrawer()}
        />
        <DrawerItem
            label="Toggle drawer"
            onPress={() => props.navigation.toggleDrawer()}
        />
    </DrawerContentScrollView>
);

const styles = StyleSheet.create({});

export default CustomDrawerContentComponent;
