import React from "react";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import sizes from "../constants/sizes";
import colors from "../constants/colors";

const ImagedCarouselCard = (
    {
        style,
        text,
        source,
        width = 300,
        height = 300,
        textStyle,
        shadowColor = colors.dark,
        shadowStyle,
        borderRadius = sizes.radius,
        overlay = false,
        overlayHeight = 50,
        shadowPaddingBottom = 18,
        overlayBackgroundColor = "rgba(0,0,0,0.3)",
        overlayBorderBottomLeftRadius = sizes.radius,
        overlayBorderBottomRightRadius = sizes.radius,
    }) => {
    return (
        <View style={{
            alignItems: "center",
        }}>
            <ImageBackground
                source={source}
                borderRadius={borderRadius}
                style={[
                    {
                        width: width,
                        height: height,
                        alignSelf: "center",
                        paddingBottom: shadowPaddingBottom,
                    },
                    shadowStyle || {
                        shadowColor,
                        shadowOffset: {
                            width: 0,
                            height: 7
                        },
                        shadowOpacity: .43,
                        shadowRadius: 9.51
                    },
                    style,
                ]}
            >
                {overlay && <View
                    style={[
                        styles.blackOverlay,
                        {
                            height: overlayHeight,
                            borderBottomLeftRadius: overlayBorderBottomLeftRadius,
                            borderBottomRightRadius: overlayBorderBottomRightRadius,
                            backgroundColor: overlayBackgroundColor
                        }
                    ]}
                >
                    <Text style={textStyle || styles.overlayText}>{text}</Text>
                </View>}
            </ImageBackground>
            {!overlay && <Text style={textStyle || styles.footerText}>{text}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    overlayText: {
        fontSize: sizes.h6,
        color: colors.white,
        marginLeft: sizes.margin,
        fontFamily: "latoBold",
    },
    blackOverlay: {
        bottom: 0,
        position: "absolute",
        justifyContent: "center",
    },
    footerText: {
        marginTop: sizes.margin,
        fontSize: sizes.h6,
        color: colors.white,
        fontFamily: "latoBold",
    },
})

export default ImagedCarouselCard;
