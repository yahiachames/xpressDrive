import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { adaptToHeight } from "../../../config/dimensions";
import { colors } from "../../../constants";
import BasicButton from "../../basic-button";

const ChildModal = ({
  nameIcon = "checkcircle",
  sizeIcon = adaptToHeight(0.08),
  styleIcon,
  colorIcon = colors.primary,
  styleContainer,
  message = "hello",
  styleText,
  onPress,
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
      <BasicButton
        style={styles.button}
        bgColor={colors.greyLight}
        title={"Cancel"}
        onPress={onPress}
      />
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
  button: {
    width: "50%",
    marginTop: adaptToHeight(0.1),
  },
});
