import {StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import Screen from "../../../components/screen";
import InfoPanel from "./components/info-panel";
import {colors, sizes} from "../../../constants";
import {FontAwesome5} from "@expo/vector-icons";
import {adaptToHeight} from "../../../config/dimensions";
import MapView from 'react-native-maps';

const HomeScreen = () => {
    return (
        <Screen>
            <View style={{flex: 1, position: 'relative'}}>
                <MapView style={styles.map}/>
                <TouchableOpacity style={styles.location}>
                    <FontAwesome5
                        name={"bullseye"}
                        size={sizes.h2}
                        color={colors.black}
                    />
                </TouchableOpacity>
            </View>
            <View style={{position: "absolute", bottom: 0, width: '100%'}}>
                <InfoPanel/>
            </View>
        </Screen>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    map: {
        width: sizes.width,
        height: sizes.height,
    },
    location: {
        position: 'absolute',
        top: adaptToHeight(.6),
        right: 20,
        backgroundColor: colors.white,
        borderRadius: 40,
        paddingHorizontal: sizes.padding * 1.1,
        paddingVertical: sizes.padding,
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: sizes.radius,
    }
});
