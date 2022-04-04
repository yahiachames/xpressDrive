import {FlatList, Image, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import {colors, images, sizes} from "../../../constants";
import {FontAwesome} from "@expo/vector-icons";
import AppText from "../../../components/Text";
import {adaptToWidth} from "../../../config/dimensions";
import Screen from "../../../components/screen";

const {defaultVehicle} = images

const items = [
    {
        brand: "Mazda",
        number: "4123 CA 541"
    },
    {
        brand: "Mazda",
        number: "4123 CA 541"
    },
]

const onAdd = () => {
}

const VehicleItem = ({item}) => {
    return (
        <View style={styles.box}>
            <View style={styles.imageContainer}>
                <Image resizeMode={'contain'} style={styles.image} source={defaultVehicle}/>
            </View>
            <View style={{flex: .05}} />
            <View style={{flex: .7}}>
                <AppText>{item.brand}</AppText>
                <AppText style={{color: colors.greyMedium, fontSize: sizes.h6}}>{item.number}</AppText>
            </View>
            <View style={{flex: .1}}>
                <FontAwesome name={'arrow-right'} size={sizes.icon} color={colors.black}/>
            </View>
        </View>
    )
}

const VehicleManagementScreen = () => {
    return (
        <Screen style={{padding: sizes.padding, backgroundColor: colors.light}}>
            <View style={{flex: .85}}>
                <FlatList
                    data={items}
                    renderItem={({item}) => <VehicleItem item={item}/>}
                />
            </View>
            <View style={styles.footer}>
                <TouchableOpacity style={styles.button} onPress={onAdd}>
                    <FontAwesome name={'plus'} size={sizes.h1} color={colors.white}/>
                </TouchableOpacity>
            </View>
        </Screen>
    );
};

export default VehicleManagementScreen;

const styles = StyleSheet.create({
    box: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        padding: sizes.padding,
        borderColor: colors.greyLight,
        borderWidth: .7,
        borderRadius: sizes.radius,
        marginBottom: sizes.margin
    },
    imageContainer: {
        flex: .15,
        padding: sizes.tiny,
        borderRadius: 40,
        backgroundColor: colors.primary
    },
    image: {
        height: adaptToWidth(.115),
        tintColor: colors.white,
        width: 'auto',
    },
    footer: {
        flex: .15,
        alignItems: 'center',
    },
    button: {
        paddingHorizontal: sizes.padding * 1.3,
        paddingVertical: sizes.padding,
        borderRadius: 40,
        backgroundColor: colors.primary,
        borderWidth: 2,
        borderColor: colors.white,
    },
});
