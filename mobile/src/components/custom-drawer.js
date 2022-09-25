import React, {useContext} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {DrawerContentScrollView, DrawerItemList,} from "@react-navigation/drawer";
import {colors, images, sizes} from "../constants";
import {Ionicons} from "@expo/vector-icons";
import AuthContext from "../context/AuthContext";
import {adaptToWidth} from "../config/dimensions";
import useAuth from "../hooks/useAuth";
import useImage from "../hooks/useImage";
import routes from "../navigation/routes";
import AppText from "./custom-text";
import { SERVER_URL } from "../config/config";

const { defaultUser } = images;

const CustomDrawer = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const { profile } = user;
  const { logOut } = useAuth();
  const img = SERVER_URL + "uploads/" + profile.documents.photo;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: colors.primary }}
      >
        <View style={styles.header}>
          <View style={styles.user}>
            <Image
              source={profile?.documents?.photo ? { uri: img } : defaultUser}
              style={styles.avatar}
            />
            <View style={{ justifyContent: "center" }}>
              <AppText style={styles.name}>
                {profile?.user?.username ? profile.user.username : "Unknown"}
              </AppText>
              <View style={styles.rankContainer}>
                <Ionicons
                  name="star"
                  size={sizes.icon}
                  color={colors.secondary}
                />
                <AppText style={styles.rank}>
                  {profile?.user?.rank ? profile.user.rank : "Unranked"}
                </AppText>
              </View>
            </View>
          </View>
          <View style={styles.stats}></View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: colors.white,
            paddingTop: sizes.padding,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          padding: sizes.padding,
          borderTopWidth: 1,
          borderTopColor: colors.greyLight,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            const { navigation } = props;
            navigation.navigate(routes.INVITE_FRIENDS);
          }}
          style={{ paddingVertical: sizes.padding }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="share-social-outline" size={sizes.icon} />
            <AppText style={styles.action}>Invite Friends</AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            logOut();
          }}
          style={{ paddingVertical: sizes.padding }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons name="exit-outline" size={sizes.icon * 1.2} />
            <AppText style={styles.action}>Logout</AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    header: {
        padding: sizes.padding,
        backgroundColor: colors.primary,
    },
    user: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    avatar: {
        height: adaptToWidth(0.2),
        width: adaptToWidth(0.2),
        borderRadius: 40,
        marginBottom: sizes.margin,
        borderWidth: 2,
        borderColor: colors.white,
    },
    name: {
        color: colors.white,
        fontSize: sizes.h4,
        fontFamily: "latoMedium",
        marginBottom: sizes.margin,
    },
    rankContainer: {
        backgroundColor: colors.white,
        borderRadius: sizes.radius * 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: sizes.tiny,
        paddingHorizontal: sizes.base,
    },
    rank: {
        color: colors.secondary,
        fontSize: sizes.h6,
        fontFamily: "latoBold",
    },
    stats: {},
    action: {
        fontSize: sizes.h6,
        fontFamily: "latoBold",
        marginLeft: sizes.base,
        color: colors.grey,
    },
});
