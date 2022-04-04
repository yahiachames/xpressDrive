import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React, {useContext} from "react";
import Screen from "../../../components/screen";
import {colors, images, sizes} from "../../../constants";
import {adaptToHeight, adaptToWidth} from "../../../config/dimensions";
import ProfileContext from "../../../context/ProfileContext";

const {defaultUser} = images

const ProfileScreen = () => {

    const { profile, setProfile } = useContext(ProfileContext);

    const {data} = profile

    const items = [
        {
            label: "Full name",
            value: data.user.fullName ? data.user.fullName : "Unknown"
        },
        {
            label: "Phone number",
            value: data.user.phone
        },
        {
            label: "Email",
            value: data.user.email
        },
        {
            label: "Gender",
            value: data.user.gender ? data.user.gender : "Not set"
        },
        {
            label: "Birthday",
            value: data.user.birthday ? data.user.birthday : "Not set"
        }
    ]

    return (
        <Screen>
            <View style={styles.user}>
                <Image source={defaultUser} style={styles.avatar}/>
                <View>
                    <Text style={styles.name}>{data.user.fullName ? data.user.fullName : "Unknown"}</Text>
                    <Text style={styles.rank}>{data.user.rank ? data.user.rank : "Unranked"}</Text>
                </View>
            </View>
            <View style={styles.details}>
                <Text style={styles.title}>Information</Text>
                <FlatList data={items} renderItem={({item}) => {
                    return (
                        <View style={styles.item}>
                            <Text style={styles.label}>{item.label}</Text>
                            <Text style={styles.value}>{item.value}</Text>
                        </View>
                    )
                }} />
            </View>
        </Screen>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    avatar: {
        height: adaptToWidth(.25),
        width: adaptToWidth(.25),
        borderRadius: 40,
        borderColor: colors.greyLight,
        borderWidth: .7
    },
    name: {
        fontFamily: 'latoBold',
        fontSize: sizes.h4,
        color: colors.black,
        marginVertical: sizes.tiny
    },
    rank: {
        fontFamily: 'latoBold',
        fontSize: sizes.h6,
        color: colors.grey
    },
    user: {
        flex: .4,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: colors.greyLight,
        borderBottomWidth: .7
    },
    details: {
        flex: .6,
        backgroundColor: colors.light,
    },
    title: {
        marginVertical: sizes.margin * 1.5,
        color: colors.greyMedium,
        fontSize: sizes.h6,
        paddingHorizontal: sizes.padding,
        fontFamily: 'latoBold',
        textTransform: 'uppercase'
    },
    label: {
        color: colors.black,
        fontSize: sizes.h6,
        fontFamily: 'latoRegular',
    },
    value: {
        color: colors.greyMedium,
        fontSize: sizes.h6,
        fontFamily: 'latoBold',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.white,
        borderBottomColor: colors.greyLight,
        borderBottomWidth: .7,
        flexDirection: 'row',
        padding: sizes.padding,
    }

});
