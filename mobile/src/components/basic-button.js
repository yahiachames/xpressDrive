import React from 'react';
import {Button} from 'react-native-elements';
import {adaptToHeight} from "../config/dimensions";
import {StyleSheet} from "react-native";

const BasicButton = ({color = 'blue', height = adaptToHeight(0.08), width="auto", style, ...props}) => (
    <Button {...props} containerStyle={[styles.ContainerStyle, {width: width}]} buttonStyle={[style, { backgroundColor: color, height: height}]} />
);

const styles = StyleSheet.create({
    ContainerStyle: {

    }
});

export default BasicButton;
