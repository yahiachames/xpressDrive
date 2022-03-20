import React, { useState, useEffect, useContext } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import BasicButton from "../../components/basic-button";
import storage from "../../config/storage";
import { AUTH_KEY, SERVER_URL } from "../../config/config";
import { geocodeLoc } from "../../utility/LocationUtility";
import { setLocation } from "../../redux/actions/location-actions";
import { updateLocation } from "../../controllers/userApis";
import { io } from "socket.io-client";
import NetInfo from "@react-native-community/netinfo";
import { logout } from "../../redux/actions/auth-actions";
import AuthContext from "../../context/AuthContext";

const HomeScreen = ({ navigation }) => {
  const socket = io(SERVER_URL);
  const { user, setUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  const id_user = user.sub;

  NetInfo.addEventListener((state) => {
    console.log(state, "statteeeeeeeeee infooooooooo");
    if (state.isConnected) {
      console.log("join");
      socket.emit("join", { id_user: user.sub, role: "driver" });
    } else {
      console.log("deconnect");
      socket.emit("deconnect", { id_user: user.sub, role: "driver" });
    }
  });
  const getlocation = async () => {
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      },
      (resLocation) => {
        geocodeLoc(
          resLocation.coords.latitude,
          resLocation.coords.longitude
        ).then((resGeocode) => {
          let address = resGeocode.data.address;
          updateLocation({
            latitude: resLocation.coords.latitude,
            longitude: resLocation.coords.longitude,
            id: id_user,
          })
            .then((res) => {
              dispatch(
                setLocation({
                  latitude: resLocation.coords.latitude,
                  longitude: resLocation.coords.longitude,
                  region: address.state,
                  subregion: address.county,
                  street: address.road ? address.road : address.village,
                  code_postale: address.postcode,
                })
              );
            })
            .catch((e) => console.log("update location failed with error ", e));
        });
      }
    );
  };

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
        onPress={() => {
          socket.emit("deconnect", { id_user: user.sub });
          dispatch(logout);
          storage.removeKey(AUTH_KEY);
          setUser(null);
        }}
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
