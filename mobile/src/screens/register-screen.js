import React, {useState} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View} from 'react-native';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import BasicInput from "../components/basic-input";
import BasicButton from "../components/basic-button";
import {Card} from "react-native-elements";
import {colors} from "../constants";
import {adaptToHeight, adaptToWidth} from "../config/dimensions";
import ScreenComponent from "../components/screen.component";
import Icon from "react-native-vector-icons/FontAwesome";

const initialValues = {
    full_name: '',
    email: '',
    password: '',
    phone: ''
};

const image = { uri: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80" };

const RegisterScreen = ({navigation}) => {

    const [selected, setSelected] = useState('')

    const validationSchema = Yup.object().shape({
        full_name: Yup.string()
            .label('Name')
            .required()
            .min(2, 'Must have at least 2 characters'),
        email: Yup.string()
            .label('Email')
            .email('Enter a valid email')
            .required('Please enter a registered email'),
        password: Yup.string()
            .label('Password')
            .required()
            .min(5, 'Password must have more than 4 characters '),
        phone: Yup.number()
            .label('Phone')
            .required()
            .min(8, 'Must have at least 8 numbers'),
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

    const Form = () => {
        return <>
            <Text style={styles.header}>Let's Start with creating your account</Text>
            <BasicInput
                style={{fontSize: adaptToHeight(0.025)}}
                containerStyle={{backgroundColor: colors.light}}
                iconSize={adaptToHeight(0.028)}
                placeholder={'Enter your full name'}
                iconName="user"
                onChangeText={handleChange('full_name')}
                value={values.full_name}
                errorMessage={touched.full_name && errors.full_name}
            />
            <BasicInput
                style={{fontSize: adaptToHeight(0.025)}}
                containerStyle={{backgroundColor: colors.light}}
                iconSize={adaptToHeight(0.028)}
                placeholder={'Enter email'}
                iconName="envelope"
                onChangeText={handleChange('email')}
                value={values.email}
                errorMessage={touched.email && errors.email}
            />
            <BasicInput
                style={{fontSize: adaptToHeight(0.025)}}
                containerStyle={{backgroundColor: colors.light}}
                iconSize={adaptToHeight(0.028)}
                placeholder={'Enter password'}
                iconName="lock"
                secureTextEntry
                onChangeText={handleChange('password')}
                value={values.password}
                errorMessage={touched.password && errors.password}
            />
                <BasicInput
                style={{fontSize: adaptToHeight(0.025)}}
                containerStyle={{backgroundColor: colors.light}}
                iconSize={adaptToHeight(0.028)}
                placeholder={'Phone Number'}
                iconName="phone"
                onChangeText={handleChange('phone')}
                value={values.phone}
                errorMessage={touched.phone && errors.phone}
            />
            <BasicButton
                title={'Sign up'}
                width={'100%'}
                color={colors.primary}
                onPress={handleSubmit}
                disabled={!isValid || isSubmitting}
                loading={isSubmitting}
            />
            <View style={styles.SubContainerButton}>
                <BasicButton
                    titleStyle={{color: colors.primary, fontSize: adaptToHeight(0.025), fontWeight: 'bold'}}
                    title={'Already have an account? LoginScreen'}
                    onPress={() => navigation.navigate('Login')}
                    color="transparent"
                    type="clear"
                />
            </View>
        </>
    }

    const ChooseType = () => {
        return <>
            <Text style={styles.ChooseText}>I'am</Text>
            <View style={styles.SelectedContainer}>
                <TouchableOpacity onPress={() => setSelected('person')} activeOpacity={.7} style={styles.Selected}>
                    <Image source={require('../../assets/images/users.png')} resizeMode='contain' style={{flex:.4 }} />
                    <Text style={styles.SelectedText}>Person</Text>
                    <BasicButton icon={
                        <Icon
                            style={styles.SelectedIcon}
                            name="arrow-right"
                            size={15}
                            color={colors.white}
                        />
                    } color={'transparent'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setSelected('driver')} activeOpacity={.7} style={styles.Selected}>
                    <Image source={require('../../assets/images/car.png')} resizeMode='contain' style={{flex:.4 }} />
                    <Text style={styles.SelectedText}>Driver</Text>
                    <BasicButton icon={
                        <Icon
                            style={styles.SelectedIcon}
                            name="arrow-right"
                            size={15}
                            color={colors.white}
                        />
                    } color={'transparent'} />
                </TouchableOpacity>
            </View>
        </>
    }

    return (
        <ImageBackground source={image} style={styles.Container} imageStyle={{opacity:0.2}}>
            {selected ? <Form /> : <ChooseType />}
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    header: {
        textAlign: 'center',
        color: colors.primary,
        fontFamily: 'latoMedium',
        fontSize: adaptToHeight(0.03),
        marginBottom: adaptToHeight(0.05)
    },
    Container: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: adaptToWidth(0.05),
        flex: 1
    },
    SubContainerButton: {
        marginTop: 35,
    },
    SelectedContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-around'
    },
    Selected: {
        width: adaptToWidth(0.4),
        height: adaptToHeight(0.3),
        backgroundColor: colors.white,
        alignItems:'center',
        justifyContent:'flex-end',
        borderRadius: 20
    },
    SelectedText: {
        flex:.6,
        fontSize: adaptToHeight(0.023),
        fontFamily: 'latoBold'
    },
    SelectedIcon: {
        backgroundColor: colors.primary, padding: 12, borderRadius: 50
    },
    ChooseText: {
        fontFamily: 'latoBold',
        fontSize: adaptToHeight(0.04),
        marginBottom: adaptToHeight(0.05),
        color: colors.primary
    }
});

export default RegisterScreen;
