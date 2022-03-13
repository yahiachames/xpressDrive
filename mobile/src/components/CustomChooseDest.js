import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import BasicInput from "./basic-input";
import BasicButton from "./basic-button";
import { colors } from "../constants";
import { adaptToHeight, adaptToWidth } from "../config/dimensions";
import AppTextInput from "./AppInput";
import axios from "axios";

const CustomChooseDest = () => {
  const [searchData, setSearchData] = useState([]);

  const handleCHange = async (value) => {
    axios
      .get(`https://photon.komoot.io/api/?q=${value}`)
      .then((res) =>
        setSearchData(res.data.features.map((el) => el.properties.name))
      );
    return console.log(value);
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        onChangeText={(value) => handleCHange(value)}
        placeholder="write your destination here"
        icon="map-marker-check"
      />
      <BasicButton
        color={colors.primary}
        height={adaptToHeight(0.05)}
        width={adaptToWidth(0.5)}
        style={styles.btn}
        title="confirm"
      />
      {searchData.length !== 0 && (
        <FlatList
          style={styles.flatContainer}
          data={searchData}
          keyExtractor={(item, index) => index}
          renderItem={({ item }) => <Text>{item}</Text>}
        />
      )}
    </View>
  );
};

export default CustomChooseDest;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    position: "absolute",
    top: adaptToHeight(0.05),
    right: adaptToWidth(0.23),
  },
  flatContainer: {
    backgroundColor: "white",
    zIndex: 2,
  },
  btn: {
    borderRadius: adaptToHeight(0.05),
  },
});
