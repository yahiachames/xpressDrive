import React from 'react'
import {SafeAreaView, StyleSheet, View} from 'react-native'
import Constants from 'expo-constants'
import {colors} from "../constants";

export default function Screen({children, style}) {
    return (
        <SafeAreaView style={[styles.container, style]}>
            <View style={[styles.view, style]}>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        //paddingTop: Constants.statusBarHeight,
        flex: 1,
        backgroundColor: colors.white,
    },
    view: {
        flex: 1
    }
})
