import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import {colors, sizes} from "../constants";
import {adaptToHeight} from "../config/dimensions";

function BasicButton({
  iconSize = sizes.icon,
  iconType = "FontAwesome5",
  title,
  icon,
  onPress,
  bgColor = colors.dark,
  style,
  textColor = colors.white,
  textStyle,
  disabled = false,
  onLongPress,
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={[styles.button, { backgroundColor: bgColor }, style]}
      disabled={disabled}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        {title && (
          <Text style={[styles.text, { color: textColor }, textStyle]}>
            {title}
          </Text>
        )}
        {icon && iconType === "FontAwesome5" ? (
          <FontAwesome5 name={icon} size={iconSize} color={textColor} />
        ) : (
          <AntDesign name={icon} size={iconSize} color={textColor} />
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
        height: adaptToHeight(.08),
    },
    text: {
        color: "white",
        fontSize: sizes.input,
        textTransform: "capitalize",
        fontWeight: "bold",
        textAlign: "center",

    },
})

export default BasicButton;
