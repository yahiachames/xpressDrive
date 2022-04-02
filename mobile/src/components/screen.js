import React from 'react'
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native'
import {colors, sizes} from "../constants";

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
        flex: 1,
        backgroundColor: colors.white,
    },
    view: {
        //padding: sizes.padding,
        //marginTop: StatusBar.currentHeight,
        flex: 1,
    }
})
