import React from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { adaptToHeight, adaptToWidth } from "../../config/dimensions";
import { colors } from "../../constants";
import NavOptions from "./nav-options";
import Carousel from "react-native-snap-carousel";
import { Dimensions } from "react-native";
import { Card } from "react-native-elements";

const CustomCarousel = () => {
  const ref = React.useRef(null);
  const images = [
    {
      img: (
        <ImageBackground
          resizeMode="cover"
          style={styles.bgi}
          source={require("../../../assets/images/car.png")}
        />
      ),
      title: "Xpress Drive",
    },
    {
      img: (
        <ImageBackground
          resizeMode="cover"
          style={styles.bgi}
          source={require("../../../assets/images/user.png")}
        />
      ),
      title: " Xpress Food",
    },
  ];

  const RenderItem = ({ item }) => {
    return (
      <View style={{ padding: adaptToWidth(0.1) }}>
        <Card>
          <Card.Title>{item.title}</Card.Title>
          <Card.Divider />
          {item.img}
        </Card>
      </View>
    );
  };

  return (
    <View style={{ padding: adaptToWidth(0.1) }}>
      <Carousel
        sliderWidth={350}
        itemWidth={350}
        renderItem={({ item, index }) => <RenderItem item={item} />}
        data={images}
      />
    </View>
  );
};

export default CustomCarousel;

const styles = StyleSheet.create({
  header: {
    color: colors.primary,
    fontSize: adaptToWidth(0.07),
    fontFamily: "latoBold",
    marginBottom: adaptToHeight(0.1),
  },
  bgi: {
    width: 200,
    height: 200,
  },
});
