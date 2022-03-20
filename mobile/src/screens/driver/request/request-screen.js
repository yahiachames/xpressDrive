import {ScrollView, StyleSheet, Text} from "react-native";
import React from "react";
import Screen from "../../../components/screen";
import {colors, sizes} from "../../../constants";
import RequestItem from "./components/requestItem";

const RequestScreen = () => {
    return (
        <Screen>
            <Text style={styles.alert}>
                You have 10 new requests.
            </Text>
            <ScrollView>
                <RequestItem/>
            </ScrollView>
        </Screen>
    );
};

export default RequestScreen;

const styles = StyleSheet.create({
    alert: {
        backgroundColor: colors.secondary,
        padding: sizes.padding * 1.2,
        color: colors.black,
        fontFamily: 'latoBold',
        fontSize: sizes.h3
    },
});
