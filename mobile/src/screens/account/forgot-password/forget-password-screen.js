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
        <Screen style={styles.container}>
            <Image
                source={forgerPassword1}
                style={styles.image}
                resizeMode="center"
            />
            <View style={{flex: .7}}>
                <View style={{flex: .5, justifyContent: 'center'}}>
                    <Text style={styles.title}>Forgot Password?</Text>
                    <Text style={styles.description}>Please enter your email address to receive a verification code</Text>
                </View>
                <View style={{flex: .5, justifyContent: 'center'}}>
                    <CustomForm
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <View style={{flex: 1}}>
                            <View style={{justifyContent: 'flex-start', flex: .9}}>
                                <FormInput
                                    style={styles.input}
                                    name={"email"}
                                    placeholder={"Email"}
                                />
                            </View>
                            <View style={{justifyContent: 'flex-end', flex: .1}}>
                                <SubmitButton
                                    title={"Reset password"}
                                    style={styles.button}
                                    color={colors.primary}
                                />
                            </View>
                        </View>
                    </CustomForm>
                </View>
            </View>
        </Screen>
    );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
    container: {
        padding: sizes.padding,
    },
    image: {
        flex: .3,
        alignSelf: 'center',
        width: adaptToWidth(.6),
        height: adaptToWidth(.6),
    },
    title: {
        fontFamily: "latoBold",
        fontSize: sizes.h3,
        color: colors.black,
        textAlign: 'center',
        letterSpacing: 1,
        marginBottom: sizes.margin
    },
    description: {
        fontFamily: "latoBold",
        fontSize: sizes.h4,
        color: colors.grey,
        letterSpacing: .3,
        marginBottom: sizes.margin
    },
    input: {
        borderWidth: 2,
        borderColor: colors.greyLight,
        borderRadius: sizes.radius,
    },
    button: {
        backgroundColor: colors.dark,
    },
});
