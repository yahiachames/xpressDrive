import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { adaptToHeight, adaptToWidth } from "../config/dimensions";
import { colors } from "../constants";
import NavOptions from "../components/nav-options";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { Card } from "react-native-elements";
import Map from "../components/Map";
import CustomCarousel from "../components/CustomCarousel";
import CustomChooseDest from "../components/CustomChooseDest";
import * as Location from "expo-location";

const { width: windowWidth } = Dimensions.get("window");

const HomeScreen = () => {
  const [location, setLocation] = useState(null);
  const ref = React.useRef(null);
  const getlocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });
      setLocation(location);
    } catch (e) {
      console.log(e);
    }
  };
  console.log(location);

  useEffect(() => {
    getlocation();
  }, []);

  return (
    <View style={styles.container}>
      <Map />
      <CustomChooseDest />
      <CustomCarousel />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    color: colors.primary,
    fontSize: adaptToWidth(0.07),
    fontFamily: "latoBold",
    marginBottom: adaptToHeight(0.1),
  },
  bgi: {
    width: 200,
    height: 200,
  },
});

export default HomeScreen;
