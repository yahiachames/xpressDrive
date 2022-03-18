import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { colors } from "../constants";

function AppButton({
  title,
  onPress,
  color = "primary",
  styleCOntainer,
  styleText,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: colors[color] },
        styleCOntainer,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, styleText]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    width: "100%",
    marginVertical: 10,
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

export default AppButton;
