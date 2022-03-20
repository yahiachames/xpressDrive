import {Image, StyleSheet, Text, View} from "react-native";
import React, {useCallback, useMemo, useRef} from "react";
import {colors, images, sizes} from "../../constants";
import Screen from "../../components/screen";
import BottomSheet from "@gorhom/bottom-sheet";
import {adaptToHeight, adaptToWidth} from "../../config/dimensions";
import BasicButton from "../../components/basic-button";

const {defaultUser} = images

const PickUpScreen = () => {

    const bottomSheet = useRef(1);
    const snapPoints = useMemo(() => ["15%", "32%", "90%"], []);
    const handleSheetChange = useCallback((index) => {
    }, []);

    const Alert = () => {
        return (
            <Text style={styles.alert}>
                <Text style={styles.distance}>250m</Text>
                <Text> </Text>
                <Text style={styles.description}>Turn right at 105 William st, Chicago</Text>
            </Text>
        )
    }

    return (
        <Screen>
            <Alert/>
            <BottomSheet
                ref={bottomSheet}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
            >
                <View style={styles.header}>
                    <Image source={defaultUser} style={styles.avatar}/>
                    <View style={{paddingHorizontal: sizes.padding}}>
                        <Text style={styles.title}>Pick up at</Text>
                        <Text style={styles.address}>845 Wall St, New York</Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <View style={styles.details}>
                        <View>
                            <Text style={styles.label}>EST</Text>
                            <Text style={styles.value}>5 min</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Distance</Text>
                            <Text style={styles.value}>15 km</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Fare</Text>
                            <Text style={styles.value}>$35.00</Text>
                        </View>
                    </View>
                    <View style={styles.buttonsContainer}>
                        <BasicButton
                            style={styles.button}
                            bgColor={colors.primary}
                            title={"Done"}
                        />
                        <View style={{flex: .1}}/>
                        <BasicButton
                            style={styles.button}
                            bgColor={colors.danger}
                            title={"Cancel"}
                        />
                    </View>
                </View>
            </BottomSheet>
        </Screen>
    );
};

export default PickUpScreen;

const styles = StyleSheet.create({
    alert: {
        backgroundColor: colors.secondary,
        padding: sizes.padding
    },
    distance: {
        color: colors.black,
        fontSize: sizes.h3,
        fontFamily: 'latoMedium',
    },
    description: {
        color: colors.black,
        fontSize: sizes.h3,
        fontFamily: 'latoRegular',
    },
    header: {
        alignItems: 'center',
        flexDirection: 'row',
        padding: sizes.padding * 1.5,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.greyLight
    },
    address: {
        color: colors.black,
        fontFamily: 'latoBold',
        fontSize: sizes.h3,
    },
    title: {
        color: colors.greyMedium,
        fontFamily: 'latoBold',
        paddingBottom: sizes.tiny,
        fontSize: sizes.h3,
        textTransform: 'capitalize'
    },
    avatar: {
        borderRadius: 40,
        borderColor: colors.greyLight,
        borderWidth: .5,
        width: adaptToWidth(.13),
        height: adaptToWidth(.13)
    },
    info: {
        padding: sizes.padding * 1.5,
        backgroundColor: colors.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.greyLight
    },
    details: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingBottom: sizes.padding * 1.5
    },
    label: {
        color: colors.greyMedium,
        fontFamily: 'latoRegular',
        fontSize: sizes.h3,
        marginBottom: sizes.tiny
    },
    value: {
        color: colors.black,
        fontFamily: 'latoBold',
        fontSize: sizes.h3 * 1.2,
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        flex: .45,
        height: adaptToHeight(.05)
    }
});
