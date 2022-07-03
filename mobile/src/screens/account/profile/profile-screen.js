import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useContext, useEffect } from "react";
import Screen from "../../../components/screen";
import { colors, images, sizes } from "../../../constants";
import { adaptToHeight, adaptToWidth } from "../../../config/dimensions";
import AuthContext from "../../../context/AuthContext";
import useImage from "../../../hooks/useImage";
import { SERVER_URL } from "../../../config/config";

const { defaultUser } = images;

const ProfileScreen = () => {
  const { user, setUser } = useContext(AuthContext);

  const currentUser = user.profile.user;
  const currentDocuments = user.profile.documents;
  const img = useImage(currentDocuments.photo);

  const items = [
    {
      label: "Full name",
      value:
        currentUser && currentUser.fullName ? currentUser.fullName : "Unknown",
    },
    {
      label: "Phone number",
      value: currentUser ? currentUser.phone : "",
    },
    {
      label: "Email",
      value: currentUser && currentUser.email ? currentUser.email : "",
    },
    {
      label: "Gender",
      value: currentUser && currentUser.gender ? currentUser.gender : "Not set",
    },
    {
      label: "Birthday",
      value:
        currentUser && currentUser.birthday ? currentUser.birthday : "Not set",
    },
  ];

  useEffect(() => {
    console.log(img, "image");
  }, [img]);

  if (currentUser)
    return (
      <Screen>
        <View style={styles.user}>
          <Image
            source={
              currentDocuments?.photo
                ? { uri: SERVER_URL + "uploads/" + currentDocuments.photo }
                : defaultUser
            }
            style={styles.avatar}
          />
          <View>
            <Text style={styles.name}>
              {currentUser?.username ? currentUser.fullname : "Unknown"}
            </Text>
            <Text style={styles.rank}>
              {currentUser?.rank ? currentUser.rank : "Unranked"}
            </Text>
          </View>
        </View>
        <View style={styles.details}>
          <Text style={styles.title}>Information</Text>
          <FlatList
            data={items}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              return (
                <View style={styles.item} key={index}>
                  <Text style={styles.label}>{item.label}</Text>
                  <Text style={styles.value}>{item.value}</Text>
                </View>
              );
            }}
          />
        </View>
      </Screen>
    );
  else return <View />;
};

export default ProfileScreen;

const styles = StyleSheet.create({
  avatar: {
    height: adaptToWidth(0.25),
    width: adaptToWidth(0.25),
    borderRadius: 40,
    borderColor: colors.greyLight,
    borderWidth: 0.7,
  },
  name: {
    fontFamily: "latoBold",
    fontSize: sizes.h4,
    color: colors.black,
    marginVertical: sizes.tiny,
  },
  rank: {
    fontFamily: "latoBold",
    fontSize: sizes.h6,
    color: colors.grey,
  },
  user: {
    flex: 0.4,
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 0.7,
  },
  details: {
    flex: 0.6,
    backgroundColor: colors.light,
  },
  title: {
    marginVertical: sizes.margin * 1.5,
    color: colors.greyMedium,
    fontSize: sizes.h6,
    paddingHorizontal: sizes.padding,
    fontFamily: "latoBold",
    textTransform: "uppercase",
  },
  label: {
    color: colors.black,
    fontSize: sizes.h6,
    fontFamily: "latoRegular",
  },
  value: {
    color: colors.greyMedium,
    fontSize: sizes.h6,
    fontFamily: "latoBold",
  },
  item: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    borderBottomColor: colors.greyLight,
    borderBottomWidth: 0.7,
    flexDirection: "row",
    padding: sizes.padding,
  },
});
