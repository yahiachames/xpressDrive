import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import AppText from "../Text";
import ListItemSeparator from "./list/ListItemSep";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";
import BarNavSVG from "../../../assets/BarDestNav.svg";
import { colors } from "../../constants";

const BarNavCmpt = (origin, dest) => {
  const location = useSelector((state) => state.location);
  return (
    <View>
      <View
        style={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
          marginBottom: adaptToHeight(0.03),
          marginRight: adaptToHeight(0.025),
        }}
      >
        <View
          style={{
            width: "85%",
            alignSelf: "flex-end",
            height: adaptToHeight(0.15),
          }}
        >
          <AppText style={styles.textStyle} numberOfLines={2}>
            {location.currentPoint.street}
          </AppText>
          <ListItemSeparator />
          <AppText style={styles.textStyle} numberOfLines={2}>
            {location.destination.street}
          </AppText>
        </View>
        <View
          style={{
            position: "absolute",
            height: adaptToHeight(0.5),
            marginLeft: adaptToWidth(0.03),
          }}
        >
          <BarNavSVG
            height={adaptToHeight(0.115)}
            width={adaptToWidth(0.055)}
          />
        </View>
      </View>
    </View>
  );
};

export default BarNavCmpt;

const styles = StyleSheet.create({
  textStyle: {
    textAlign: "center",
    fontSize: adaptToHeight(0.02),
    padding: adaptToHeight(0.015),
    fontWeight: "bold",
    color: colors.dark,
  },
});
