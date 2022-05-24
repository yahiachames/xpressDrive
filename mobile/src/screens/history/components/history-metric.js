import {StyleSheet, View} from "react-native";
import React from "react";
import {colors, sizes} from "../../../constants";
import {Ionicons} from "@expo/vector-icons";
import AppText from "../../../components/custom-text";

const HistoryMetric = ({ user, rides }) => {
  let jobs = 0;
  let earned = 0;

  if (user && rides) {
    jobs = rides.length;
    rides.map((el) => (earned += el.total_price));
  }

  return (
    <View
      style={{
        flexDirection: "row",
        padding: sizes.padding,
        justifyContent: "space-between",
      }}
    >
      <View style={[styles.metricBox, { backgroundColor: colors.primary }]}>
        <Ionicons
          style={{ marginRight: sizes.margin }}
          name="car"
          size={sizes.h1 * 1.2}
          color="black"
        />
        <View style={{ alignItems: "flex-start" }}>
          <AppText
            style={{
              color: colors.white,
              fontSize: sizes.h7,
              fontFamily: "latoRegular",
            }}
          >
            Total Jobs
          </AppText>
          <AppText style={{ fontFamily: "latoMedium", marginTop: sizes.tiny }}>
            {jobs}
          </AppText>
        </View>
      </View>
      <View style={[styles.metricBox, { backgroundColor: colors.secondary }]}>
        <Ionicons
          style={{ marginRight: sizes.margin }}
          name="logo-usd"
          size={sizes.h1 * 1}
          color="black"
        />
        <View style={{ alignItems: "flex-start" }}>
          <AppText
            style={{
              color: colors.white,
              fontSize: sizes.h7,
              fontFamily: "latoRegular",
            }}
          >
            {user?.role == "rider" ? "Spent" : "Earned"}
          </AppText>
          <AppText style={{ fontFamily: "latoMedium", marginTop: sizes.tiny }}>
            ${earned}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default HistoryMetric;

const styles = StyleSheet.create({
    metricBox: {
        paddingHorizontal: sizes.padding,
        paddingVertical: sizes.padding * 1.5,
        borderRadius: sizes.radius,
        flexDirection: "row",
        width: '48%',
        alignItems: 'center'
    }
});
