import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {DrawerContentScrollView, DrawerItemList,} from '@react-navigation/drawer';
import {colors, images, sizes} from "../constants";
import {Ionicons} from "@expo/vector-icons";

const {defaultUser} = images

const CustomDrawer = props => {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{backgroundColor: colors.primary}}>
                <View style={styles.header}>
                    <View
                        style={styles.user}>
                        <Image
                            source={defaultUser}
                            style={styles.avatar}
                        />
                        <View style={{justifyContent: 'center'}}>
                            <Text style={styles.name}>
                                John Doe
                            </Text>
                            <View style={styles.rankContainer}>
                                <Ionicons name="star" size={sizes.icon} color={colors.secondary}/>
                                <Text style={styles.rank}>
                                    Gold Member
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.stats}>

                    </View>
                </View>
                <View style={{flex: 1, backgroundColor: colors.white, paddingTop: sizes.padding}}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            <View style={{padding: sizes.padding, borderTopWidth: 1, borderTopColor: colors.greyLight}}>
                <TouchableOpacity onPress={() => {
                }} style={{paddingVertical: sizes.padding}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="share-social-outline" size={sizes.icon}/>
                        <Text style={styles.action}>
                            Invite Friends
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                }} style={{paddingVertical: sizes.padding}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Ionicons name="exit-outline" size={sizes.icon}/>
                        <Text style={styles.action}>
                            Logout
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    header: {
        padding: sizes.padding,
        backgroundColor: colors.primary,
    },
    user: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    avatar: {
        height: 70,
        width: 70,
        borderRadius: 40,
        marginBottom: sizes.margin,
        borderWidth: 2,
        borderColor: colors.white
    },
    name: {
        color: colors.white,
        fontSize: sizes.h3,
        fontFamily: 'latoMedium',
        marginBottom: sizes.margin,
    },
    rankContainer: {
        backgroundColor: colors.white,
        borderRadius: sizes.radius * 2,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: sizes.tiny,
        paddingHorizontal: sizes.base
    },
    rank: {
        color: colors.secondary,
        fontSize: sizes.h5,
        fontFamily: 'latoBold',
    },
    stats: {

    },
    action: {
        fontSize: sizes.font,
        fontFamily: 'latoBold',
        marginLeft: sizes.base,
        color: colors.grey
    },
});
