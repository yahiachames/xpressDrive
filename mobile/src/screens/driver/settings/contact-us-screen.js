import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import React from "react";
import AppText from "../../../components/custom-text";
import {colors} from "../../../constants";
import sizes from "../../../constants/sizes";
import {LinearGradient} from 'expo-linear-gradient';
import {mail} from "../../../constants/images";
import {Fontisto, MaterialCommunityIcons} from "@expo/vector-icons";
import Form from "../../../components/forms/custom-form";
import * as Yup from "yup";
import FormInput from "../../../components/forms/form-input";
import {useFormikContext} from "formik";

const initValues = {
    name: "",
    email: "",
    message: "",
};

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .label("Name")
        .required("This field is required"),
    email: Yup.string()
        .label("Email")
        .required("This field is required"),
    message: Yup.string()
        .label("Message")
        .required("This field is required")
});

const ContactUsScreen = ({navigation}) => {

    const SubmitButton = () => {
        const {handleSubmit} = useFormikContext();
        return (
            <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={.7}
                style={{
                    height: 50,
                    width: 50,
                    borderRadius: 40,
                    backgroundColor: colors.secondary,
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <MaterialCommunityIcons
                    style={styles.icon}
                    name={"send"}
                    size={sizes.icon * 2.5}
                />
            </TouchableOpacity>
        )
    }

    const onSubmit = (values) => {
        console.log(values)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={{position: 'absolute', zIndex: 10, marginLeft: sizes.margin, top: '12%'}}
                onPress={() => {
                    navigation.goBack()
                }}
            >
                <Fontisto
                    name="angle-left"
                    size={sizes.h4}
                    color={colors.white}
                />
            </TouchableOpacity>
            <LinearGradient
                colors={['#295193', '#1f3c74']}
                style={styles.header}>
                <AppText style={styles.title}>Contact Us</AppText>
                <View style={styles.imageContainer}>
                    <Image source={mail} style={styles.image}/>
                </View>
            </LinearGradient>
            <View style={{flex: .7, marginTop: sizes.margin * 3}}>
                <Form
                    initialValues={initValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <View style={styles.body}>
                        <ScrollView>
                            <FormInput style={styles.input} name={"name"} placeholder={"name"}/>
                            <FormInput style={styles.input} name={"email"} placeholder={"email"}/>
                            <FormInput style={[styles.input, {height: sizes.textArrayInputHeight}]} name={"message"}
                                       placeholder={"message"}/>
                        </ScrollView>
                    </View>
                    <View
                        style={styles.footer}
                    >
                        <SubmitButton/>
                    </View>
                </Form>
            </View>
        </View>
    );
};

export default ContactUsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        flex: .3,
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        textTransform: "uppercase",
        color: colors.white,
        fontFamily: "latoMedium",
        fontSize: sizes.h4
    },
    imageContainer: {
        backgroundColor: colors.white,
        borderRadius: 50,
        position: "absolute",
        top: "65%",
        zIndex: 10
    },
    image: {
        height: 45,
        width: 45,
        margin: sizes.padding * 2
    },
    body: {
        flex: .8,
        backgroundColor: colors.white,
        padding: sizes.padding,
    },
    input: {
        backgroundColor: colors.light,
        borderRadius: sizes.radius,
    },
    footer: {
        backgroundColor: colors.white,
        flex: .2,
        alignItems: "center",
        justifyContent: "center",
    },
    icon: {
        color: colors.white,
    },
});
