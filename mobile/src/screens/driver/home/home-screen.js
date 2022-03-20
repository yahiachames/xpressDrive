import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useCallback, useMemo, useRef} from "react";
import Screen from "../../../components/screen";
import InfoPanel from "./components/info-panel";
import {colors, sizes} from "../../../constants";
import {FontAwesome5} from "@expo/vector-icons";
import {adaptToHeight} from "../../../config/dimensions";
import MapView from 'react-native-maps';
import BottomSheet from "@gorhom/bottom-sheet";
import OfflineBar from "./components/offline-bar";

const HomeScreen = () => {

    const bottomSheet = useRef(1);
    const snapPoints = useMemo(() => ["32%"], []);
    const handleSheetChange = useCallback((index) => {
    }, []);

    return (
        <Screen>
            <View style={{flex: 1, position: 'relative'}}>
                <OfflineBar />
                <MapView style={styles.map}/>
                <TouchableOpacity style={styles.location}>
                    <FontAwesome5
                        name={"crosshairs"}
                        size={sizes.h2}
                        color={colors.black}
                    />
                </TouchableOpacity>
            </View>
            <BottomSheet
                ref={bottomSheet}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
            >
                <View style={{position: "absolute", bottom: 0, width: '100%'}}>
                    <InfoPanel/>
                </View>
            </BottomSheet>
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
        top: adaptToHeight(.53),
        right: 20,
        backgroundColor: colors.white,
        borderRadius: 40,
        paddingHorizontal: sizes.padding * 1.3,
        paddingVertical: sizes.padding * 1.2,
        elevation: 10,
        shadowColor: colors.black,
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.5,
        shadowRadius: sizes.radius,
    }
});
