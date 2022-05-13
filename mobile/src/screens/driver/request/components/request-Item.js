import {Image, StyleSheet, Text, View} from "react-native";
import React, { useState } from "react";
import { colors, images, sizes } from "../../../../constants";
import { adaptToHeight, adaptToWidth } from "../../../../config/dimensions";
import BasicButton from "../../../../components/basic-button";
import routes from "../../../../navigation/routes";

const { defaultUser } = images;

const RequestItem = ({
  fullItem,
  id,
  username,
  total_price,
  distance_per_km,
  currentPoint,
  destination,
  ride_id,
  onAccept,
  onDecline,
  navigation,
}) => {
  console.log(
    {
      username,
      total_price,
      distance_per_km,
      currentPoint,
      destination,
      ride_id,
    },
    "from item"
  );

  // const acceptRideByDriver = () => {
  //   console.log(id);
  //   acceptRide(id)
  //     .then((res) => console.log(res))
  //     .catch((e) => console.log(e));
  // };
  // const declineRideByDriver = () => {
  //   console.log(id);
  //   declineRide(id)
  //     .then((res) => console.log(res))
  //     .catch((e) => console.log(e));
  // };

  const [loading, setLoading] = useState(false);

  if (loading) {
    return (
      <View style={{ marginBottom: sizes.margin }}>
        <View style={styles.header}>
          <View style={styles.user}>
            <Image source={defaultUser} style={styles.avatar} />
            <Text style={styles.name}>{username}</Text>
          </View>
          <View>
            <Text style={styles.amount}>${total_price}</Text>
            <Text style={styles.distance}>{distance_per_km}km</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.info}>
            <Text style={styles.action}>Pick Up</Text>
            <Text style={styles.address}>...</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.action}>Drop Off</Text>
            <Text style={styles.address}>...</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <BasicButton
              style={styles.button}
              bgColor={colors.primary}
              title={"Accept"}
              onPress={() => {
                onAccept(id);
                navigation.navigate(routes.PICK_UP);
              }}
            />
            <View style={{ flex: 0.1 }} />
            <BasicButton
              style={styles.button}
              bgColor={colors.danger}
              title={"Cancel"}
              onPress={() => onDecline(id)}
            />
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ marginBottom: sizes.margin }}>
        <View style={styles.header}>
          <View style={styles.user}>
            <Image source={defaultUser} style={styles.avatar} />
            <Text style={styles.name}>{username}</Text>
          </View>
          <View>
            <Text style={styles.amount}>${total_price}</Text>
            <Text style={styles.distance}>{distance_per_km}km</Text>
          </View>
        </View>
        <View style={styles.details}>
          <View style={styles.info}>
            <Text style={styles.action}>Pick Up</Text>
            <Text style={styles.address}>{currentPoint}</Text>
          </View>
          <View style={styles.info}>
            <Text style={styles.action}>Drop Off</Text>
            <Text style={styles.address}>{destination}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <BasicButton
              style={styles.button}
              bgColor={colors.primary}
              title={"Accept"}
              onPress={() => {
                onAccept(id);
                navigation.navigate(routes.PICK_UP, { fullItem });
              }}
            />
            <View style={{ flex: 0.1 }} />
            <BasicButton
              style={styles.button}
              bgColor={colors.danger}
              title={"Cancel"}
              onPress={() => onDecline(id)}
            />
          </View>
        </View>
      </View>
    );
  }
};

export default RequestItem;

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: sizes.padding * 1.2,
        backgroundColor: colors.light
    },
    user: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    avatar: {
        borderRadius: sizes.radius,
        width: adaptToWidth(.13),
        height: adaptToWidth(.13)
    },
    name: {
        color: colors.black,
        fontFamily: 'latoBold',
        fontSize: sizes.h5,
        marginHorizontal: sizes.margin
    },
    amount: {
        color: colors.black,
        fontFamily: 'latoBold',
        fontSize: sizes.h5,
    },
    distance: {
        color: colors.greyMedium,
        fontFamily: 'latoBold',
        fontSize: sizes.h6,
    },
    details: {
        padding: sizes.padding * 1.2,
        backgroundColor: colors.white,
    },
    info: {
        borderBottomColor: colors.greyLight,
        borderBottomWidth: .8,
        marginBottom: sizes.margin,
        paddingBottom: sizes.padding
    },
    action: {
        color: colors.greyMedium,
        fontFamily: 'latoBold',
        paddingBottom: sizes.tiny,
        fontSize: sizes.h6,
        textTransform: 'uppercase'
    },
    address: {
        color: colors.black,
        fontFamily: 'latoBold',
        fontSize: sizes.h5,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        flex: .45,
        height: adaptToHeight(.05)
    }
});
