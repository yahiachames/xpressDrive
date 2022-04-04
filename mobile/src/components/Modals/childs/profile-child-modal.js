import {FlatList, ImageBackground, StyleSheet, Text, View} from "react-native";
import React, {useContext, useState} from "react";
import {Form, FormField, SubmitButton} from "../../forms";
import * as Yup from "yup";
import {adaptToWidth} from "../../../config/dimensions";
import {colors, images} from "../../../constants";
import {AntDesign} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import {updateRiderProfile} from "../../../controllers/RiderAPis";
import AuthContext from "../../../context/AuthContext";
import {updateDriverProfile} from "../../../controllers/DriversAPis";
import sizes from "../../../constants/sizes";
import BasicButton from "../../basic-button";
import ProfileContext from "../../../context/ProfileContext";

const ProfileChildModal = ({closeModal}) => {

    const {user, setUser} = useContext(AuthContext);

    const { profile, setProfile } = useContext(ProfileContext);

    const {data} = profile

    const initValues = {
        username: data.user.username ? data.user.username : "",
        firstname: data.user.firstname ? data.user.firstname : "",
        lastname: data.user.lastname ? data.user.lastname : "",
        gender: data.user.gender ? data.user.gender : "",
        birthday: data.user.birthday ? data.user.birthday : "",
        phone: data.user.phone ? data.user.phone : "",
        email: data.user.email ? data.user.email : "",
    };

    const items = [
        {
            name: 'username',
            label: 'Username',
            disabled: true
        },
        {
            name: 'email',
            label: 'Email',
            disabled: true
        },
        {
            name: 'phone',
            label: 'Phone Number',
            disabled: false
        },
        {
            name: 'gender',
            label: 'Gender',
            disabled: false
        },
        {
            name: 'birthday',
            label: 'Birthday',
            disabled: false
        }
    ]

    const validationSchema = Yup.object({
        lastname: Yup.string().label("Lastname").required(),
        firstname: Yup.string().label("Firstname").required(),
        username: Yup.string().label("username"),
        email: Yup.string().email().label("Email"),
        phone: Yup.number().min(8).label("Phone Number"),
        gender: Yup.string().label("Gender"),
        birthDay: Yup.string().label("BirthDay"),
    });

    const {defaultUser} = images;

    const [image, setImage] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result);
        }
    };

    const handleSubmit = (initValues) => {
        const formData = new FormData();
        if (image) {
            let formatImage = {
                name: image.uri.split("/")[image.uri.split("/").length - 1],
                uri: image.uri,
                type:
                    "image/" +
                    image.uri.split("/")[image.uri.split("/").length - 1].split(".")[
                    image.uri.split("/")[image.uri.split("/").length - 1].split(".")
                        .length - 1
                        ],
            };
            formData.append("photo", formatImage);
        }
        formData.append("username", initValues.username);
        formData.append("firstName", initValues.firstName);
        formData.append("lastName", initValues.lastName);
        formData.append("email", initValues.email);
        formData.append("phone", initValues.phone);
        formData.append("gender", initValues.gender);
        formData.append("birthDay", initValues.birthDay);
        if (user.role === "driver") {
            updateDriverProfile(user.user_id, formData)
                .then((res) => {
                    closeModal();
                })
                .catch((e) => console.log(e));
        } else {
            updateRiderProfile(user.user_id, formData)
                .then((res) => {
                    closeModal();
                })
                .catch((e) => console.log(e));
        }
        closeModal();
    };

    return (
        <Form
            initialValues={initValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
        >
            <View style={{
                backgroundColor: colors.white,
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}>
                <BasicButton
                    onPress={() => closeModal()}
                    bgColor={colors.transparent}
                    textColor={colors.greyMedium}
                    title='Cancel'
                />
                <SubmitButton
                    title='Done'
                    style={styles.action}
                    textColor={colors.primary}
                    onPress={() => {
                        handleSubmit();
                    }}
                />
            </View>
            <View style={{backgroundColor: colors.white, padding: sizes.padding, marginBottom: sizes.margin}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{flex: .3}}>
                        <ImageBackground
                            borderRadius={40}
                            source={image ? {uri: image.uri} : defaultUser}
                            style={styles.avatar}
                        >
                            <View style={styles.avatarBackdrop}>
                                <AntDesign
                                    name="camera"
                                    color={colors.primary}
                                    size={sizes.icon * 2.5}
                                    onPress={() => pickImage()}
                                />
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={{flex: .7}}>
                        <FormField
                            name="firstname"
                            placeholder="First name"
                            styleView={[styles.input, {borderBottomWidth: .7, borderBottomColor: colors.greyLight}]}
                            color={colors.black}
                        />
                        <FormField
                            name="lastname"
                            placeholder="Last name"
                            styleView={[styles.input, {borderBottomWidth: .7, borderBottomColor: colors.greyLight}]}
                            color={colors.black}
                        />
                    </View>
                </View>
                <View>
                    <BasicButton
                        bgColor={colors.transparent}
                        textColor={colors.primary}
                        textStyle={styles.text}
                        style={{alignItems: 'flex-start', padding: 0, paddingHorizontal: sizes.tiny}}
                        title={'Edit photo'}
                    />
                </View>
            </View>
            <View style={{backgroundColor: colors.white}}>
                <FlatList
                    data={items}
                    keyExtractor={(item, index) => index}
                    renderItem={({item}) =>
                        <View style={styles.item}>
                            <View style={{flex: 1}}>
                                <Text style={{marginBottom: sizes.margin}}>{[item.label]}</Text>
                            </View>
                            <View style={{flex: 1}}>
                                <FormField
                                    editable={item.disabled}
                                    name={item.name}
                                    placeholder={item.label}
                                    styleView={styles.input}
                                    color={colors.black}
                                />
                            </View>
                        </View>
                    }
                />
            </View>
        </Form>
    );
};

export default ProfileChildModal;

const styles = StyleSheet.create({
    input: {
        backgroundColor: colors.transparent,
        padding: 0
    },
    avatar: {
        height: adaptToWidth(.25),
        width: adaptToWidth(.25),
    },
    avatarBackdrop: {
        position: "absolute",
        backgroundColor: colors.backdrop,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        borderRadius: 40
    },
    item: {
        borderBottomColor: colors.greyLight,
        borderBottomWidth: .7,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: sizes.padding
    },
    action: {
        backgroundColor: colors.transparent,
    }
});
