import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "../../../components/screen";
import { colors, sizes } from "../../../constants";
import RequestItem from "./components/requestItem";
import * as Notifcations from "expo-notifications";
import AuthContext from "../../../context/AuthContext";
import { getDrivers, getRidesPending } from "../../../controllers/DriversAPis";
import SocketContext from "../../../context/SocketContext";
import { acceptRide, declineRide } from "../../../controllers/rideApis";

const RequestScreen = () => {
  const { user, setUser } = useContext(AuthContext);
  const [pendingRides, setPendingRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const { socket, setSocket } = useContext(SocketContext);

  const getApiPendingRides = () => {
    console.log("executed", user.user_id);
    setLoading(true);
    getRidesPending(user.user_id)
      .then((res) => {
        console.log(res, user.user_id, "get pending rides");
        setPendingRides(res.data);
      })
      .catch((e) => console.log(e));
    setLoading(false);
  };

  const handleAccept = (id) => {
    console.log(id);
    acceptRide(id)
      .then((res) => {
        console.log(res);
        getApiPendingRides();
      })
      .catch((e) => console.log(e));
  };

  const handleDecline = (id) => {
    console.log(id);
    declineRide(id)
      .then((res) => {
        console.log(res);
        getApiPendingRides();
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    getApiPendingRides();
  }, []);

  useEffect(() => {
    socket.on("NewRequest", () => {
      console.log("new request pendinbg");
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
        console.log("new request pendinbg");
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
    return (
      <Screen>
        <Text style={styles.alert}>You have 10 new requests.</Text>
        <FlatList
          data={pendingRides}
          keyExtractor={({ index, item }) => {
            console.log(index);
            return index;
          }}
          renderItem={({ item }) => (
            <RequestItem
              distance_per_km={item.distance_per_km}
              id={item._id}
              total_price={item.total_price}
              username={item.rider_id.username}
              currentPoint={item.currentPoint.text}
              destination={item.destination.text}
              onAccept={handleAccept}
              onDecline={handleDecline}
            />
          )}
        />
      </Screen>
    );
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
