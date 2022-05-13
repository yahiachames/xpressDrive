import {Text, View} from 'react-native'
import {useState} from "react";
import {generateColor} from "../config/utils";

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase();
}

const getInitials = (string) => {
    const strings = string.split(" ")
    let text = ""
    strings?.forEach(s => text+= capitalizeFirstLetter(s))
    return text

}

const Avatar = ({
                    children,
                    size = 60,
                    backgroundColor = '#000',
                    textColor = '#fff',
                    fontSize = size / 3.14,
                    randomColor = false,
                    type,
                    style
                }) => {

    if (typeof children !== 'string') throw new Error('Children must be only a string \n Ex: Technology')

    let abbr = getInitials(children)

    if (typeof size !== 'number') throw new Error('Size must be an integer')

    let containerStyle = {
        width: size,
        height: size,
        backgroundColor: randomColor ? generateColor() : backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
    }

    let textStyle = {
        color: textColor,
        fontSize: fontSize,
        fontWeight: 'bold',
        letterSpacing: 1
    }

    const getAvatarByType = () => {
        if (type === 'circle') {
            containerStyle.borderRadius = size / 2
            return (
                <View style={[style, containerStyle]}>
                    <Text style={textStyle}
                          adjustsFontSizeToFit={true}>{abbr}</Text>
                </View>
            );
        } else {
            return (
                <View style={[style, containerStyle]}>
                    <Text style={textStyle}
                          adjustsFontSizeToFit={true}>{abbr}</Text>
                </View>
            );
        }
    }

    return (
        <>
            {getAvatarByType()}
        </>
    )

}

export default Avatar;
