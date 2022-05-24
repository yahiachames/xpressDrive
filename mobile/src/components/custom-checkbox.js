import {StyleSheet, View} from "react-native";
import React, {useState} from "react";
import {FontAwesome} from "@expo/vector-icons";
import {TouchableOpacity} from "react-native-gesture-handler";
import sizes from "../constants/sizes";
import AppText from "./custom-text";
import {colors} from "../constants";

export default function CustomCheckBox({
                                           title,
                                           checked = false,
                                           color = colors.secondary,
                                           checkedIcon="dot-circle-o",
                                           uncheckedIcon="circle-o",
                                           size = sizes.icon,
                                           style,
                                           lang,
                                           children,
                                           onCheck = () => {}
                                       }) {

    return (
        <View style={[styles.container, style]}>
            <TouchableOpacity onPress={() => {
                onCheck()
            }}>
                <FontAwesome
                    name={checked ? checkedIcon: uncheckedIcon}
                    size={size}
                    color={color}
                />
            </TouchableOpacity>
            <AppText> </AppText>
            {title && <AppText style={[styles.title]}>{title}</AppText>}
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        marginBottom: sizes.margin,
        alignItems: 'center'
    },
    title: {
        fontFamily: "latoRegular",
        fontSize: sizes.h6,
    },
});
