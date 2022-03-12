import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {adaptToHeight, adaptToWidth} from "../config/dimensions";
import ScreenComponent from "../components/screen.component";
import * as Yup from "yup";
import {useFormik} from "formik";
import {colors} from "../constants";
import BasicButton from "../components/basic-button";
import BasicInput from "../components/basic-input";

const initialValues = {
    email: '',
};

const ForgetPasswordScreen = ({navigation}) => {

    const validationSchema = Yup.object().shape({
        email: Yup.string()
            .label('Email')
            .email('Enter a valid email')
            .required('Please enter a registered email'),
    });

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

    const onSubmit = values => {
    };

    return (
        <ScreenComponent>
            <View style={styles.Container}>
                <Text style={styles.Text}>Forgot Password?</Text>
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
                <BasicButton
                    title={'Reset'}
                    width={'100%'}
                    color={colors.primary}
                    onPress={handleSubmit}
                    disabled={!isValid || isSubmitting}
                    loading={isSubmitting}
                />
            </View>
        </ScreenComponent>
    )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: adaptToWidth(0.05),
    },
    Text: {
        fontFamily: 'latoBold',
        fontSize: adaptToHeight(0.032),
        marginBottom: adaptToHeight(0.1)
    }
})
