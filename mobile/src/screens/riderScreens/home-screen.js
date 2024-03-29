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
import ChoseDestCmpt from "../../components/chames/chooseDestcmpt";
import MapCustom from "../../components/chames/MapCustom";
import { useDispatch, useSelector } from "react-redux";
import { geocodeLoc } from "../../utility/LocationUtility";
import { setLocation } from "../../redux/actions/location-actions";
import SocketContext from "../../context/SocketContext";
import AuthContext from "../../context/AuthContext";


const HomeScreen = ({ navigation }) => {
  const { socket, setSocket } = useContext(SocketContext);

  const { user, setUser } = useContext(AuthContext);
  const id = user.profile.user._id;
  const dispatch = useDispatch();

  const origin = useSelector((state) => state.location.currentPoint);

  useEffect(() => {
    console.log(id, "executed useeffect and id");

    console.log("executed connect and joined");
    socket.emit("joined", { username: id, room: id });
  }, []);

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("joined", { username: user.user_id, room: user.user_id });
    });
    socket.on("disconnect", () => {
      socket.emit("deconnect", { id_user: user.user_id, role: user.role });
    });
    return () => {
      socket.off("connect", () => {
        socket.emit("joined", { username: user.user_id, room: user.user_id });
      });
      socket.off("disconnect", () => {
        socket.emit("deconnect", { id_user: user.user_id, role: user.role });
      });
    };
  }, [socket]);

  const getlocation = () => {
    Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      },
      (resLocation) =>
        setTimeout(() => {
          geocodeLoc(resLocation.coords.latitude, resLocation.coords.longitude)
            .then((resGeocode) => {
              let address = resGeocode.data.address;
              if (resGeocode.data.display_name !== undefined) {
                dispatch(
                  setLocation({
                    latitude: resLocation.coords.latitude,
                    longitude: resLocation.coords.longitude,
                    region: address.state,
                    subregion: address.county,
                    street: resGeocode.data.display_name,
                    code_postale: address.postcode,
                  })
                );
              }
            })
            .catch((e) => console.log("update location failed with error ", e));
        }, 7000)
    );
  };
  useEffect(() => {
    getlocation();
  }, []);

  return (
    <View style={styles.container}>
      <MapCustom containerStyle={styles.mapContainer} origin={origin} />
      <View style={styles.chosedestcmp}>
        <ChoseDestCmpt navigation={navigation} />
      </View>
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
    zIndex: 0,
    width: adaptToWidth(1),
    height: adaptToHeight(1),
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
    top: 100,
    left: 5,
  },
});

export default HomeScreen;
