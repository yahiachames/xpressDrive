import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { adaptToHeight } from "../../../config/dimensions";
import { colors } from "../../../constants";
import BasicButton from "../../basic-button";

function LoadingChildModal({ visible = false, message = "hello", onPress }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <ActivityIndicator size={adaptToHeight(0.08)} color={colors.blue} />
      <Text style={styles.text}>{message}</Text>
      <BasicButton
        style={styles.button}
        bgColor={colors.greyLight}
        title={"Cancel"}
        onPress={onPress}
      />
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
  button: {
    width: "50%",
    marginTop: adaptToHeight(0.1),
  },
});

export default LoadingChildModal;
