import {FlatList, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import AppText from "../../../components/custom-text";
import {colors} from "../../../constants";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import sizes from "../../../constants/sizes";
import {Swipeable} from "react-native-gesture-handler";
import BasicButton from "../../../components/basic-button";

const NotificationScreen = () => {

    const [updated, setUpdated] = useState(false)

    let data = [
        {
            title: "System",
            description: "Booking #1234 has been successfully ordered",
            type: "success-booking",
            bgColor: colors.danger,
            iconColor: colors.white
        },
        {
            title: "System",
            description: "Booking #1234 has been successfully ordered",
            type: "success-booking",
            bgColor: colors.danger,
            iconColor: colors.white
        },
        {
            title: "System",
            description: "Booking #1234 has been successfully ordered",
            type: "success-booking",
            bgColor: colors.danger,
            iconColor: colors.white
        }

    ]

    const getIconByNotificationType = (type) => {
        switch (type) {
            case "success-booking":
                return "check-circle"
            default:
                return "bell-circle"
        }
    }

    const removeItem = (item) => {
        data = data.filter(elm => elm !== item)
        setUpdated(!updated)
    }

    const renderRightItem = (item) => {
        return <BasicButton
            style={{borderRadius: 0, marginVertical: 0}}
            iconSize={sizes.icon * 1.5}
            textColor={colors.white}
            bgColor={colors.danger}
            icon={"trash"}
            onPress={() => removeItem(item)}
        />
    }

    const NotificationItem = ({item}) => {
        return <Swipeable
            renderRightActions={() => renderRightItem(item)}
        >
            <View style={styles.item}>
                <View style={[styles.iconContainer, {backgroundColor: item.bgColor}]}>
                    <MaterialCommunityIcons
                        style={[styles.icon, {color: item.iconColor}]}
                        name={getIconByNotificationType(item.type)}
                        size={sizes.icon * 2}
                    />
                </View>
                <View style={styles.content}>
                    <AppText style={styles.title}>{item.title}</AppText>
                    <AppText numberOfLines={1} style={styles.description}>
                        {item.description?.length > 40 ? item.description.slice(0, 40) + "..." : item.description}
                    </AppText>
                </View>
            </View>
        </Swipeable>
    }

    return (
        <>
            <FlatList
                style={styles.list}
                data={data}
                renderItem={({item}) => <NotificationItem item={item}/>}
            />
        </>
    );
};

export default NotificationScreen;

const styles = StyleSheet.create({
    list: {
        marginVertical: sizes.margin,
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.white,
        padding: sizes.tiny,
        borderBottomColor: colors.light,
        borderBottomWidth: 5
    },
    icon: {
        padding: sizes.tiny,
    },
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 40,
    },
    content: {
        padding: sizes.padding
    },
    title: {
        fontFamily: "latoMedium",
        fontSize: sizes.h6
    },
    description: {
        width: "70%",
        fontFamily: "latoRegular",
        fontSize: sizes.h7
    }
});
