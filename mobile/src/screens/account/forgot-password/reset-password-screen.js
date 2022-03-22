import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {adaptToWidth} from "../../../config/dimensions";
import Screen from "../../../components/screen";
import * as Yup from "yup";
import {colors, images, sizes} from "../../../constants";

import Routes from "../../../navigation/routes";
import CustomForm from "../../../components/forms/Form";
import FormInput from "../../../components/forms/form-input";
import SubmitButton from "../../../components/forms/submit-button";

const initialValues = {
    password: "",
    changePassword: "",
};

const {forgerPassword3} = images

const ResetPasswordScreen = ({navigation}) => {
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .label("Password")
            .required()
            .min(5, "Password must have more than 4 characters "),
        changePassword: Yup.string().when("password", {
            is: val => (val && val.length > 0),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                "Both password need to be the same"
            )
        })
    });

    const onSubmit = (values) => {
        console.log(values)
    };

    return (
        <Screen style={{backgroundColor: colors.white}}>
            <Image
                source={forgerPassword3}
                style={styles.image}
                resizeMode="center"
            />
            <View style={styles.content}>
                <Text style={styles.title}>Create New Password</Text>
                <Text style={styles.description}>New password must be different from previously used password</Text>
                <CustomForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <FormInput
                        style={styles.input}
                        name={"password"}
                        placeholder={"New Password"}
                    />
                    <FormInput
                        style={[styles.input, { marginTop: sizes.margin }]}
                        name={"changePassword"}
                        placeholder={"Confirm Password"}
                    />
                    <SubmitButton
                        title={"Reset password"}
                        style={styles.button}
                        color={colors.primary}
                    />
                </CustomForm>
            </View>
        </Screen>
    );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
    image: {
        flex: .4,
        width: adaptToWidth(.6),
        alignSelf: 'center',
        height: adaptToWidth(.6),
    },
    content: {
        flex: .6,
        margin: sizes.margin * 3
    },
    title: {
        fontFamily: "latoBold",
        fontSize: sizes.h2,
        color: colors.black,
        textAlign: 'center',
        letterSpacing: 1,
        marginBottom: sizes.margin * 2
    },
    description: {
        fontFamily: "latoBold",
        fontSize: sizes.h3,
        color: colors.grey,
        textAlign: 'center',
        letterSpacing: .3,
        marginBottom: sizes.margin * 2
    },
    input: {
        borderWidth: 2,
        borderColor: colors.greyLight,
        borderRadius: sizes.radius,
    },
    button: {
        backgroundColor: colors.dark, marginTop: sizes.margin * 2
    },
});
