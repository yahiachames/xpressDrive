import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { adaptToHeight } from "../../../config/dimensions";
import { colors } from "../../../constants";

const ChildModal = ({
  nameIcon = "checkcircle",
  sizeIcon = adaptToHeight(0.08),
  styleIcon,
  colorIcon = colors.primary,
  styleContainer,
  message = "hello",
  styleText,
}) => {
  return (
    <View style={[styles.container, styleContainer]}>
      <AntDesign
        name={nameIcon}
        size={sizeIcon}
        style={[styles.icon, styleIcon]}
        color={colorIcon}
      />
      <Text style={[styles.text, styleText]}>{message}</Text>
    </View>
  );
};

export default ChildModal;

const styles = StyleSheet.create({
  container: {
    padding: adaptToHeight(0.04),
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    padding: adaptToHeight(0.035),
    fontSize: adaptToHeight(0.04),
    color: colors.grey,
  },
});
