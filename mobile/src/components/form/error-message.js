import React from "react";
import {StyleSheet, Text} from "react-native";
import {colors, sizes} from "../../constants";

function ErrorMessage({ error, visible, style }) {
  if (!visible || !error) return null;
  return <Text style={[style, styles.error]}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    paddingTop: sizes.base,
    color: colors.danger,
  },
});

export default ErrorMessage;
