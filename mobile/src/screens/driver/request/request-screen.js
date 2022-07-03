import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "../../../components/screen";
import { colors, sizes } from "../../../constants";
import RequestItem from "./components/request-Item";
import * as Notifcations from "expo-notifications";
import AuthContext from "../../../context/AuthContext";
import { getDrivers, getRidesPending } from "../../../controllers/DriversAPis";
import SocketContext from "../../../context/SocketContext";
import { acceptRide, declineRide } from "../../../controllers/rideApis";
import AppText from "../../../components/custom-text";
import { useSelector } from "react-redux";

const RequestScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthContext);
  const [pendingRides, setPendingRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const { socket, setSocket } = useContext(SocketContext);
  const user_id = user.profile.user._id;
  const driver_location = useSelector((state) => state.location.currentPoint);
  const driver_position = {
    latitude: driver_location?.latitude,
    longitude: driver_location?.longitude,
    text: driver_location?.subregion + " " + driver_location?.street,
  };

  const getApiPendingRides = () => {
    setLoading(true);
    getRidesPending(user_id)
      .then((res) => {
        if (res.ok) {
          setPendingRides([...res.data]);
        } else if (res.status == 404) {
          setPendingRides([]);
        }
      })
      .catch((e) => console.log(e));
    setLoading(false);
  };

  const handleAccept = (id) => {
    acceptRide(id, driver_position)
      .then((res) => {
        getApiPendingRides();
      })
      .catch((e) => console.log(e));
  };

  const handleDecline = (id) => {
    declineRide(id, driver_position)
      .then((res) => {
        getApiPendingRides();
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    console.log(driver_location);
    getApiPendingRides();
  }, [JSON.stringify(pendingRides)]);

  useEffect(() => {
    socket.on("NewRequest", () => {
      getApiPendingRides();
      Notifcations.scheduleNotificationAsync({
        content: {
          title: "a new pending request !",
          body: "test",
          // sound: 'default',
        },
        trigger: {
          seconds: 1,
          repeats: false,
        },
      });
    });

    socket.on("RideCancel", () => {
      getApiPendingRides();
    });

    return () => {
      socket.off("NewRequest", () => {
        getApiPendingRides();
      });
      socket.off("RideCancel", () => {
        getApiPendingRides();
      });
    };
  }, [socket]);
  if (loading) {
    return <Text>Loading ...</Text>;
  } else {
    if (pendingRides.length == 0) {
      return (
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppText style={{ color: colors.greyMedium }}>No rides found</AppText>
        </View>
      );
    } else {
      return (
        <Screen>
          <FlatList
            data={pendingRides}
            keyExtractor={({ index, item }) => {
              return index;
            }}
            renderItem={({ item }) => (
              <RequestItem
                fullItem={item}
                distance_per_km={item.distance_per_km}
                id={item._id}
                total_price={item.total_price}
                username={item.rider_id.username}
                currentPoint={item.currentPoint.text}
                destination={item.destination.text}
                onAccept={handleAccept}
                onDecline={handleDecline}
                navigation={navigation}
              />
            )}
          />
        </Screen>
      );
    }
  }
};

export default RequestScreen;

const styles = StyleSheet.create({
  alert: {
    backgroundColor: colors.secondary,
    padding: sizes.padding * 1.2,
    color: colors.black,
    fontFamily: "latoBold",
    fontSize: sizes.h5,
  },
});
