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

import MapComponent from "../../components/MapComponent";
import { colors, parameters } from "../../global/styles.js";
import { rideData } from "../../global/data";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "../../components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";
import { getDrivers } from "../../controllers/userApis";
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
  const id = user.sub;
  const locationstate = useSelector((state) => state.location);
  const RideId = useSelector((state) => state.RideId.id);

  const dispatch = useDispatch();
  const [rideStatus, setRideStatus] = useState("pending");

  socket.on("connection", (obj) => {
    console.log("client connected");
  });
  socket.on("updatedSatatus", (status) =>
    console.log(status, "status updated")
  );
  socket.on("locationUpdate", (obj) => {
    getDriversAPi();
  });
  socket.on("join", (obj) => {
    getDriversAPi();
  });
  socket.on("deconnect", (obj) => {
    getDriversAPi();
  });

  const getDriversAPi = async () => {
    getDrivers()
      .then((res) => setDrivers(res.data))
      .catch((e) => console.log(e));
  };

  const createRideApi = async () => {
    createRide({
      currentPoint: {
        latitude: locationstate.currentPoint["latitude"],
        longitude: locationstate.currentPoint["longitude"],
      },
      destination: {
        latitude: locationstate.destination["latitude"],
        longitude: locationstate.destination["longitude"],
      },
      driver_id: driver_id,
      rider_id: id,
      distance: 6,
      total_price: 12,
    })
      .then((res) => {
        checkStatus(res.data.data)
          .then((res2) => dispatch(setRideId(res.data.data)))
          .catch((e) => console.log(e));
      })
      .catch((e) => console.log(e));
  };

  // if (rideStatus == "pending") {
  //   setInterval(() => {
  //     console.log(RideId);
  //     checkStatus(RideId)
  //       .then((res) => {
  //         setRideStatus(res.data.status);
  //         console.log("ride status", rideStatus);
  //       })
  //       .catch((e) => console.log(e));
  //   }, 200000);
  // }
  useEffect(() => {
    bottomsheet1?.current?.scrollTo(-adaptToHeight(0.55));
  }, [isActive]);

  useEffect(() => {
    setLoading(true);
    getDriversAPi();
    setLoading(false);
  }, []);

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
  const handleSheetChanges = useCallback((index) => {
    console.log("handleSheetChanges", index);
  }, []);

  const renderFlatListItems = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setDriver_id(item.id);
          handleToggleModal(true);
        }}
      >
        <View>
          <View style={styles.view10}>
            <View style={styles.view11}>
              <Icon
                type="material-community"
                name="account"
                color={colors.white}
                size={18}
              />
            </View>
            <View>
              <Text style={{ fontSize: 15, color: colors.grey1 }}>
                {item.username}
              </Text>
              <Text style={{ color: colors.grey4 }}>{item.area}</Text>
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
    if (drivers.length == 0) {
      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            {/* <AppButton
              title="test"
              styleCOntainer={styles.btnModal}
              styleText={styles.textBtnModal}
              onPress={async () => {
                await updateStatus(RideId, "started");
              }}
            /> */}
            <MapCustom
              userOrigin={{
                latitude: locationstate.currentPoint["latitude"],
                longitude: locationstate.currentPoint["longitude"],
              }}
              userDestination={{
                latitude: locationstate.destination["latitude"],
                longitude: locationstate.destination["longitude"],
              }}
            />
            <BottomSheet ref={bottomsheet1}>
              <Text>No Drivers</Text>
            </BottomSheet>

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
          </View>
        </GestureHandlerRootView>
      );
    } else {
      return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.container}>
            <AppButton
              title="test"
              styleCOntainer={styles.btnModal}
              styleText={styles.textBtnModal}
              onPress={async () => {
                await updateStatus(RideId, "started");
              }}
            />
            <BottomSheet ref={bottomsheet1}>
              <FlatList
                keyboardShouldPersistTaps="always"
                data={drivers}
                keyExtractor={(item) => item.id}
                renderItem={renderFlatListItems}
                contentContainerStyle={styles.contentContainer}
              />
            </BottomSheet>

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
          </View>
        </GestureHandlerRootView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container1: { flex: 1, paddingTop: parameters.statusBarHeight },
  Modalcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
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
    flex: 1,
    alignItems: "center",
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
  },
});
