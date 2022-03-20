import {FlatList, Image, StyleSheet, Text, View} from "react-native";
import React from "react";
import {AntDesign, FontAwesome5} from "@expo/vector-icons";
import {colors, images, sizes} from "../../../../constants";
import {adaptToHeight, adaptToWidth} from "../../../../config/dimensions";

const indicators = [
    {icon: "clockcircleo", value: "10.2", label: "Hours Online"},
    {icon: "linechart", value: "30 KM", label: "Total Distance"},
    {icon: "book", value: "20", label: "Total Jobs"}
]

const {defaultUser} = images

const indicator = ({item}) => {
    return (
        <View style={styles.stats}>
            <AntDesign
                name={item.icon}
                size={sizes.h2}
                color={colors.white}
            />
            <Text style={styles.value}>{item.value}</Text>
            <Text style={[styles.label, {textTransform: "uppercase"}]}>{item.label}</Text>
        </View>
    )
}

const InfoPanel = () => {
    return (
        <View style={styles.box}>
            <View style={styles.boxHeader}>
                <View style={styles.userInfo}>
                    <Image source={defaultUser} style={styles.avatar}/>
                    <View>
                        <Text style={styles.textPrimary}>Firstname Lastname</Text>
                        <Text style={styles.textSecondary}>Basic Level</Text>
                    </View>
                </View>
                <View style={{
                    marginBottom: sizes.margin,
                }}>
                    <Text style={styles.textPrimary}>$100.00</Text>
                    <Text style={[styles.textSecondary, {alignSelf: 'flex-end'}]}>Earned</Text>
                </View>
            </View>
            <View style={styles.boxFooter}>
                <FlatList
                    key={'#'}
                    data={indicators}
                    renderItem={indicator}
                    numColumns={3}
                    _keyExtractor={(item, index) => item.key
                    }
                />
            </View>
        </View>
    );
};

export default InfoPanel;

const styles = StyleSheet.create({
    box: {
        flex: 1,
        /*borderTopStartRadius: sizes.radius * 2,
        borderTopEndRadius: sizes.radius * 2,
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.8,
        shadowRadius: sizes.radius,*/
        backgroundColor: colors.white,
        padding: sizes.padding * 2,
    },
    boxHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    userInfo: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: sizes.margin,
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
        fontSize: sizes.h3,
        color: colors.black
    },
    textSecondary: {
        fontFamily: 'latoBold',
        fontSize: sizes.h4,
        color: colors.grey
    },
    boxFooter: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingVertical: adaptToHeight(.025),
        paddingHorizontal: adaptToWidth(.05),
        backgroundColor: colors.primary,
        borderRadius: 5,
    },
    stats: {
        alignItems: "center",
        justifyContent: "space-around",
        flex: 1
    },
    value: {
        fontFamily: 'latoBold',
        fontSize: sizes.h3,
        color: colors.black,
        paddingVertical: adaptToHeight(.01)
    },
    label: {
        fontFamily: 'latoBold',
        fontSize: sizes.h5,
        color: colors.white,
    }
});
