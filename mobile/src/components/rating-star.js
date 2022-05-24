import {StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useState} from "react";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import colors from "../constants/colors";
import sizes from "../constants/sizes";

const RatingStar = ({
                        color = colors.dark,
                        size = sizes.icon,
                        rate = 0,
                        count = 5,
                        style,
                        disabled,
                        onPress = () => {
                        }
                    }) => {

    const generateStar = () => {
        let items = []
        let index = 1
        while (index <= count) {
            let i = index
            const item = <TouchableOpacity disabled={disabled} key={index} onPress={() => onSelect(i)}>
                <MaterialCommunityIcons name={index <= rate ? "star" : "star-outline"} size={size} color={color}/>
            </TouchableOpacity>
            items.push(item)
            index++
        }
        return items
    }

    const onSelect = (i) => {
        onPress(i)
    }

    return (
        <View style={[style, styles.container]}>
            {generateStar()}
        </View>
    );
};

export default RatingStar;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row"
    }
});
