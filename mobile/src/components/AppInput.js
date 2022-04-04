import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../constants";
import sizes from "../constants/sizes";

function AppTextInput({
  icon,
  width = "100%",
  styleView,
  color = colors.primary,
  ...otherProps
}) {
  return (
    <View style={[styles.container, { width }, styleView]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={sizes.icon}
          color={color}
        />
      )}
      <TextInput style={{paddingHorizontal: sizes.tiny}} placeholderTextColor={colors.medium} {...otherProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: sizes.radius,
    padding: sizes.padding,
    flexDirection: "row",
    marginBottom: sizes.margin,
  },
});

export default AppTextInput;
