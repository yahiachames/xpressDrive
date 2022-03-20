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
import { parameters } from "../../global/styles";

import { Avatar, Icon } from "react-native-elements";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";
import axios from "axios";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestinationAction,
  setLocation,
} from "../../redux/actions/location-actions";
import BasicInput from "../basic-input";
import { colors } from "../../constants";
import routes from "../../navigation/routes";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const ChoseDestCmpt = ({ navigation }) => {
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

  const ref = React.useRef(null);

  const geocodeLoc = (lat, long) => {
    axios
      .get(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`
      )
      .then((res) => {
        setCurrentPosition(res.data.address.road);
        dispatch(
          setLocation({
            latitude: lat,
            longitude: long,
            region: res.data.address.state,
            subregion: res.data.address.county,
            street: res.data.address.road,
            code_postale: res.data.address.postcode,
          })
        );
      });
  };
  const getlocation = async () => {
    try {
      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
      });
      geocodeLoc(location.coords.latitude, location.coords.longitude);

      dispatch();
    } catch (e) {
      console.log(e);
    }
  };

  const handleCHange = async (value) => {
    setToggleFlat(true);
    setSearchValue(value);

    setTimeout(() => {
      axios
        .get(`https://photon.komoot.io/api/?q=tunisie + ${value}`)
        .then((res) => {
          return setSearchData(res.data.features.map((el) => el));
        });
    }, 500);
  };
  useEffect(() => {
    getlocation();
  }, [currentPosition]);
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
            latitude: item.item.geometry.coordinates[0],

            longitude: item.item.geometry.coordinates[1],
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
            <Text style={styles.text1}>{currentPosition}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.view7}>
          <View style={styles.searchcontainer}>
            <View style={styles.view8}>
              <Icon
                type="material-community"
                name="send"
                color={colors.dark}
                size={25}
                onPress={() => {
                  navigation.navigate(routes.REQUESTS);
                }}
              />
              <BasicInput
                onChangeText={(value) => handleCHange(value)}
                placeholder="write your destination here"
                value={searchValue}
                width={adaptToWidth(0.8)}
                style={styles.inputstyleview}
                textStyle={styles.textinput}
                color={colors.light}
              />
            </View>

            {searchData.length !== 0 && toggleFlat && (
              <FlatList
                style={styles.flatContainer}
                data={searchData}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => <RenderItem item={item} />}
              />
            )}
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
    fontSize: adaptToHeight(0.025),
    backgroundColor: colors.light,
    color: colors.grey,
    flexWrap: "wrap",
  },

  flatContainer: {
    backgroundColor: colors.light,
    padding: adaptToHeight(0.01),
    height: adaptToHeight(0.3),
    width: adaptToWidth(0.6),
    borderRadius: adaptToWidth(0.02),
    margin: adaptToHeight(0.05),
    borderRadius: adaptToHeight(0.01),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  searchcontainer: {
    flexDirection: "column-reverse",
    alignItems: "center",
    justifyContent: "flex-start",
    height: adaptToHeight(0.6),
  },
  view4: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  view5: {
    backgroundColor: colors.grey7,
    width: SCREEN_WIDTH * 0.7,
    height: 40,
    justifyContent: "center",
    marginTop: 10,
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
  },

  image1: { height: 70, width: 30, marginRight: 10, marginTop: 10 },
  view7: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  view8: {
    marginLeft: adaptToWidth(0.01),
    top: adaptToHeight(0.03),
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "center",
    justifyContent: "space-around",
  },

  icon: { paddingBottom: 2 },

  image2: { height: 60, width: 60 },

  view20: { marginRight: 10 },

  text6: {
    fontSize: 15,
    color: colors.black,
    fontWeight: "bold",
  },

  text7: {
    fontSize: 28,
    color: colors.black,
    marginRight: 5,
  },

  text8: {
    fontSize: 15,
    color: colors.grey2,
    textDecorationLine: "line-through",
  },

  inputstyleview: {
    margin: adaptToHeight(0.01),
    borderRadius: 0,
    backgroundColor: colors.light,
    height: adaptToHeight(0.1),
    alignSelf: "center",
    backgroundColor: colors.light,
    borderRadius: adaptToHeight(0.01),
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 2,
  },
  textinput: {
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: adaptToWidth(0.5),
    color: colors.grey,
    backgroundColor: colors.light,
  },
  transit: {
    top: adaptToHeight(0.03),
  },
});
