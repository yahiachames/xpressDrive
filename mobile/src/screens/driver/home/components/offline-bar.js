import {StyleSheet, Text, View} from "react-native";
import React from "react";
import {colors, sizes} from "../../../../constants";
import {MaterialIcons} from "@expo/vector-icons";


const OfflineBar = ({show = true}) => {
    return (
        show && <View style={styles.container}>
            <View style={styles.iconContainer}>
                <MaterialIcons
                    style={styles.icon}
                    name="nights-stay"
                    size={sizes.h2}
                    color={colors.black}
                />
            </View>
            <View>
                <Text style={styles.title}>You are offline !</Text>
                <Text style={styles.description}>Go online to start accepting jobs</Text>
            </View>
        </View>
    );
};

export default OfflineBar;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.secondary,
        paddingVertical: sizes.padding,
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        borderWidth: 1.5,
        borderColor: colors.black,
        borderRadius: 40,
        borderStyle: 'dashed',
        padding: sizes.tiny / 2,
        marginHorizontal: sizes.padding,
    },
    icon: {
        backgroundColor: colors.black,
        borderRadius: 40,
        color: colors.secondary,
        padding: sizes.tiny
    },
    title: {
        fontFamily: "latoBold",
        fontSize: sizes.h3
    },
    description: {
        fontFamily: "latoRegular",
        color: colors.black,
        fontSize: sizes.h4
    }
});
