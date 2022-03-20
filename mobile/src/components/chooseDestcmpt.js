import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, parameters } from "../global/styles";
import { Avatar, Icon } from "react-native-elements";
import AppTextInput from "./AppInput";
import { adaptToHeight, adaptToWidth } from "../config/dimensions";
import axios from "axios";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestinationAction,
  setLocation,
  updateLocation,
} from "../redux/actions/location-actions";
import { autoCompleteLoc } from "../utility/LocationUtility";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const ChoseDestCmpt = () => {
  const street = useSelector((state) => state.location.currentPoint.street);
  const dispatch = useDispatch();
  const [searchData, setSearchData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [currentPosition, setCurrentPosition] = useState("");
  const [toggleFlat, setToggleFlat] = useState(false);
  const [destination, setDestination] = useState({
    latitude: 0,

    longitude: 0,
    region: "",
    subregion: "",
    street: "",
  });

  const handleCHange = async (value) => {
    setToggleFlat(true);
    setSearchValue(value);

    setTimeout(() => {
      autoCompleteLoc(value)
        .then((res) => {
          return setSearchData(res.data.features.map((el) => el));
        })
        .catch((e) => console.log(e, "from autocomplete"));
    }, 500);
  };

  useEffect(() => {
    dispatch(setDestinationAction(destination));
  }, [JSON.stringify(destination)]);

  const RenderItem = (item) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setToggleFlat(false);
          setSearchValue(item.item.properties.name);
          setDestination({
            latitude: item.item.geometry.coordinates[1],

            longitude: item.item.geometry.coordinates[0],
            region: item.item.properties.state,
            subregion: item.item.properties.city,
            street: item.item.properties.street,
            code_postale: item.item.properties.postcode,
          });
        }}
      >
        <View style={styles.item}>
          <Text style={styles.itemText}>{item.item.properties.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.view4}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("DestinationScreen")}
        >
          <View style={styles.view6}>
            <Text style={styles.text1}>{street}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.view7}>
          <View style={styles.searchcontainer}>
            <AppTextInput
              onChangeText={(value) => handleCHange(value)}
              placeholder="write your destination here"
              icon="map-marker-check"
              value={searchValue}
              width={adaptToWidth(0.6)}
              styleView={styles.inputstyleview}
              style={styles.textinput}
              color={colors.danger}
            />
            {searchData.length !== 0 && toggleFlat && (
              <FlatList
                style={styles.flatContainer}
                data={searchData}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <RenderItem item={item} />}
              />
            )}
          </View>

          <View style={styles.view8}>
            <Icon
              type="material-community"
              name="send"
              color={colors.grey1}
              size={25}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ChoseDestCmpt;

const styles = StyleSheet.create({
  container1: { flex: 1, paddingTop: parameters.statusBarHeight },

  container: {
    flex: 1,
    paddingTop: parameters.statusBarHeight,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },

  item: {
    alignSelf: "center",
    textAlign: "center",
    backgroundColor: colors.white,
  },
  itemText: {
    fontSize: adaptToHeight(0.02),
    backgroundColor: colors.grey1,
    color: colors.white,
    flexWrap: "wrap",
  },

  flatContainer: {
    backgroundColor: colors.grey1,
    padding: adaptToHeight(0.01),
    height: adaptToHeight(0.4),
    width: adaptToWidth(0.6),
    borderRadius: adaptToWidth(0.02),
  },

  searchcontainer: {
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  view4: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  view6: {
    backgroundColor: colors.grey1,
    width: SCREEN_WIDTH * 0.7,
    height: 40,
    justifyContent: "center",
    marginTop: 10,
    paddingLeft: 0,
  },
  text1: {
    marginLeft: 10,
    fontSize: 16,
    color: colors.white,
    alignSelf: "center",
  },

  view7: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  view8: {
    marginLeft: adaptToWidth(0.01),
    top: adaptToHeight(0.03),
  },

  icon: { paddingBottom: 2 },

  inputstyleview: {
    borderRadius: 0,
    backgroundColor: colors.grey1,
  },
  textinput: {
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: adaptToWidth(0.5),
    color: colors.white,
  },
  transit: {
    top: adaptToHeight(0.03),
  },
});
