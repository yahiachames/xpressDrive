import * as ImagePicker from "expo-image-picker";
import React from 'react';

export const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    if (!result.cancelled) {
        return mapResult(result)
    }
    return null
};

function mapResult(result) {
    return {
        name: result.uri.split("/")[result.uri.split("/").length - 1],
        uri: result.uri,
        type:
            "image/" +
            result.uri.split("/")[result.uri.split("/").length - 1].split(".")[
            result.uri.split("/")[result.uri.split("/").length - 1].split(".")
                .length - 1
                ],
    };
}

export const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
        alert("You've refused to allow this app to access your camera!");
        return;
    }
    const result = await ImagePicker.launchCameraAsync();
    // Explore the result
    if (!result.cancelled) {
        return mapResult(result)
    }
}

export const generateColor = () => {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    return `#${randomColor}`;
};
