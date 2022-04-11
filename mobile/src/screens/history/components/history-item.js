import {Image, StyleSheet, View} from "react-native";
import React from "react";
import AppText from "../../../components/Text";
import {colors, images, sizes} from "../../../constants";
import {adaptToWidth} from "../../../config/dimensions";

const HistoryItem = ({item}) => {

    const {defaultUser} = images;

    return (
        <View style={{paddingHorizontal: sizes.padding, paddingBottom: sizes.padding}}>
            <View>
                <View style={styles.box}>
                    <View style={styles.header}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={defaultUser} style={styles.image}/>
                            <View>
                                <AppText style={{paddingHorizontal: sizes.padding, fontSize: sizes.h6}}>{item.user.name}</AppText>
                                <AppText style={styles.badge}>{item.state}</AppText>
                            </View>
                        </View>
                        <View style={{alignItems: 'flex-end'}}>
                            <AppText style={{fontSize: sizes.h6}}>${item.price}</AppText>
                            <AppText style={{color: colors.grey, fontSize: sizes.h7}}>{item.distance} km</AppText>
                        </View>
                    </View>
                    <View style={styles.body}>
                        <View style={{paddingBottom: sizes.padding}}>
                            <AppText style={{color: colors.grey, fontSize: sizes.h8, textTransform: 'uppercase', paddingBottom: sizes.tiny}}>Pick Up</AppText>
                            <AppText style={{fontSize: sizes.h6}}>${item.pickup}</AppText>
                        </View>
                        <View style={styles.divider} />
                        <View style={{paddingTop: sizes.padding}}>
                            <AppText style={{color: colors.grey, fontSize: sizes.h8, textTransform: 'uppercase', paddingBottom: sizes.tiny}}>Drop Off</AppText>
                            <AppText style={{fontSize: sizes.h6}}>${item.dropOff}</AppText>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default HistoryItem;

const styles = StyleSheet.create({
    box: {
        borderWidth: .4,
        borderColor: colors.greyLighter,
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: .5,
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
      textTransform: 'capitalize',
      backgroundColor: colors.primary,
      color: colors.white,
      borderRadius: sizes.radius,
        alignSelf: 'center',
        paddingHorizontal: sizes.tiny / 2,
        marginTop: sizes.tiny / 2
    },
    image: {
        borderWidth: .5,
        borderColor: colors.greyLight,
        borderRadius: sizes.radius,
        width: adaptToWidth(0.13),
        height: adaptToWidth(0.13),
    },
    body: {
        backgroundColor: colors.white,
        padding: sizes.padding
    },
    divider: {
        borderBottomWidth: .7,
        borderBottomColor: colors.greyLight,
    }
});
