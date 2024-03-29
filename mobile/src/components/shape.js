import { Dimensions, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { adaptToHeight, adaptToWidth } from "../config/dimensions";
import { colors } from "../constants";

const { width: W } = Dimensions.get("window");

const Shape = ({ children }) => {
  return (
    <LinearGradient
      start={{ x: 0.8, y: 0.2 }}
      end={{ x: 0.5, y: 1.0 }}
      locations={[0.1, 0.9]}
      colors={["dodgerblue", "dodgerblue"]}
      style={{
        height: adaptToHeight(0.5),
        width: adaptToWidth(0.5),
        left: adaptToWidth(0.1),
        backgroundColor: colors.black,
        top: -adaptToHeight(0.1),
        borderRadius: 180,
        transform: [{ scaleX: 3 }],
      }}
    >
      {children}
    </LinearGradient>
  );
};

export default Shape;

const styles = StyleSheet.create({});
