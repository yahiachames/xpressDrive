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
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";
import { useSelector } from "react-redux";
import { checkKeyInObject } from "../../utility/checkKeyinObject";
import SocketContext from "../../context/SocketContext";
import ProfileContext from "../../context/ProfileContext";
import Avatar from "../../../assets/avatar1.svg";
import { updateOnline } from "../../controllers/DriversAPis";

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

  useEffect(() => {
    // if (profile.documents) console.log(profile.documents.photo);
  }, [JSON.stringify(profile)]);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <CustomModal
          visible={showModal}
          child={<ProfileChildModal closeModal={handleModal} />}
          height={sizes.height}
          width={sizes.width}
        />
        <View style={styles.header}>
          <View style={styles.user}>
            <Avatar width={adaptToWidth(0.15)} height={adaptToHeight(0.15)} />
            <View style={{ justifyContent: "center" }}>
              <Text style={styles.name}>
                {profile?.user?.username ? profile.user.username : "unKnown"}
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
            updateOnline(false, user.user_id)
              .then((res) => {
                storage
                  .removeKey(AUTH_KEY)
                  .then((res) => {
                    setProfile(null);
                    setUser(null);
                  })
                  .catch((e) => console.log(e));
              })
              .catch((e) => console.log(e));
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
