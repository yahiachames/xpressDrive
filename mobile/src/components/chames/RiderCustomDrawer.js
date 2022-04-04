import React, { useContext, useEffect, useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { colors, images, sizes } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import AuthContext from "../../context/AuthContext";
import storage from "../../config/storage";
import { AUTH_KEY, SERVER_URL } from "../../config/config";
import { io } from "socket.io-client";
import CustomModal from "../Modals/custom-modal";
import ProfileChildModal from "../Modals/childs/profile-child-modal";
import { adaptToHeight } from "../../config/dimensions";
import { useSelector } from "react-redux";
import { checkKeyInObject } from "../../utility/checkKeyinObject";
import SocketContext from "../../context/SocketContext";
import ProfileContext from "../../context/ProfileContext";

const { defaultUser } = images;

const RiderCustomDrawer = (props) => {
  const { user, setUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  // const [profile, setProfile] = useState({});
  const { profile, setProfile } = useContext(ProfileContext);

  const { socket, setSocket } = useContext(SocketContext);
  const handleModal = (value) => {
    setShowModal(false);
  };

  useEffect(() => {}, [JSON.stringify(profile)]);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <CustomModal
          visible={showModal}
          child={<ProfileChildModal closeModal={handleModal} />}
        />
        <View style={styles.header}>
          <View style={styles.user}>
            <Image
              source={
                checkKeyInObject(profile, "documents")
                  ? profile.documents.photo
                    ? {
                        uri: `data:image/jpg;base64,${profile.documents.photo.data}`,
                      }
                    : defaultUser
                  : defaultUser
              }
              style={styles.avatar}
            />
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.name}>
                {profile.user ? profile.user.username : "jhon"}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
              style={{ paddingVertical: sizes.padding }}
            >
              <Text
                style={{
                  color: "dodgerblue",
                  fontSize: sizes.h3,
                  fontWeight: "bold",
                }}
              >
                Edit Profile
              </Text>
            </TouchableOpacity>
          </View>
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
        }}
      >
        <TouchableOpacity
          onPress={() => {
            socket.emit("deconnect", { id_user: user.sub });
            storage.removeKey(AUTH_KEY);
            setUser(null);
          }}
          style={{ paddingVertical: sizes.padding }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.action}>Logout</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RiderCustomDrawer;

const styles = StyleSheet.create({
  header: {
    padding: sizes.padding,
  },
  user: {
    justifyContent: "space-around",
    padding: 30,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.white,
  },
  name: {
    color: colors.black,
    fontSize: sizes.h2,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    fontWeight: "bold",
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
    fontSize: sizes.h5,
    fontFamily: "latoBold",
  },
  stats: {},
  action: {
    fontSize: sizes.h2,
    fontFamily: "latoBold",
    marginLeft: sizes.base,
    marginBottom: 20,
    color: colors.grey,
    fontWeight: "bold",
  },
});
