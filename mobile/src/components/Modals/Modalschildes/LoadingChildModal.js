import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { adaptToHeight } from "../../../config/dimensions";
import { colors } from "../../../constants";

function LoadingChildModal({ visible = false, message = "hello" }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size={adaptToHeight(0.08)} color={colors.blue} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    paddingTop: adaptToHeight(0.03),
    color: colors.grey,
    fontSize: adaptToHeight(0.03),
  },
  loading: {
    height: 150,
    fontSize: 30,
    width: 150,
  },
});

export default LoadingChildModal;
