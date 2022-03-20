import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Fontisto } from "@expo/vector-icons";
import { colors, sizes } from "../constants";
import { adaptToHeight } from "../config/dimensions";

const CustomRiderHeader = ({ navigation }) => {
  return (
    <View style={styles.view}>
      <Fontisto
        name="nav-icon-a"
        size={sizes.h3}
        color={colors.black}
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};

export default CustomRiderHeader;

const styles = StyleSheet.create({
  view: {
    backgroundColor: "transparent",
    padding: adaptToHeight(0.02),
    height: adaptToHeight(0.1),
    alignItems: "flex-start",
    justifyContent: "center",
  },
});
