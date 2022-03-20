import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

export default {
    // global sizes
    base: 8,
    tiny: 5,
    font: 15,
    radius: 10,
    padding: 10,
    margin: 10,

    // font sizes
    h1: 30,
    h2: 22,
    h3: 17,
    h4: 14,
    h5: 12,
    body1: 30,
    body2: 22,
    body3: 16,
    body4: 14,
    input: 15,
    icon: 15,

    // app dimensions
    width,
    height
};
