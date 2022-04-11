import { FlatList, StyleSheet, View, Image } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import ProfileContext from "../../context/ProfileContext";
import Screen from "../../components/screen";
import AppText from "../../components/Text";
import colors from "../../constants/colors";
import HistoryFilter from "./components/history-filter";
import HistoryMetric from "./components/history-metric";
import { sizes } from "../../constants";
import HistoryItem from "./components/history-item";
import { AUTH_KEY, SERVER_URL } from "../../config/config";
import { imageUri } from "../../config/imageUri";
import Storage from "../../config/storage";

const HistoryScreen = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { user } = profile;
  const [token, setToken] = useState(null);

  let rides = [
    {
      distance: "5.2",
      price: "56",
      state: "Completed",
      pickup: "8745 Dwarf Village",
      dropOff: "652 Win St, New york, US",
      user: {
        name: "John doe",
        photo: "",
      },
    },
  ];
  const getToken = async () => {
    Storage.getKey(AUTH_KEY)
      .then((res) => setToken(res))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (profile.documents)
      console.log(imageUri(`${SERVER_URL}uploads/${profile.documents.photo}`));
    getToken();
  }, [JSON.stringify(profile), token]);

  return (
    <Screen
      style={{
        backgroundColor: colors.light,
      }}
    >
      <Image
        source={
          profile.documents
            ? imageUri(`${SERVER_URL}uploads/${profile.documents.photo}`, token)
            : { uri: "" }
        }
        style={{ width: 150, height: 150 }}
      />
      <View style={{ flex: 0.2 }}>
        <AppText style={styles.filterLabel}>Sort By</AppText>
        <HistoryFilter />
      </View>
      <View style={{ flex: 0.2 }}>
        <HistoryMetric user={user} />
      </View>
      <View style={{ flex: 0.6 }}>
        {user && user.rides && !user.rides.length ? (
          <FlatList
            data={rides}
            renderItem={({ item }) => <HistoryItem item={item} />}
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
};

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
