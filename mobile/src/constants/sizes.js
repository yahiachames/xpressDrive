import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

export default {
    // global sizes
    tiny: 5,
    base: 8,
    font: 15,
    radius: 10,
    padding: 10,
    margin: 10,

    // input
    inputHeight: height * .08,

    // font sizes
    h1: width * .078,
    h2: width * .062,
    h3: width * .058,
    h4: width * .052,
    h5: width * .048,
    h6: width * .042,
    input: width * .04,
    icon: width * .04,

    // app dimensions
    width,
    height
};
