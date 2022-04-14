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
import useImage from "../../hooks/useImage";
import AuthContext from "../../context/AuthContext";

const HistoryScreen = () => {
  const { user, setUser } = useContext(AuthContext);
  const { profile } = user;
  const currentUser = profile.user;
  const currentDocument = profile.documents;
  const [token, setToken] = useState(null);
  const img = useImage(currentDocument.photo);

  // useEffect(() => {}, [img]);
  console.log(currentDocument);
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

  return (
    <Screen
      style={{
        backgroundColor: colors.light,
      }}
    >
      <View style={{ flex: 0.2 }}>
        <AppText style={styles.filterLabel}>Sort By</AppText>
        <HistoryFilter />
      </View>
      <View style={{ flex: 0.2 }}>
        <HistoryMetric user={currentUser} />
      </View>
      <View style={{ flex: 0.6 }}>
        {currentUser && currentUser.rides && !currentUser.rides.length ? (
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
