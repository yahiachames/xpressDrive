import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {colors} from "../constants";
import {adaptToHeight, adaptToWidth} from "../config/dimensions";
import Icon from "react-native-vector-icons/FontAwesome";

const indicators = [
    { icon: "clock", value: "10.2", label: "Hours Online" },
    { icon: "dashboard", value: "30 KM", label: "Total Distance" },
    { icon: "ballot", value: "20", label: "Total Jobs" }
]

const indicator = () => {
    return (
        <View style={styles.WorkingInfo}>
            <Icon
                style={styles.SelectedIcon}
                name="dashboard"
                size={adaptToWidth(.07)}
                color={colors.greyMedium}
            />
            <Text style={styles.TextIndicator}>10.2</Text>
            <Text style={[styles.TextSecondary, {textTransform: "uppercase"}]}>Hours Online</Text>
        </View>
    )
}

const ProfileScreen = () => {
  return (
    <View style={styles.Box}>
      <View style={styles.BoxHeader}>
          <View style={styles.UserInfo}>
            <Image source={require("../../assets/images/user.png")} style={styles.Avatar} />
            <View>
                <Text style={styles.TextPrimary}>Firstname Lastname</Text>
                <Text style={styles.TextSecondary}>Level</Text>
            </View>
          </View>
          <View style={{
              marginBottom: adaptToHeight(.015),
          }}>
              <Text style={styles.TextPrimary}>$100.00</Text>
              <Text style={[styles.TextSecondary, {alignSelf: 'flex-end'}]}>Earned</Text>
          </View>
      </View>
      <View style={styles.BoxFooter}>
        <FlatList data={indicators} renderItem={indicator} _keyExtractor ={(item, index) => item.key}
            />
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    Box: {
        position: "absolute",
        bottom: 0,
        shadowColor: '#171717',
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
        backgroundColor: colors.white,
        width: "100%",
        paddingVertical: adaptToHeight(.02),
        paddingHorizontal: adaptToWidth(.05),
    },
    BoxHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    UserInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: adaptToHeight(.015),
    },
    Avatar: {
        height: adaptToWidth(.15),
        width: adaptToWidth(.15),
        borderRadius: 50,
        marginRight: adaptToWidth(.02)
    },
    TextPrimary: {
        fontFamily: 'latoBold',
        fontSize: adaptToWidth(.045)
    },
    TextSecondary: {
        fontFamily: 'latoBold',
        fontSize: adaptToWidth(.03),
        color: colors.greyMedium
    },
    BoxFooter: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: adaptToHeight(.025),
        paddingHorizontal: adaptToWidth(.05),
        backgroundColor: colors.primary,
        borderRadius: 5,
    },
    WorkingInfo: {
        alignItems: "center",
        justifyContent: "space-around",
    },
    TextIndicator: {
        fontFamily: 'latoBold',
        fontSize: adaptToWidth(.045),
        color: colors.black,
        paddingVertical: adaptToHeight(.01)
    }
});
