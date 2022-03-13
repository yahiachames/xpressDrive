import * as Yup from 'yup';
import {useFormik} from 'formik';
import BasicInput from "../components/basic-input";
import BasicButton from "../components/basic-button";
import {ImageBackground, StyleSheet, Text, View} from "react-native";
import {adaptToHeight, adaptToWidth} from "../config/dimensions";
import {colors} from "../constants";
import {APP_NAME} from "../config/config";
<<<<<<< HEAD
import CustomChooseDest from "../components/CustomChooseDest";
=======
import {useDispatch, useSelector} from "react-redux";
import {login} from "../redux/actions/auth-actions";
import {useEffect} from "react";
>>>>>>> 47ee741776eec6487e1305f002de0f12f16f6502

const initialValues = {
    email: '',
    password: '',
};

const image = { uri: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" };

const LoginScreen = ({navigation}) => {

    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .label('Email')
            .email('Enter a valid email')
            .required('Please enter a registered email'),
        password: Yup.string()
            .label('Password')
            .required()
            .min(5, 'Password must have more than 4 characters '),
    });

    const onSubmit = (values) => {
        console.log(values)
        dispatch(login(values))
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    const {
        values,
        touched,
        errors,
        handleChange,
        isSubmitting,
        isValid,
        handleSubmit,
    } = formik;

    return (
        <View style={styles.Container}>
            <ImageBackground source={image} style={styles.image}  imageStyle={{opacity:0.2}}>
                <Text style={styles.header}>{APP_NAME}</Text>
                <Text style={styles.text}>Welcome back!</Text>
                <BasicInput
                    style={{fontSize: adaptToHeight(0.025)}}
                    placeholder={'Enter e-mail'}
                    iconName="envelope"
                    iconSize={adaptToHeight(0.028)}
                    containerStyle={{backgroundColor: colors.light}}
                    onChangeText={handleChange('email')}
                    value={values.email}
                    errorMessage={touched.email && errors.email}
                />
                <BasicInput
                    style={{fontSize: adaptToHeight(0.025)}}
                    placeholder={'Enter password'}
                    iconName="lock"
                    iconSize={adaptToHeight(0.035)}
                    containerStyle={{backgroundColor: colors.light}}
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    value={values.password}
                    errorMessage={touched.password && errors.password}
                />
                <BasicButton
                    title={'Login'}
                    width={'100%'}
                    color={colors.primary}
                    onPress={handleSubmit}
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                />
                <View style={styles.ForgetPassword}>
                    <BasicButton
                        titleStyle={{color: colors.primary, fontSize: adaptToHeight(0.025)}}
                        title={"Forget password?"}
                        onPress={() => navigation.navigate('ForgetPassword')}
                        color="transparent"
                        type="clear"
                    />
                </View>
                {/*<View style={styles.SocialContainer}>
                    <BasicButton
                        titleStyle={{color: colors.danger, fontSize: adaptToHeight(0.025)}}
                        title={"Google"}
                        style={styles.SocialBtn}
                        width={'50%'}
                        onPress={() => console.log('google')}
                        color="transparent"
                        type="clear"
                    />
                    <View style={{width: '1%'}} />
                    <BasicButton
                        titleStyle={{color: colors.blue, fontSize: adaptToHeight(0.025)}}
                        title={"Facebook"}
                        style={styles.SocialBtn}
                        width={'50%'}
                        onPress={() => console.log('facebook')}
                        color="transparent"
                        type="clear"
                    />
                </View>*/}
                <View style={styles.SignUp}>
                    <Text style={{fontSize: adaptToHeight(0.025), color: colors.gray}}>Don't have an account?</Text>
                    <BasicButton
                        titleStyle={{color: colors.primary, fontSize: adaptToHeight(0.025), fontWeight: 'bold'}}
                        title={"Sign Up"}
                        onPress={() => navigation.navigate('Register')}
                        color="transparent"
                        type="clear"
                    />
                </View>
                <View style={styles.CircleLeft} />
                <View style={styles.CircleRight} />
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        fontFamily: 'yellowtail',
        color: colors.primary,
        fontSize: adaptToHeight(0.06),
        marginBottom: adaptToHeight(0.05),
    },
    text: {
      fontFamily: 'latoMedium',
      color: colors.primary,
      fontSize: adaptToHeight(0.032),
      alignSelf: 'flex-start',
      marginBottom: adaptToHeight(0.02)
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: adaptToWidth(0.05),
    },
    ForgetPassword: {
    },
    SocialContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    SocialBtn: {
        borderWidth: 2,
        borderRadius: 10,
        borderColor: colors.primary
    },
    Container: {
        flex: 1,
    },
    SignUp: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    CircleLeft: {
        width: 150,
        height: 150,
        borderRadius: 80,
        position: 'absolute',
        left: -adaptToWidth(0.2),
        bottom: -adaptToHeight(0.2),
        backgroundColor: colors.redLight
    },
    CircleRight: {
        width: 250,
        height: 250,
        borderRadius: 150,
        position: 'absolute',
        right: -adaptToWidth(0.3),
        bottom: -adaptToHeight(0.3),
        backgroundColor: colors.pinkLight
    }
});

export default LoginScreen;

