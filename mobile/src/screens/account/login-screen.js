import React from "react";
import * as Yup from "yup";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import {colors, images, sizes} from "../../constants";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/actions/auth-actions";
import FormInput from "../../components/form/form-input";
import SubmitButton from "../../components/form/submit-button";
import CustomForm from "../../components/form/form";
import {adaptToHeight} from "../../config/dimensions";
import Screen from "../../components/screen";
import BasicButton from "../../components/basic-button";

const initialValues = {
    username: "",
    password: "",
};

const {login1, login2} = images

const LoginScreen = ({navigation}) => {

    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .label("Username")
            .required(),
        password: Yup.string()
            .label("Password")
            .required()
            .min(5, "Password must have more than 4 characters "),
    });

    const onSubmit = (values) => {
        dispatch(login(values));
    };

    return (
        <Screen>
            <ImageBackground
                source={login1}
                resizeMode={"cover"}
                style={styles.image}
                imageStyle={{opacity: 1}}
            >
                <View style={styles.filter} />
                <Image source={login2} style={styles.wave} />
            </ImageBackground>
            <View style={styles.form}>
                <Text style={styles.title}>Let's get start</Text>
                <CustomForm
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                    initialValues={initialValues}
                >
                    <FormInput
                        style={styles.input}
                        name={"username"}
                        placeholder={"Username"}
                    />
                    <FormInput
                        style={[styles.input, {marginTop: sizes.margin * 2}]}
                        placeholder={"Password"}
                        name={"password"}
                        secureTextEntry
                    />
                    <SubmitButton
                        title={"Login"}
                        style={{backgroundColor: colors.primary, marginTop: sizes.margin * 2}}
                        color={colors.white}
                    />
                </CustomForm>
            </View>
            <View style={styles.footer}>
                <BasicButton
                    title={"Forget password?"}
                    onPress={() => navigation.navigate("ForgetPassword")}
                    bgColor="transparent"
                    type="clear"
                    textColor={colors.grey}
                />
                <View style={styles.signUp}>
                    <Text style={styles.footerText}>
                        Don't have an account?
                    </Text>
                    <BasicButton
                        title={"Sign Up"}
                        onPress={() => navigation.navigate("Register")}
                        bgColor="transparent"
                        type="clear"
                        textColor={colors.black}
                    />
                </View>
            </View>
        </Screen>
    );
};

const styles = StyleSheet.create({
    image: {
        flex: .35,
        position: 'relative'
    },
    filter: {
        backgroundColor: colors.primary,
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: sizes.width,
        opacity: .4
    },
    wave: {
        position: 'absolute',
        bottom: 0,
        zIndex: 55,
        tintColor: colors.white
    },
    form: {
        marginHorizontal: sizes.margin * 3,
        marginVertical: sizes.margin,
        flex: .4
    },
    title: {
        fontFamily: "latoMedium",
        color: colors.primary,
        fontSize: sizes.h1 * 1.1,
        alignSelf: "flex-start",
        letterSpacing: 1,
        marginBottom: sizes.margin * 3
    },
    input: {
        borderWidth: 2,
        borderColor: colors.greyLight,
    },
    footer: {
        marginTop: sizes.margin,
        marginHorizontal: sizes.margin * 3,
        flex: .3,
        justifyContent: 'center'
    },
    footerText: {
        fontFamily: 'latoRegular',
        color: colors.grey,
        fontSize: sizes.h3
    },
    signUp: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default LoginScreen;
