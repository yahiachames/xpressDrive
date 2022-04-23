import {Image, StyleSheet, Text, View} from "react-native";
import React, { useCallback, useMemo, useRef, useEffect } from "react";
import { colors, images, sizes } from "../../constants";
import Screen from "../../components/screen";
import BottomSheet from "@gorhom/bottom-sheet";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";
import BasicButton from "../../components/basic-button";
import { useSelector } from "react-redux";
import haversine from "haversine-distance";
import SocketContext from "../../context/SocketContext";
import { Socket } from "socket.io-client";

const { defaultUser } = images;

const PickUpScreen = ({ navigation, route }) => {
  const location = useSelector((state) => state.location.currentPoint);

  const Item = route.params.fullItem;
  console.log(Item.rider_id);

  const bottomSheet = useRef(1);
  const snapPoints = useMemo(() => ["20%", "35%", "50%"], []);
  const handleSheetChange = useCallback((index) => {}, []);

  useEffect(() => {
    const intervalid = setInterval(() => {
      let distance = haversine(
        { lat: location?.latitude, lng: location?.longitude },
        {
          lat: Item?.currentPoint?.latitude,
          lng: Item?.currentPoint?.longitude,
        }
      );
      if (distance <= 70) {
        Socket.emit("DriverIsHere", { username: Item.rider_id._id });
      }
      console.log(
        haversine(
          { lat: location?.latitude, lng: location?.longitude },
          {
            lat: Item?.currentPoint?.latitude,
            lng: Item?.currentPoint?.longitude,
          }
        ),
        "distance reach "
      );
    }, 10000);
    return () => clearInterval(intervalid);
  });

  const Alert = () => {
    return (
      <Text style={styles.alert}>
        <Text style={styles.distance}>250m</Text>
        <Text> </Text>
        <Text style={styles.description}>
          Turn right at 105 William st, Chicago
        </Text>
      </Text>
    );
  };

  return (
    <Screen>
      <Alert />
      <BottomSheet
        ref={bottomSheet}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChange}
      >
        <View style={styles.header}>
          <Image source={defaultUser} style={styles.avatar} />
          <View style={{ paddingHorizontal: sizes.padding }}>
            <Text style={styles.title}>Pick up at</Text>
            <Text style={styles.address}>845 Wall St, New York</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.details}>
            <View>
              <Text style={styles.label}>EST</Text>
              <Text style={styles.value}>5 min</Text>
            </View>
            <View>
              <Text style={styles.label}>Distance</Text>
              <Text style={styles.value}>15 km</Text>
            </View>
            <View>
              <Text style={styles.label}>Fare</Text>
              <Text style={styles.value}>$35.00</Text>
            </View>
          </View>
          <View style={styles.buttonsContainer}>
            <BasicButton
              style={styles.button}
              bgColor={colors.primary}
              title={"Done"}
            />
            <View style={{ flex: 0.1 }} />
            <BasicButton
              style={styles.button}
              bgColor={colors.danger}
              title={"Cancel"}
            />
          </View>
        </View>
      </BottomSheet>
    </Screen>
  );
};

export default PickUpScreen;

const styles = StyleSheet.create({
    alert: {
        backgroundColor: colors.secondary,
        padding: sizes.padding
    },
    distance: {
        color: colors.black,
        fontSize: sizes.h5,
        fontFamily: 'latoMedium',
    },
    description: {
        color: colors.black,
        fontSize: sizes.h5,
        fontFamily: 'latoRegular',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: sizes.padding * 1.2,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.greyLight
    },
    address: {
        color: colors.black,
        fontFamily: 'latoBold',
        fontSize: sizes.h5,
    },
    title: {
        color: colors.greyMedium,
        fontFamily: 'latoBold',
        paddingBottom: sizes.tiny,
        fontSize: sizes.h5,
        textTransform: 'capitalize'
    },
    avatar: {
        borderRadius: 40,
        borderColor: colors.greyLight,
        borderWidth: .5,
        width: adaptToWidth(.13),
        height: adaptToWidth(.13)
    },
    info: {
        padding: sizes.padding * 1.2,
        backgroundColor: colors.white,
        borderBottomWidth: .7,
        borderBottomColor: colors.greyLight
    },
    details: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: sizes.padding * 1.2
    },
    label: {
        color: colors.greyMedium,
        fontFamily: 'latoRegular',
        fontSize: sizes.h5,
        marginBottom: sizes.tiny
    },
    value: {
        color: colors.black,
        fontFamily: 'latoBold',
        fontSize: sizes.h4,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        flex: .45,
    }
});
