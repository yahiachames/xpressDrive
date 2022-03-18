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
import { useSelector } from "react-redux";
import BottomSheet from "../../components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";
import { getDrivers } from "../../controllers/userApis";
import RequestRideModal from "../../components/Modals/RequestRideModal";
import AppText from "../../components/Text";
import AppButton from "../../components/Button";
import { createRide } from "../../controllers/rideApis";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

export default function RequestScreen({ navigation, route }) {
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
  const id = useSelector((state) => state.auth.userData.sub);
  const locationstate = useSelector((state) => state.location);

  console.log(id, locationstate, "id");

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
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

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
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
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
