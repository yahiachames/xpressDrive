import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {adaptToWidth} from "../../../config/dimensions";
import Screen from "../../../components/screen";
import * as Yup from "yup";
import {colors, images, sizes} from "../../../constants";

import Routes from "../../../navigation/routes";
import CustomForm from "../../../components/forms/Form";
import SubmitButton from "../../../components/forms/submit-button";
import FormInput from "../../../components/forms/form-input";

const initialValues = {
    email: "",
};

const {forgerPassword1} = images

const ForgetPasswordScreen = ({navigation}) => {
    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .label("Email")
            .email("Enter a valid email")
            .required("Please enter a valid email"),
    });

    const onSubmit = (values) => {
        navigation.navigate(Routes.CODE_VERIFICATION)
    };

    return (
        <Screen>
            <Image
                source={forgerPassword1}
                style={styles.image}
                resizeMode="center"
            />
            <View style={styles.content}>
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.description}>Please enter your email address to receive a verification code</Text>
                <CustomForm
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <FormInput
                        style={styles.input}
                        name={"email"}
                        placeholder={"Email"}
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

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
    image: {
        flex: .4,
        alignSelf: 'center',
        width: adaptToWidth(.6),
        height: adaptToWidth(.6),
    },
    content: {
        flex: .7,
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
