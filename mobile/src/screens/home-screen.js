import React from 'react';
import {Image, Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
import {adaptToHeight, adaptToWidth} from "../config/dimensions";
import {colors} from "../constants";
import NavOptions from "../components/nav-options";
import Carousel from "react-native-snap-carousel";
const HomeScreen = () => {

    return (
        <View style={{padding: adaptToWidth(0.1)}}>
            <Text style={styles.header}>Xpress</Text>
            <NavOptions />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        color: colors.primary,
        fontSize: adaptToWidth(0.07),
        fontFamily: 'latoBold',
        marginBottom: adaptToHeight(0.1)
    },
});

export default HomeScreen;
