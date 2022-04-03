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
  TouchableWithoutFeedbackBase,
  TouchableHighlight,
} from "react-native";

import { Avatar, Icon } from "react-native-elements";

import MapComponent from "../../components//chames/MapComponent";
import { colors, parameters } from "../../global/styles.js";
import { rideData } from "../../global/data";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet from "../../components/BottomSheet";
import {
  GestureHandlerRootView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";
import RequestRideModal from "../../components/Modals/RequestRideModal";
import AppText from "../../components/Text";
import AppButton from "../../components/Button";
import {
  checkStatus,
  createRide,
  DeleteRide,
  updateStatus,
} from "../../controllers/rideApis";
import { setRideId } from "../../redux/actions/RideId";
import AuthContext from "../../context/AuthContext";
import { getDrivers } from "../../controllers/DriversAPis";
import ChildModal from "../../components/Modals/Modalschildes/ChildModal";
import LoadingChildModal from "../../components/Modals/Modalschildes/LoadingChildModal";
import BarNavCmpt from "../../components/chames/BarNavCmpt";
import BasicButton from "../../components/basic-button";
import DriverChildModal from "../../components/Modals/Modalschildes/DriverChildModal";
import SocketContext from "../../context/SocketContext";

export default function RequestScreen({ navigation, route }) {
  const { socket, setSocket } = useContext(SocketContext);
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
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const [rideStatus, setRideStatus] = useState(null);

  const handleCancelDriverResponse = () => {
    DeleteRide(id).then((res) => {
      setRideStatus(null);
    });
  };

  useEffect(() => {
    socket.on("rideStatusUpdated", (obj) => {
      setRideStatus(obj);
      console.log("updated", obj);
    });

    socket.on("locationUpdate", (obj) => {
      console.log("first");
      getDriversAPi();
    });
    socket.on("onlineUpdate", () => {
      getDriversAPi();
    });

    return () => {
      socket.off("rideStatusUpdated", (obj) => {
        setRideStatus(obj);
        console.log("updated", obj);
      });

      socket.off("locationUpdate", (obj) => {
        console.log("first");
        getDriversAPi();
      });
      socket.off("onlineUpdate", () => {
        getDriversAPi();
      });
    };
  }, [socket]);

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
        if (res.data.success) {
          socket.emit("rideCreated", { user_id: id, room: res.data.data });
        }
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    bottomsheet1?.current?.scrollTo(-adaptToHeight(0.62));
  }, [isActive]);

  const handleRideStatusModal = () => {
    if (drivers == null || drivers.length == 0) {
      return <Text>No drivers</Text>;
    } else {
      if (rideStatus == null)
        return (
          <View>
            <BarNavCmpt />
            <FlatList
              data={drivers}
              keyExtractor={(item, index) => {
                return index;
              }}
              renderItem={renderFlatListItems}
              contentContainerStyle={styles.contentContainer}
            />
            <BasicButton
              title="Book"
              onPress={async () => {
                handleToggleModal(false);

                createRideApi();
              }}
              style={{
                width: adaptToWidth(0.6),
                height: adaptToHeight(0.06),
                position: "absolute",
                top: adaptToHeight(0.45),
                alignSelf: "center",
              }}
              bgColor={colors.blueSelect}
            />
          </View>
        );
      else if (rideStatus == "pending")
        return (
          <LoadingChildModal
            visible={true}
            message="waiting for driver response..."
            onPress={() => handleCancelDriverResponse()}
          />
        );
      else if (rideStatus == "started")
        return (
          <ChildModal
            nameIcon="checkcircle"
            message="accepted by driver"
            colorIcon={colors.darkBlue}
            onPress={() => handleCancelDriverResponse()}
          />
        );
      else if (rideStatus == "refused")
        return (
          <ChildModal
            nameIcon="closecircle"
            message="refused by driver"
            colorIcon={colors.danger}
            onPress={() => handleCancelDriverResponse()}
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
      <TouchableWithoutFeedback
        onPress={() => {
          setDriver_id(item._id);

          setSelected(item._id);
        }}
        onLongPress={() => {
          handleToggleModal(true);
        }}
      >
        <View
          style={[
            styles.itemFlatContainer,
            {
              backgroundColor:
                selected == item._id ? colors.blueSelect : colors.white,
            },
          ]}
        >
          <Image
            source={require("../../../assets/taxi1.jpg")}
            style={styles.itemIconBox}
          />

          <View style={styles.itemTextBox}>
            <AppText
              style={[
                styles.ItemFlatTitleBox,
                { color: selected == item._id ? colors.white : colors.grey3 },
              ]}
            >
              Shared
            </AppText>
            <AppText
              style={[
                styles.itemdescFlat,
                { color: selected == item._id ? colors.white : colors.grey1 },
              ]}
            >
              25TND
            </AppText>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
          height="50%"
          child={
            <DriverChildModal onPressCancel={() => handleToggleModal(false)} />
          }
          styleModal={{ height: "20%" }}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container1: { flex: 1, paddingTop: parameters.statusBarHeight },
  Modalcontainer: {
    height: "40%",
  },
  MapView: {
    width: adaptToWidth(1),
    height: adaptToHeight(1),
    zIndex: 1,
  },
  BottomsheetView: {},
  itemFlatContainer: {
    padding: adaptToHeight(0.01),

    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-around",
    width: adaptToWidth(0.31),
    height: adaptToHeight(0.2),
    borderWidth: 1,
    borderColor: colors.grey,
    borderRadius: adaptToHeight(0.02),
    shadowColor: colors.grey1,
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  itemTextBox: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    justifyContent: "space-between",

    width: "80%",
  },
  itemIconBox: {
    width: adaptToWidth(0.3),
    height: adaptToHeight(0.1),
    alignItems: "center",
    justifyContent: "center",
  },
  ItemFlatTitleBox: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.grey2,
  },
  ItemFlatDescBox: {
    fontSize: 16,

    color: colors.grey2,
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
    width: adaptToWidth(1),
    flexDirection: "row",
    justifyContent: "space-around",
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
