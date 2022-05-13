import React from "react";
import {StyleSheet, TextInput, View} from "react-native";
import {AntDesign, FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import {colors, sizes} from "../constants";

function AppTextInput({
                          icon,
                          width = "100%",
                          style,
                          textStyle,
                          lang,
                          color = colors.primary,
                          iconType = "AntDesign",
                          ...otherProps
                      }) {

    const renderIcon = () => {
      switch (iconType) {
          case "AntDesign":
              return <AntDesign
                  name={icon}
                  size={sizes.icon}
                  color={color}
                  style={styles.icon}
              />
          case "MaterialCommunityIcons":
              return <MaterialCommunityIcons
                  name={icon}
                  size={sizes.icon}
                  color={color}
                  style={styles.icon}
              />
          default:
              return <FontAwesome
                  name={icon}
                  size={sizes.icon}
                  color={color}
                  style={styles.icon}
              />
      }
    }

    return (
        <View style={[styles.container, {width}, style]}>
            {icon && (
                renderIcon()
            )}
            <TextInput style={[styles.text, textStyle]} {...otherProps} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: sizes.radius,
        flexDirection: "row",
        paddingHorizontal: sizes.margin,
        height: sizes.inputHeight,
        marginBottom: sizes.margin,
    },
    icon: {
        marginRight: sizes.margin,
        top: 3,
    },
    text: {
        color: colors.dark,
        fontSize: sizes.input,
        fontFamily: "latoBold",
    },
});

export default AppTextInput;
