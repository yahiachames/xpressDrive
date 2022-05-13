import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, FontAwesome, MaterialCommunityIcons, MaterialIcons} from "@expo/vector-icons";
import {colors, sizes} from "../constants";
import AppText from "./custom-text";

function BasicButton({
                         iconSize = sizes.icon,
                         iconType = "FontAwesome",
                         title,
                         icon,
                         onPress,
                         bgColor = colors.dark,
                         style,
                         textColor = colors.white,
                         textStyle,
                         disabled = false,
                         onLongPress,
                         activeOpacity = .7
                     }) {

    const renderIcon = () => {
        switch (iconType) {
            case "FontAwesome":
                return <FontAwesome style={{paddingHorizontal: sizes.tiny}} name={icon} size={iconSize}
                                    color={textColor}/>
            case "AntDesign":
                return <AntDesign style={{paddingHorizontal: sizes.tiny}} name={icon} size={iconSize}
                                  color={textColor}/>
            case "MaterialCommunityIcons":
                return <MaterialCommunityIcons style={{paddingHorizontal: sizes.tiny}} name={icon} size={iconSize} color={textColor}/>
            case "MaterialIcons":
                return <MaterialIcons style={{paddingHorizontal: sizes.tiny}} name={icon} size={iconSize} color={textColor}/>
            default:
                return <AntDesign style={{paddingHorizontal: sizes.tiny}} name={icon} size={iconSize}
                                  color={textColor}/>
        }
    }

    return (
        <TouchableOpacity
            activeOpacity={activeOpacity}
            style={[styles.button, {backgroundColor: bgColor}, style]}
            disabled={disabled}
            onPress={onPress}
            onLongPress={onLongPress}
        >
            <View style={(icon && title) ? {alignItems: "center", flexDirection: "row"} : {}}>
                {icon ? renderIcon() : <></>}
                {title && (
                    <AppText style={[styles.text, {color: textColor}, textStyle]}>
                        {title}
                    </AppText>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        borderRadius: sizes.radius,
        justifyContent: "center",
        alignItems: "center",
        padding: sizes.padding,
        width: "auto",
        marginVertical: sizes.margin,
    },
    text: {
        color: colors.white,
        fontSize: sizes.h6,
        textTransform: "capitalize",
        fontFamily: "latoBold",
        textAlign: "center",
    },
})

export default BasicButton;
