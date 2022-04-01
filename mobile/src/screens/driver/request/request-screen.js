import { FlatList, ScrollView, StyleSheet, Text } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import Screen from "../../../components/screen";
import { colors, sizes } from "../../../constants";
import RequestItem from "./components/requestItem";
import { io } from "socket.io-client";
import { SERVER_URL } from "../../../config/config";
import AuthContext from "../../../context/AuthContext";
import { getDrivers, getRidesPending } from "../../../controllers/DriversAPis";

const RequestScreen = () => {
  const { user, setUser } = useContext(AuthContext);
  const [pendingRides, setPendingRides] = useState([]);
  const [loading, setLoading] = useState(false);
  const socket = io(SERVER_URL);

  socket.on("updatedSatatus", () => {
    getApiPendingRides();
  });

  const getApiPendingRides = () => {
    console.log("executed", user.user_id);
    setLoading(true);
    getRidesPending(user.user_id)
      .then((res) => {
        console.log(res, user.user_id);
        setPendingRides(res.data);
      })
      .catch((e) => console.log(e));
    setLoading(false);
  };

  useEffect(() => {
    getApiPendingRides();
  }, []);

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
              ride_id={item._id}
              total_price={item.total_price}
              username={item.rider_id.username}
              currentPoint={item.currentPoint.text}
              destination={item.destination.text}
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
    fontSize: sizes.h3,
  },
});
