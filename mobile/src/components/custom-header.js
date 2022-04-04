import { Fontisto } from "@expo/vector-icons";
import { colors, sizes } from "../constants";
import { StyleSheet, Text, View } from "react-native";
import * as React from "react";

const CustomHeader = ({ title = "", navigation, children, goBack = false }) => {
  return (
    <View style={styles.header}>
      {goBack ? (
        <Fontisto
          name="angle-left"
          size={sizes.h4}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <Fontisto
          name="nav-icon-a"
          size={sizes.h3}
          color={colors.black}
          onPress={() => navigation.openDrawer()}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    padding: sizes.padding * 1.5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
  },
  title: {
    fontFamily: "latoBold",
    fontSize: sizes.h4,
    color: colors.black,
  },
});
