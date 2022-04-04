import {FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {FontAwesome} from "@expo/vector-icons";
import {colors, images, sizes} from "../constants";
import Screen from "../components/screen";
import {adaptToWidth} from "../config/dimensions";

const SettingsScreen = ({navigation}) => {

    const items1 = [
        {icon: 'car', name: 'Vehicle Management', link: '', color: colors.secondary},
        {icon: 'vcard', name: 'Document Management', link: '', color: colors.primary},
        {icon: 'star', name: 'Reviews', link: '', color: colors.yellow},
        {icon: 'globe', name: 'Language', link: '', color: colors.blue}
    ]

    const items2 = [
        {icon: 'bell', name: 'Notifications', link: '', color: colors.blueLight},
        {icon: 'gavel', name: 'Terms & Privacy Policy', link: '', color: colors.greyMedium},
        {icon: 'question-circle-o', name: 'Contact Us', link: '', color: colors.pink},
    ]

    const {defaultUser} = images

    const boxItem = (item) => {
        return (
            <TouchableOpacity style={styles.item} activeOpacity={.8}
                              onPress={() => navigation.navigate(item.link)}>
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
                    <View style={{alignItems: 'center', flexDirection: 'row'}}>
                        <Image source={defaultUser} style={styles.avatar}/>
                        <View style={{marginHorizontal: sizes.margin * 2}}>
                            <Text style={styles.name}>John doe</Text>
                            <Text style={styles.rank}>Gold Member</Text>
                        </View>
                    </View>
                    <FontAwesome name={"chevron-right"} size={sizes.icon} color={colors.grey}/>
                </View>
                <ScrollView>
                    <View>
                        <FlatList
                            style={styles.box}
                            data={items1}
                            renderItem={({item}) => boxItem(item)}
                            _keyExtractor={(item, index) => item.name
                            }
                        />
                        <FlatList
                            style={styles.box}
                            data={items2}
                            renderItem={({item}) => boxItem(item)}
                            _keyExtractor={(item, index) => item.name
                            }
                        />
                    </View>
                </ScrollView>
            </View>
        </Screen>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light
    },
    box: {
        marginBottom: sizes.margin * 2,
        elevation: 10,
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
        paddingVertical: sizes.padding * 2,
        paddingHorizontal: sizes.padding,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: sizes.margin * 2,
        justifyContent: "space-between"
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
