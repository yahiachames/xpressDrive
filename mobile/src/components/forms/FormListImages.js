import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";

import React, { useState } from "react";
import { useFormikContext } from "formik";
import { FlatList } from "react-native-gesture-handler";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";

const FormListImages = ({ names }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [images, setImages] = useState([]);
  const renderImage = ({ item }) => {
    console.log(values[item]);
    if (values[item])
      return (
        <ImageBackground
          source={{ uri: values[item].uri }}
          borderRadius={40}
          style={styles.avatar}
        />
      );
  };

  return (
    <View>
      {names && (
        <FlatList
          data={names}
          renderItem={renderImage}
          keyExtractor={(item, index) => {
            return index;
          }}
        />
      )}
    </View>
  );
};

export default FormListImages;

const styles = StyleSheet.create({
  avatar: {
    height: adaptToWidth(0.25),
    width: adaptToWidth(0.25),
  },
});
