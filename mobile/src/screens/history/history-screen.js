import { FlatList, StyleSheet, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ProfileContext from "../../context/ProfileContext";
import Screen from "../../components/screen";
import colors from "../../constants/colors";
import HistoryFilter from "./components/history-filter";
import HistoryMetric from "./components/history-metric";
import { sizes } from "../../constants";
import HistoryItem from "./components/history-item";
import { AUTH_KEY, SERVER_URL } from "../../config/config";
import Storage from "../../config/storage";
import useImage from "../../hooks/useImage";
import AuthContext from "../../context/AuthContext";
import { getRidesRider } from "../../controllers/RiderAPis";
import { getRidesDriver } from "../../controllers/DriversAPis";
import AppText from "../../components/custom-text";

const HistoryScreen = () => {
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [rides, setRides] = useState(null);
  const [ridesFiltred, setRidesFiltred] = useState();
  const { profile } = user;
  const role = user.role;
  const currentUser = profile.user;
  const currentDocument = profile.documents;
  const [token, setToken] = useState(null);
  const img = useImage(currentDocument.photo);

  const getRides = () => {
    setLoading(true);
    if (role == "rider") {
      getRidesRider(profile.user._id)
        .then((res) => {
          setRides(res.data.result.rides);
          setRidesFiltred(res.data.result.rides);
        })
        .catch((e) => console.log(e));
    } else {
      getRidesDriver(profile.user._id)
        .then((res) => {
          setRides(res.data.result.rides);
          setRidesFiltred(res.data.result.rides);
        })
        .catch((e) => console.log(e));
    }
    setLoading(false);
  };

  useEffect(() => {
    getRides();
  }, []);

  const handleRidesFiltred = (values) => {
    console.log(values);
    switch (values) {
      case "ALL":
        setRidesFiltred(rides);
        break;

      case "COMPLETED":
        setRidesFiltred(rides.filter((el) => el.status == "completed"));
        break;

      case "REJECTED":
        setRidesFiltred(rides.filter((el) => el.status == "refused"));
        break;
      default:
        setRidesFiltred(rides);
    }
  };

  // let rides = [
  //   {
  //     distance: "5.2",
  //     price: "56",
  //     state: "Completed",
  //     pickup: "8745 Dwarf Village",
  //     dropOff: "652 Win St, New york, US",
  //     user: {
  //       name: "John doe",
  //       photo: "",
  //     },
  //   },
  // ];

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  } else {
    return (
      <Screen
        style={{
          backgroundColor: colors.light,
        }}
      >
        <View style={{ flex: 0.2 }}>
          <AppText style={styles.filterLabel}>Sort By</AppText>
          <HistoryFilter onChange={handleRidesFiltred} />
        </View>
        <View style={{ flex: 0.2 }}>
          <HistoryMetric user={user} rides={rides} />
        </View>
        <View style={{ flex: 0.6 }}>
          {rides?.length > 0 ? (
            <FlatList
              data={ridesFiltred}
              renderItem={({ item }) => <HistoryItem item={item} user={user} />}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AppText style={styles.empty}>No rides found</AppText>
            </View>
          )}
        </View>
      </Screen>
    );
  }
}

export default HistoryScreen;

const styles = StyleSheet.create({
  filterLabel: {
    padding: sizes.padding,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 0.5,
  },
  empty: {
    color: colors.greyMedium,
    fontFamily: "LatoRegular",
    fontSize: sizes.h6,
  },
});
