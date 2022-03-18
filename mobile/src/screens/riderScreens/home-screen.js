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
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";
import { colors } from "../../constants";

import * as Location from "expo-location";

import Shape from "../../components/shape";
import ChoseDestCmpt from "../../components/chooseDestcmpt";
import MapCustom from "../../components/MapCustom";
import { useSelector } from "react-redux";
import BasicButton from "../../components/basic-button";
import storage from "../../config/storage";
import { AUTH_KEY } from "../../config/config";

const HomeScreen = () => {
  let loc = useSelector((state) => state.location);
  console.log(loc, " use seletor");
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
      <Text style={styles.logo}>Xpress Drive</Text>
      <View style={styles.shapecontainer}>
        <Shape />
      </View>

      <View style={styles.chosedestcmp}>
        <ChoseDestCmpt />
      </View>
      {/* <MapCustom containerStyle={styles.mapContainer} /> */}
      <BasicButton
        width={adaptToWidth(0.3)}
        color={colors.danger}
        containerStyle={styles.btn}
        title="logout"
        onPress={() => storage.removeKey(AUTH_KEY)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    zIndex: 4,
    position: "absolute",
    borderWidth: 10,
    top: 500,
  },
  mapContainer: {
    top: -adaptToHeight(0.18),
    zIndex: 0,
  },
  shapecontainer: {
    zIndex: 1,
  },
  logo: {
    zIndex: 2,
    top: adaptToHeight(0.05),
    color: colors.gray,
    position: "absolute",
    fontSize: adaptToHeight(0.05),
    left: adaptToWidth(0.05),
    backgroundColor: colors.redLight,
    padding: adaptToHeight(0.025),
    borderBottomRightRadius: adaptToHeight(0.05),
    borderTopEndRadius: adaptToHeight(0.5),
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
  chosedestcmp: {
    zIndex: 1,
    position: "absolute",
    top: adaptToHeight(0.21),
    left: adaptToWidth(0.03),
  },
});

export default HomeScreen;
