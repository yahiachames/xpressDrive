import {FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {colors, images, sizes} from "../../../../constants";
import React from "react";
import {adaptToHeight, adaptToWidth} from "../../../../config/dimensions";
import BasicButton from "../../../../components/basic-button";
import {useFormikContext} from "formik";

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
        <View style={{flex: 1, margin: adaptToWidth(.06)}}>
            <View style={{flex: .3, justifyContent: 'center'}}>
                <Text style={styles.title}>Select Function</Text>
                <Text style={styles.description}>Choose the right function for you!</Text>
            </View>
            <View style={styles.container}>
                <FlatList
                    keyExtractor={(item, index) => String(index)}
                    data={items}
                    renderItem={({item}) => {
                        return <TouchableOpacity
                            onPress={() => {
                                setFieldValue(name, item.value)
                            }}
                            activeOpacity={0.7}
                            style={[styles.card, values[name] === item.value ? styles.selected : null]}
                        >
                            <View style={{flex: .5, padding: adaptToWidth(.02)}}>
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
            <BasicButton style={styles.button}
                         bgColor={'transparent'}
                         onPress={() => {
                             if(values[name]) {
                                 onPress()
                             }
                         }}
                         textStyle={[styles.buttonText, values[name] ? {color: colors.primary} : null]} title={"Next"}/>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'latoMedium',
        fontSize: sizes.h1,
        color: colors.black,
        marginBottom: adaptToHeight(.01)
    },
    description: {
        fontFamily: 'latoRegular',
        fontSize: sizes.h2,
        color: colors.grey
    },
    container: {
        flex: .5,
    },
    selected: {
        borderRadius: sizes.radius,
        borderColor: colors.primary,
        borderWidth: 3
    },
    card: {
        marginVertical: adaptToWidth(.03),
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: sizes.radius,
        borderColor: colors.greyLight,
        borderWidth: 2
    },
    itemText: {
        fontFamily: 'latoBold',
        fontSize: sizes.h2,
        color: colors.black,
        marginVertical: sizes.margin,
    },
    itemDescription: {
        fontFamily: 'latoRegular',
        fontSize: sizes.h3,
        color: colors.grey
    },
    itemImage: {
        height: 100,
        flex: .5,
        margin: 1,
        borderRadius: sizes.radius
    },
    button: {
        alignItems: 'center',
        flex: .2,
        textAlign: 'center',
        width: '100%',
        justifyContent: 'flex-start',
    },
    buttonText: {
        fontFamily: 'latoBold',
        fontSize: sizes.h2,
        color: colors.grey
    }
})
