import {StyleSheet, View} from "react-native";
import React from "react";
import Svg, { G, Circle } from "react-native-svg";
import {colors} from "../constants";
import AppText from "./custom-text";
import sizes from "../constants/sizes";

const PieChart = ({title, text, percentage, height, width, strokeWidth = 10}) => {

    const radius = 70;
    const circleCircumference = 2 * Math.PI * radius;
    const strokeDashoffset = circleCircumference - (circleCircumference * percentage) / 100;

    return (
        <View style={styles.graphWrapper}>
            <Svg height={height} width={width} viewBox="0 0 180 180">
                <G rotation={-90} originX="90" originY="90">
                    <Circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke= {colors.greyLight}
                        fill="transparent"
                        strokeWidth={strokeWidth}
                    />
                    <Circle
                        cx="50%"
                        cy="50%"
                        r={radius}
                        stroke= {colors.primary}
                        fill="transparent"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circleCircumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </G>
            </Svg>
            <View style={styles.content}>
                <AppText style={styles.title}>{title}</AppText>
                <AppText style={styles.text}>{text}</AppText>
            </View>
        </View>
    );
};

export default PieChart;

const styles = StyleSheet.create({
    graphWrapper: {
        alignItems: "center",
        justifyContent: "center",
    },
    content: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        color: colors.dark,
        fontFamily: "latoMedium",
        fontSize: sizes.h5
    },
    text: {
        color: colors.grey,
        fontFamily: "latoRegular",
        fontSize: sizes.h7
    },
});
