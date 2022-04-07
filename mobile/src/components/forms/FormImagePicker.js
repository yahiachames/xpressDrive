import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import ErrorMessage from "./error-message";
import * as ImagePicker from "expo-image-picker";
import BasicButton from "../basic-button";
import { Image, StyleSheet, View } from "react-native";
import BasicPicker from "../basic-picker";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";

function FormImagePicker({
  items,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  width,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      let formatImage = {
        name: result.uri.split("/")[result.uri.split("/").length - 1],
        uri: result.uri,
        type:
          "image/" +
          result.uri.split("/")[result.uri.split("/").length - 1].split(".")[
            result.uri.split("/")[result.uri.split("/").length - 1].split(".")
              .length - 1
          ],
      };
      let label = values["imageName"];

      setFieldValue(label, formatImage);
    }
  };

  const setValue = (value) => {
    setFieldValue("imageName", value);
  };

  return (
    <View style={styles.container}>
      <BasicButton
        icon={"camera"}
        title="upload"
        textStyle={{ padding: 10 }}
        onPress={() => pickImage()}
        style={{ width: adaptToWidth(0.4) }}
      />
      <BasicPicker
        items={items}
        numberOfColumns={numberOfColumns}
        onChange={setValue}
        PickerItemComponent={PickerItemComponent}
        placeholder={"test"}
        selectedValue={values["imageName"]}
        style={{ width: adaptToWidth(0.4) }}
      />

      <ErrorMessage
        error={errors[values["imageName"]]}
        visible={touched[values["imageName"]]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-around",
  },
  avatar: {
    height: adaptToWidth(0.25),
    width: adaptToWidth(0.25),
  },
});

export default FormImagePicker;
