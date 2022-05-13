import {FlatList, StyleSheet, View} from "react-native";
import React, {useState} from "react";
import AppText from "../../../components/custom-text";
import CustomCheckBox from "../../../components/custom-checkbox";
import {colors, sizes} from "../../../constants";

const languages = [
    {
        key: "EN",
        title: "English",
        subtitle: "English",
    },
    {
        key: "AR",
        title: "العربية",
        subtitle: "َArabic",
    },
    {
        key: "FR",
        title: "Français",
        subtitle: "َFrench",
    },
]

const LanguageScreen = () => {

    const [selectedLanguage, setSelectedLanguage] = useState(null)

    return (
        <View style={styles.container}>
            <FlatList
                key={({item}) => item.key}
                data={languages}
                ItemSeparatorComponent={() => <View style={styles.divider} />}
                renderItem={({item}) => {
                    return <CustomCheckBox
                        checked={item.key === selectedLanguage?.key}
                        size={sizes.icon * 1.8}
                        onCheck={() => {
                            setSelectedLanguage(item)
                        }}
                    >
                        <View style={styles.checkbox}>
                            <AppText style={styles.title}>{item.title}</AppText>
                            <AppText style={styles.subtitle}>{item.subtitle}</AppText>
                        </View>
                    </CustomCheckBox>
                }}/>
        </View>
    );
};

export default LanguageScreen;

const styles = StyleSheet.create({
    container: {
        margin: sizes.margin
    },
    divider: {
        height: .7,
        backgroundColor: colors.greyLight,
        marginBottom: sizes.tiny
    },
    checkbox: {
        marginHorizontal: sizes.tiny, alignItems: "flex-start"
    },
    title: {
        fontFamily: "latoBold",
        fontSize: sizes.h6, color: colors.dark
    },
    subtitle: {
        fontFamily: "latoRegular",
        fontSize: sizes.h7,
        color: colors.grey
    }
});
