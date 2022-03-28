import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  StyleSheet,
  Image,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Avatar, Icon } from "react-native-elements";

import MapComponent from "../../components//chames/MapComponent";
import { colors, parameters } from "../../global/styles.js";
import { rideData } from "../../global/data";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "../../components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";
import RequestRideModal from "../../components/Modals/RequestRideModal";
import AppText from "../../components/Text";
import AppButton from "../../components/Button";
import {
  checkStatus,
  createRide,
  updateStatus,
} from "../../controllers/rideApis";
import { setRideId } from "../../redux/actions/RideId";
import { io } from "socket.io-client";
import { API_URL, SERVER_URL } from "../../config/config";
import AuthContext from "../../context/AuthContext";
import MapCustom from "../../components/MapCustom";
import ListItemSeparator from "../../components/chames/list/ListItemSep";
import { FontAwesome } from "@expo/vector-icons";
import { getDrivers } from "../../controllers/DriversAPis";
import ChildModal from "../../components/Modals/Modalschildes/ChildModal";
import LoadingChildModal from "../../components/Modals/Modalschildes/LoadingChildModal";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function RequestScreen({ navigation, route }) {
  const socket = io(SERVER_URL);
  const location = useSelector((state) => state.location);
  const [toggleModal, handleToggleModal] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [driver_id, setDriver_id] = useState("");
  const [userOrigin, setUserOrigin] = useState({
    latitude: location.currentPoint.latitude,
    longitude: location.currentPoint.longitude,
  });
  const [userDestination, setUserDestination] = useState({
    latitude: location.destination.latitude,
    longitude: location.destination.longitude,
  });
  let isActive = bottomsheet1?.current?.isActive();
  const bottomsheet1 = useRef(null);
  const { user, setUser } = useContext(AuthContext);
  const id = user.user_id;
  const locationstate = useSelector((state) => state.location);
  const origin = useSelector((state) => state.location.currentPoint);
  const RideId = useSelector((state) => state.RideId.id);
  const dispatch = useDispatch();
  const [rideStatus, setRideStatus] = useState(null);
  socket.on("private", (obj) => {
    console.log(obj);
  });
  socket.on("connection", (obj) => {
    socket.emit("connection", id_user);
  });

  socket.on("rideStatusUpdated", (obj) => {
    setRideStatus(obj);
    console.log("updated", obj);
  });

  socket.on("locationUpdate", (obj) => {
    getDriversAPi();
  });
  socket.on("onlineUpdate", (obj) => {
    getDriversAPi();
  });

  const getDriversAPi = async () => {
    getDrivers()
      .then((res) => {
        setDrivers(res.data);
      })
      .catch((e) => console.log(e));
  };

  const createRideApi = async () => {
    createRide({
      currentPoint: {
        latitude: locationstate.currentPoint["latitude"],
        longitude: locationstate.currentPoint["longitude"],
        text: locationstate.currentPoint["street"],
      },
      destination: {
        latitude: locationstate.destination["latitude"],
        longitude: locationstate.destination["longitude"],
        text: locationstate.destination["street"],
      },
      driver_id: driver_id,
      rider_id: id,
      distance: 6,
      total_price: 12,
    })
      .then((res) => {
        dispatch(setRideId(res.data.data));
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    bottomsheet1?.current?.scrollTo(-adaptToHeight(0.35));
  }, [isActive]);

  const handleRideStatusModal = () => {
    if (drivers.length == 0) {
      return <Text>No drivers</Text>;
    } else {
      if (rideStatus == null)
        return (
          <FlatList
            data={drivers}
            keyExtractor={(item, index) => {
              return index;
            }}
            renderItem={renderFlatListItems}
            ItemSeparatorComponent={ListItemSeparator}
            contentContainerStyle={styles.contentContainer}
          />
        );
      else if (rideStatus == "pending")
        return (
          <LoadingChildModal
            visible={true}
            message="waiting for driver response..."
          />
        );
      else if (rideStatus == "started")
        return (
          <ChildModal
            nameIcon="checkcircle"
            message="accepted by driver"
            colorIcon={colors.darkBlue}
          />
        );
      else if (rideStatus == "refused")
        return (
          <ChildModal
            nameIcon="closecircle"
            message="refused by driver"
            colorIcon={colors.danger}
          />
        );
    }
  };

  useEffect(() => {
    setLoading(true);
    getDriversAPi();
    setLoading(false);
  }, []);
  useEffect(() => {
    console.log(rideStatus, "rideStatus");
  }, [rideStatus]);

  const renderFlatListItems = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setDriver_id(item._id);
          handleToggleModal(true);
        }}
      >
        <View style={styles.itemFlatContainer}>
          <View style={styles.itemIconBox}>
            <FontAwesome
              name="car"
              size={adaptToHeight(0.04)}
              color={colors.darkBlue}
            />
          </View>
          <View style={styles.itemTextBox}>
            <View style={styles.ItemFlatTitleBox}>
              <AppText style={styles.itemtitleFlat}>Just Go</AppText>
              <AppText style={styles.itemtitleFlat}>50TND</AppText>
            </View>
            <View style={styles.ItemFlatDescBox}>
              <AppText style={styles.itemdescFlat}>Near by you</AppText>
              <AppText style={styles.itemdescFlat}>2min</AppText>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  if (loading)
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  else {
    return (
      <>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={[styles.container]}>
            <MapComponent
              drivers={drivers}
              mapStyle={styles.MapView}
              origin={origin}
            />

            <BottomSheet ref={bottomsheet1}>
              {handleRideStatusModal()}
            </BottomSheet>
          </View>
        </GestureHandlerRootView>
        <RequestRideModal
          visible={toggleModal}
          child={
            <View style={styles.Modalcontainer}>
              <AppText>accapter votre demande ?</AppText>
              <View style={styles.btnModalContainer}>
                <AppButton
                  title="confirmer"
                  styleCOntainer={styles.btnModal}
                  styleText={styles.textBtnModal}
                  onPress={async () => {
                    handleToggleModal(false);
                    socket.emit("create", RideId);
                    createRideApi();
                  }}
                />
                <AppButton
                  title="annuler"
                  styleCOntainer={styles.btnModal}
                  styleText={styles.textBtnModal}
                  onPress={() => {
                    handleToggleModal(false);
                  }}
                />
              </View>
            </View>
          }
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container1: { flex: 1, paddingTop: parameters.statusBarHeight },
  Modalcontainer: {
    flex: 1,
  },
  MapView: {
    width: adaptToWidth(1),
    height: adaptToHeight(1),
    zIndex: 1,
  },
  BottomsheetView: {},
  itemFlatContainer: {
    padding: adaptToHeight(0.01),
    flexDirection: "row",
    justifyContent: "center",
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",
    height: adaptToHeight(0.12),
  },
  itemTextBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",

    width: "80%",
  },
  itemIconBox: {
    borderRadius: adaptToWidth(0.6),
    backgroundColor: colors.grey10,
    width: "16%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ItemFlatTitleBox: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  ItemFlatDescBox: {
    width: "100%",

    flexDirection: "row",

    justifyContent: "space-between",
    alignItems: "flex-start",
    fontSize: adaptToHeight(0.5),
  },
  itemdescFlat: {
    color: colors.grey1,
    fontSize: adaptToHeight(0.02),
  },
  btnModalContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  btnModal: {
    width: adaptToWidth(0.32),
  },
  textBtnModal: {
    fontSize: 14,
  },

  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    height: 50,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: "white",
    opacity: 0.6,
  },
  contentContainer: {
    height: adaptToHeight(0.6),
  },

  view1: {
    position: "absolute",
    top: 25,
    left: 12,
    backgroundColor: colors.white,
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 2,
    zIndex: 8,
  },

  flatlist: {
    marginTop: 20,
    height: "100%",
  },
});
