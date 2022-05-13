import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {AntDesign} from "@expo/vector-icons";
import {colors, images, sizes} from "../../../../constants";
import {adaptToHeight, adaptToWidth} from "../../../../config/dimensions";

const indicators = [
    {icon: "clockcircleo", value: "0", label: "Hours Online"},
    {icon: "linechart", value: "0 KM", label: "Total Distance"},
    {icon: "book", value: "0", label: "Total Jobs"}
]



const { defaultUser } = images;

const indicator = ({ item }) => {
  return (
    <View style={styles.stats}>
      <AntDesign
        name={item.icon}
        size={sizes.icon * 1.5}
        color={colors.white}
      />
      <Text style={styles.value}>{item.value}</Text>
      <Text style={[styles.label, { textTransform: "uppercase" }]}>
        {item.label}
      </Text>
    </View>
  );
};

const InfoPanel = ({ profile }) => {
  const { user } = profile;
  const img = useImage(profile.documents.photo);
  let total = 0;
  if (profile?.user) {
    let { rides } = user;
    if (rides) {
      rides = rides.filter((el) => el.done);
      const minutes = rides.reduce(
        (previousValue, currentValue) =>
          previousValue.timestamp_per_minute + currentValue.timestamp_per_minut,
        0
      );
      let hours = minutes ? minutes / 60 : 0;
      const distance = rides.reduce(
        (previousValue, currentValue) =>
          previousValue.distance_per_km + currentValue.distance_per_km,
        0
      );
      total = rides.reduce(
        (previousValue, currentValue) =>
          previousValue.total_price + currentValue.total_price,
        0
      );
      indicators[0].value = hours;
      indicators[1].value = distance + " KM";
      indicators[2].value = rides.length;
    }
  }
  return (
    <View style={styles.box}>
      <View style={styles.boxHeader}>
        <View style={styles.userInfo}>
          <Image
            source={profile?.documents?.photo ? img : defaultUser}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.textPrimary}>
              {profile?.user?.username ? user.username : "Unknown"}
            </Text>
            <Text style={styles.textSecondary}>
              {profile?.user?.rank ? user.rank : "Unranked"}
            </Text>
          </View>
        </View>
        <View
          style={{
            marginBottom: sizes.margin,
          }}
        >
          <Text style={styles.textPrimary}>{total}</Text>
          <Text style={[styles.textSecondary, { alignSelf: "flex-end" }]}>
            Earned
          </Text>
        </View>
      </View>
      <View style={styles.boxFooter}>
        <FlatList
          key={"#"}
          data={indicators}
          renderItem={indicator}
          numColumns={3}
          _keyExtractor={(item, index) => item.key}
        />
      </View>
    </View>
  );
};

export default InfoPanel;

const styles = StyleSheet.create({
    box: {
        flex: 1,
        backgroundColor: colors.white,
        padding: sizes.padding,
    },
    boxHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: adaptToWidth(.025),
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: sizes.margin * 2,
    },
    avatar: {
        height: adaptToWidth(.15),
        width: adaptToWidth(.15),
        borderRadius: 40,
        borderWidth: 2,
        borderColor: colors.primary,
        marginRight: sizes.margin
    },
    textPrimary: {
        fontFamily: 'latoBold',
        fontSize: sizes.h4,
        color: colors.black
    },
    textSecondary: {
        fontFamily: 'latoBold',
        fontSize: sizes.h5,
        color: colors.grey
    },
    boxFooter: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: adaptToHeight(.025),
        paddingHorizontal: adaptToWidth(.025),
        backgroundColor: colors.primary,
        borderRadius: 5,
    },
    stats: {
        alignItems: "center",
        flex: 1
    },
    value: {
        fontFamily: 'latoBold',
        fontSize: sizes.h4,
        color: colors.black,
        paddingVertical: sizes.padding
    },
    label: {
        fontFamily: 'latoBold',
        fontSize: sizes.h7,
        color: colors.white,
        textAlign: 'center'
    }
});
