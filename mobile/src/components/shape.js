import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

const { width: W } = Dimensions.get("window");

const Shape = () => {
  return (
    <LinearGradient
      start={{ x: 0.8, y: 0.2 }}
      end={{ x: 0.5, y: 1.0 }}
      locations={[0.1, 0.9]}
      colors={["black", "pink"]}
      style={{
        height: 245,
        width: W - 120,
        left: 50,
        backgroundColor: "red",
        top: -85,
        borderRadius: 150,
        transform: [{ scaleX: 3 }],
      }}
    >
      <StatusBar translucent={true} backgroundColor={"transparent"} />
    </LinearGradient>
  );
};

export default Shape;

const styles = StyleSheet.create({});
