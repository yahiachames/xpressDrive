import React from "react";
import {StyleSheet, TextInput, View} from "react-native";
import {AntDesign} from "@expo/vector-icons";
import {colors, sizes} from "../constants";
import {adaptToHeight} from "../config/dimensions";

function AppTextInput({
                          icon,
                          width = "100%",
                          style,
                          textStyle,
                          lang,
                          ...otherProps
                      }) {
    return (
        <View style={[styles.container, {width}, style]}>
            {icon && (
                <AntDesign
                    name={icon}
                    size={sizes.icon}
                    color={colors.dark}
                    style={styles.icon}
                />
            )}
            <TextInput style={[styles.text, textStyle]} {...otherProps} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: sizes.radius,
        flexDirection: "row",
        paddingHorizontal: sizes.margin,
        height: sizes.inputHeight,
        marginBottom: sizes.margin,
    },
    icon: {
        marginRight: sizes.margin,
        top: 3,
    },
    text: {
        color: colors.dark,
        fontSize: sizes.input,
        fontFamily: "latoBold",
    },
});

export default AppTextInput;
