import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import BasicInput from "../basic-input";
import BasicButton from "../basic-button";
import { colors } from "../../constants";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";
import axios from "axios";

const CustomChooseDest = () => {
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleCHange = async (value) => {
    setSearchValue(value);

    setTimeout(() => {
      axios.get(`https://photon.komoot.io/api/?q=${value}`).then((res) => {
        console.log(res.data.features.map((el) => el.properties));
        return setSearchData(res.data.features.map((el) => el.properties.name));
      });
    }, 500);
    return console.log(value);
  };

  const RenderItem = (item) => {
    return (
      <TouchableOpacity onPress={() => setSearchValue(item.item)}>
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.item}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchcontainer}>
        <BasicInput
          onChangeText={(value) => handleCHange(value)}
          placeholder="write your destination here"
          icon="map-marker-check"
          value={searchValue}
          width={adaptToWidth(0.6)}
          styleView={styles.inputstyleview}
          style={styles.textinput}
        />
        {searchData.length !== 0 && (
          <FlatList
            style={styles.flatContainer}
            data={searchData}
            keyExtractor={(item, index) => index}
            renderItem={({ item }) => <RenderItem item={item} />}
          />
        )}
      </View>
      <BasicButton
        color={colors.primary}
        height={adaptToHeight(0.07)}
        width={adaptToWidth(0.5)}
        style={styles.btn}
        title="confirm"
      />
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
    backgroundColor: colors.white,
    padding: adaptToHeight(0.01),
    height: adaptToHeight(0.4),
    width: adaptToWidth(0.6),
    borderRadius: adaptToWidth(0.05),
  },
  btn: {
    borderRadius: adaptToHeight(0.02),
    zIndex: 0,
    height: adaptToHeight(0.5),
  },
  searchcontainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  item: {
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: colors.white,
  },
  itemText: {
    fontSize: adaptToHeight(0.03),

    flexWrap: "wrap",
  },
  inputstyleview: {
    width: adaptToWidth(0.6),
    height: adaptToHeight(0.07),
  },
  textinput: {
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: adaptToWidth(0.5),
  },
});
