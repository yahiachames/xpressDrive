import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {FontAwesome} from "@expo/vector-icons";
import {colors, images, sizes} from "../constants";
import Screen from "../components/screen";
import {adaptToWidth} from "../config/dimensions";
import VehicleManagementScreen from "./driver/settings/vehicle-management-screen";
import routes from "../navigation/routes";

const SettingsScreen = ({navigation}) => {

    const items1 = [
        {icon: 'car', name: routes.VEHICLE_MANAGEMENT, color: colors.secondary},
        {icon: 'vcard', name: routes.DOCUMENT_MANAGEMENT, color: colors.primary},
        {icon: 'star', name: routes.REVIEWS, color: colors.yellow},
        {icon: 'globe', name: routes.LANGUAGE, color: colors.blue}
    ]

    const items2 = [
        {icon: 'bell', name: routes.NOTIFICATION, color: colors.blueLight},
        {icon: 'gavel', name: routes.TERMS_PRIVACY, color: colors.greyMedium},
        {icon: 'question-circle-o', name: routes.CONTACT_US, color: colors.pink},
    ]

    const {defaultUser} = images

    const boxItem = (item) => {
        return (
            <TouchableOpacity style={styles.item} activeOpacity={.8}
                              onPress={() => navigation.navigate(item.name)}>
                <View style={[styles.textContainer]}>
                    <FontAwesome name={item.icon} size={sizes.icon} color={colors.white}
                                 style={[styles.icon, {backgroundColor: item.color}]}/>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
                <FontAwesome name={"chevron-right"} size={sizes.icon} color={colors.grey}/>
            </TouchableOpacity>
        )
    }

    return (
      <Screen>
        <View style={styles.container}>
          <View style={styles.user}>
            <View style={{ alignItems: "center", flexDirection: "row" }}>
              <Image source={defaultUser} style={styles.avatar} />
              <View style={{ marginHorizontal: sizes.margin * 2 }}>
                <Text style={styles.name}>John doe</Text>
                <Text style={styles.rank}>Gold Member</Text>
              </View>
            </View>
            <FontAwesome
              name={"chevron-right"}
              size={sizes.icon}
              color={colors.grey}
            />
          </View>
          <FlatList
            style={{ marginBottom: sizes.margin }}
            data={items1}
            renderItem={({ item }) => boxItem(item)}
            keyExtractor={(item, index) => index}
          />
          <FlatList
            style={styles.box}
            data={items2}
            renderItem={({ item }) => boxItem(item)}
            keyExtractor={(item, index) => index}
          />
        </View>
      </Screen>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light
    },
    item: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: sizes.padding,
        borderBottomWidth: 1,
        borderBottomColor: colors.greyLight,
        backgroundColor: colors.white,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'latoBold',
        fontSize: sizes.h6,
        paddingHorizontal: sizes.padding,
        color: colors.black
    },
    icon: {
        borderRadius: sizes.radius,
        padding: sizes.padding
    },
    user: {
        backgroundColor: colors.white,
        elevation: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: colors.greyLight,
        borderTopColor: colors.greyLight,
        padding: sizes.padding,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: sizes.margin,
        justifyContent: "space-between",
    },
    avatar: {
        borderWidth: 1,
        borderColor: colors.greyLight,
        height: adaptToWidth(.15),
        width: adaptToWidth(.15),
        borderRadius: 40,
    },
    name: {
        fontFamily: 'latoBold',
        fontSize: sizes.h5,
        color: colors.black
    },
    rank: {
        fontFamily: 'latoBold',
        fontSize: sizes.h6,
        color: colors.grey
    },
});
