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
import useLocation from "../../../hooks/useLocation";

const HomeScreen = () => {
  const { socket, setSocket } = useContext(SocketContext);
  const { user, setUser } = useContext(AuthContext);

  const bottomSheet = useRef(1);
  const snapPoints = useMemo(() => ["20%", "48%"], []);
  const handleSheetChange = useCallback((index) => {}, []);
  const id_user = user.profile.user._id;
  const dispatch = useDispatch();
  const loc = useLocation();

  const updateOnlineApi = () => {
    updateOnline(true, id_user)
      .then((res) => {})
      .catch((e) => console.log(error));
  };

  useEffect(() => {
    updateOnlineApi();
  }, []);
  useEffect(() => {
    console.log(id_user, "executed useeffect and id");

    console.log("executed connect and joined");
    socket.emit("joined", { username: id_user, room: id_user });
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
};;;;;;;;;;

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
