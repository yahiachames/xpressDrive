import {Fontisto} from "@expo/vector-icons";
import {colors, sizes} from "../constants";
import {StyleSheet, Switch, Text, View} from "react-native";
import * as React from "react";

const CustomHeader = ({navigation}) => {
    return (
        <View style={styles.header}>
            <Fontisto
                name="nav-icon-a"
                size={sizes.h3}
                color={colors.black}
                onPress={() => navigation.openDrawer()}
            />
            <Text style={styles.title}>Offline</Text>
            <Switch
                style={styles.switch}
            />
        </View>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    padding: sizes.padding,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "latoBold",
    fontSize: sizes.h3,
    color: colors.black,
  },
});
