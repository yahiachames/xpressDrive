import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors, images, sizes} from "../../../../constants";
import React from "react";
import {adaptToHeight, adaptToWidth} from "../../../../config/dimensions";
import BasicButton from "../../../../components/basic-button";
import {useFormikContext} from "formik";
import Screen from "../../../../components/screen";

export const FunctionSelect = ({name, onPress}) => {

    const {register1, register2} = images

    const items = [
        {
            text: 'Driver',
            description: 'Register to drive and deliver.',
            image: register1,
            value: 'Driver'
        },
        {
            text: 'Rider',
            description: 'Register to book a ride.',
            image: register2,
            value: 'Rider'
        }
    ]

    const {values, setFieldValue} = useFormikContext();

    return (
        <Screen>
            <View style={{flex: .25}}>
                <Text style={styles.title}>Select Function</Text>
                <Text style={styles.description}>Choose the right function for you!</Text>
            </View>
            <View style={{flex: .65}}>
                <FlatList
                    keyExtractor={(item, index) => String(index)}
                    data={items}
                    renderItem={({item}) => {
                        return <TouchableOpacity
                            onPress={() => {
                                setFieldValue(name, item.value)
                            }}
                            activeOpacity={.7}
                            style={[styles.card, values[name] === item.value ? styles.selected : null]}
                        >
                            <View style={{flex: .5, padding: sizes.padding}}>
                                <Text style={styles.itemText}>{item.text}</Text>
                                <Text style={styles.itemDescription}>{item.description}</Text>
                            </View>
                            <Image
                                source={item.image}
                                resizeMode="cover"
                                style={styles.itemImage}
                            />
                        </TouchableOpacity>
                    }}/>
            </View>
            <BasicButton style={{flex: .1}}
                         bgColor={'transparent'}
                         onPress={() => {
                             if(values[name]) {
                                 onPress()
                             }
                         }}
                         textStyle={[styles.buttonText, values[name] ? {color: colors.primary} : null]} title={"Next"}/>
        </Screen>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'latoMedium',
        fontSize: sizes.h2,
        color: colors.black,
        marginBottom: sizes.margin
    },
    description: {
        fontFamily: 'latoRegular',
        fontSize: sizes.h3,
        color: colors.grey
    },
    selected: {
        borderRadius: sizes.radius,
        borderColor: colors.primary,
        borderWidth: 2
    },
    card: {
        marginBottom: sizes.margin,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: sizes.radius,
        borderColor: colors.greyLight,
        borderWidth: 1
    },
    itemText: {
        fontFamily: 'latoBold',
        fontSize: sizes.h3,
        color: colors.black,
        marginVertical: sizes.margin,
    },
    itemDescription: {
        fontFamily: 'latoRegular',
        fontSize: sizes.h4,
        color: colors.grey
    },
    itemImage: {
        height: adaptToHeight(.15),
        width: 'auto',
        flex: .5,
    },
    buttonText: {
        fontFamily: 'latoBold',
        fontSize: sizes.h3,
        color: colors.grey
    }
})
