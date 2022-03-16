import React from 'react';
import {Input} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet} from "react-native";
import {adaptToHeight} from "../config/dimensions";
import {colors} from "../constants";

const BasicInput = ({
                        iconName = 'user',
                        iconSize = 24,
                        iconColor = colors.greyMedium,
                        containerStyle,
                        ...rest
                    }) => (
    <Input
        containerStyle={{paddingHorizontal: 0}}
        {...rest}
        leftIcon={<Icon name={iconName} style={{marginHorizontal: 5}} size={iconSize} color={iconColor} />}
        inputContainerStyle={[styles.InputContainerStyle, containerStyle]}
        leftIconContainerStyle={styles.LeftIconContainerStyle}
        errorStyle={styles.ErrorStyle}
    />
);

const styles = StyleSheet.create({
    InputContainerStyle: {
        borderBottomWidth: 0,
        borderRadius: 10,
        height: adaptToHeight(0.08)
    },
    LeftIconContainerStyle: {
        marginLeft: 5,
    },
    ErrorStyle: {
        fontSize: adaptToHeight(0.022),
        marginBottom: adaptToHeight(0.020),
    },
});

export default BasicInput;
