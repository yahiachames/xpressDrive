import {StyleSheet, Text} from "react-native";
import React from "react";
import Screen from "../../components/screen";
import {colors, sizes} from "../../constants";

const RequestsScreen = () => {
    return (
        <Screen>
            <Text style={styles.messageInfo}>
                You have 10 new requests.
            </Text>
        </Screen>
    );
};

export default RequestsScreen;

const styles = StyleSheet.create({
    messageInfo: {
        backgroundColor: colors.secondary,
        padding: sizes.padding * 1.2,
        color: colors.black,
        fontFamily: 'latoBold',
        fontSize: sizes.h3
    }
});
