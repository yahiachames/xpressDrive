import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";

import React, { useState } from "react";
import { useFormikContext } from "formik";
import { FlatList } from "react-native-gesture-handler";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";

const FormListImages = ({ names }) => {
  const { errors, setFieldValue, touched, values } = useFormikContext();
  const [images, setImages] = useState([]);
  const renderImage = ({ item }) => {
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
          numColumns={2}
          keyExtractor={(item, index) => {
            return index;
          }}
          contentContainerStyle={styles.flatContainer}
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
  flatContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
