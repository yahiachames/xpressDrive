import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useContext,
} from "react";
import Screen from "../../../components/screen";
import InfoPanel from "./components/info-panel";
import { colors, sizes } from "../../../constants";
import { FontAwesome5 } from "@expo/vector-icons";
import { adaptToHeight } from "../../../config/dimensions";
import MapView from "react-native-maps";
import BottomSheet from "@gorhom/bottom-sheet";
import OfflineBar from "./components/offline-bar";
import * as Location from "expo-location";
import { geocodeLoc } from "../../../utility/LocationUtility";
import AuthContext from "../../../context/AuthContext";

import { useDispatch } from "react-redux";
import { setLocation } from "../../../redux/actions/location-actions";
import { updateLocation, updateOnline } from "../../../controllers/DriversAPis";
import SocketContext from "../../../context/SocketContext";


const HomeScreen = () => {
  const { socket, setSocket } = useContext(SocketContext);
  const { user, setUser } = useContext(AuthContext);

  const bottomSheet = useRef(1);
  const snapPoints = useMemo(() => ["20%", "48%"], []);
  const handleSheetChange = useCallback((index) => {}, []);
  const id_user = user.profile.user_id;
  const dispatch = useDispatch();

  const getlocation = () => {
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
          updateLocation(
            {
              latitude: resLocation.coords.latitude,
              longitude: resLocation.coords.longitude,
            },
            id_user
          )
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

  const updateOnlineApi = () => {
    updateOnline(true, id_user)
      .then((res) => {})
      .catch((e) => console.log(error));
  };

  useEffect(() => {
    getlocation();
    updateOnlineApi();
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

  return (
    <Screen>
      <View style={{ flex: 1, position: "relative" }}>
        <OfflineBar />
        <MapView style={styles.map} />
        <TouchableOpacity style={styles.location}>
          <FontAwesome5
            name={"crosshairs"}
            size={sizes.icon * 1.2}
            color={colors.black}
          />
        </TouchableOpacity>
      </View>
      <BottomSheet
        ref={bottomSheet}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <InfoPanel profile={user.profile} />
      </BottomSheet>
    </Screen>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  map: {
    width: sizes.width,
    height: sizes.height,
  },
  location: {
    position: "absolute",
    top: adaptToHeight(.53),
    right: 20,
    backgroundColor: colors.white,
    borderRadius: 40,
    padding: sizes.padding * 1.2,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: .5,
    shadowRadius: sizes.radius,
  },
});
