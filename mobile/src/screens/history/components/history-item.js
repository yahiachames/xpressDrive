import {Image, StyleSheet, View} from "react-native";
import React from "react";
import AppText from "../../../components/custom-text";
import {colors, images, sizes} from "../../../constants";
import {adaptToWidth} from "../../../config/dimensions";
import moment from "moment";

const HistoryItem = ({ item, user }) => {
  const { defaultUser } = images;
  console.log(item);
  return (
    <View
      style={{
        paddingHorizontal: sizes.padding,
        paddingBottom: sizes.padding,
      }}
    >
      <View>
        <View style={styles.box}>
          <View style={styles.header}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={defaultUser} style={styles.image} />
              <View>
                <AppText
                  style={{
                    paddingHorizontal: sizes.padding,
                    fontSize: sizes.h6,
                  }}
                >
                  {user.role == "rider"
                    ? item.driver_id.username
                    : item.rider_id.username}
                </AppText>
                <AppText style={styles.badge}>{item.status}</AppText>
              </View>
            </View>
            <View style={{ alignItems: "flex-end" }}>
              <AppText style={{ fontSize: sizes.h6 }}>
                ${item.total_price}
              </AppText>
              <AppText style={{ color: colors.grey, fontSize: sizes.h7 }}>
                {item.distance_per_km} km
              </AppText>
            </View>
          </View>
          <View style={styles.body}>
            <View style={{ paddingBottom: sizes.padding }}>
              <AppText
                style={{
                  color: colors.grey,
                  fontSize: sizes.h8,
                  textTransform: "uppercase",
                  paddingBottom: sizes.tiny,
                }}
              >
                Driver Location
              </AppText>
              <AppText style={{ fontSize: sizes.h6 }}>
                ${item?.driver_position?.text}
              </AppText>
            </View>
            <View style={styles.divider} />
            <View style={{ paddingTop: sizes.padding }}>
              <AppText
                style={{
                  color: colors.grey,
                  fontSize: sizes.h8,
                  textTransform: "uppercase",
                  paddingBottom: sizes.tiny,
                }}
              >
                Drop Off
              </AppText>
              <AppText style={{ fontSize: sizes.h6 }}>
                ${item.destination.text}
              </AppText>
            </View>
          </View>
          <View style={styles.divider} />
          <View
            style={{
              padding: sizes.padding,

              backgroundColor: colors.white,
              justifyContent: "center",
            }}
          >
            <AppText
              style={{
                color: colors.grey,
                fontSize: sizes.h8,
                textTransform: "uppercase",
                paddingBottom: sizes.tiny,
              }}
            >
              Pick Up
            </AppText>
            <AppText style={{ fontSize: sizes.h6 }}>
              ${item.currentPoint.text}
            </AppText>
          </View>
          <View style={styles.divider} />
          <View
            style={{
              padding: sizes.padding,

              backgroundColor: colors.white,
              justifyContent: "center",
            }}
          >
            <AppText
              style={{
                color: colors.grey,
                fontSize: sizes.h8,
                textTransform: "uppercase",
                paddingBottom: sizes.tiny,
              }}
            >
              Date et heure
            </AppText>
            <AppText style={{ fontSize: sizes.h6 }}>
              ${moment(item.date).format("YYYY-MM-DD   HH:mm:ss")}
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default HistoryItem;

const styles = StyleSheet.create({
  box: {
    borderWidth: 0.4,
    borderColor: colors.greyLighter,
    elevation: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: sizes.radius,
  },
  header: {
    backgroundColor: colors.light,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: sizes.padding,
  },
  badge: {
    fontSize: sizes.h9,
    textTransform: "capitalize",
    backgroundColor: colors.primary,
    color: colors.white,
    borderRadius: sizes.radius,
    alignSelf: "center",
    paddingHorizontal: sizes.tiny / 2,
    marginTop: sizes.tiny / 2,
  },
  image: {
    borderWidth: 0.5,
    borderColor: colors.greyLight,
    borderRadius: sizes.radius,
    width: adaptToWidth(0.13),
    height: adaptToWidth(0.13),
  },
  body: {
    backgroundColor: colors.white,
    padding: sizes.padding,
  },
  divider: {
    borderBottomWidth: 0.7,
    borderBottomColor: colors.greyLight,
  },
  date_time: {
    height: 50,
    backgroundColor: colors.white,
  },
});
