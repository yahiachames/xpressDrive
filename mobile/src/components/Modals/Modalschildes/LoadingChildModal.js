import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { adaptToHeight } from "../../../config/dimensions";
import { colors } from "../../../constants";

function LoadingChildModal({ visible = false, message = "hello" }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator autoPlay loop style={styles.loading} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    padding: adaptToHeight(0.04),
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    padding: adaptToHeight(0.02),
    fontSize: adaptToHeight(0.04),
    color: colors.grey,
  },
  loading: {
    position: "absolute",

    height: "50%",

    width: "100%",
    zIndex: 1,
  },
});

export default LoadingChildModal;
