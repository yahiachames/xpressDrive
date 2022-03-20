import React from "react";
import { StyleSheet, View } from "react-native";
import { adaptToHeight } from "../../../config/dimensions";
import { colors } from "../../../constants";

function ListItemSeparator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: adaptToHeight(0.0013),
    backgroundColor: colors.greyMedium,
  },
});

export default ListItemSeparator;
