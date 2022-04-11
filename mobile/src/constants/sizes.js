import {Dimensions} from "react-native";

const {width, height} = Dimensions.get("window");

export default {
    // global sizes
    tiny: width * .02,
    base: width * .03,
    font: width * .04,
    radius: width * .03,
    padding: width * .03,
    margin: width * .03,

    // input
    inputHeight: height * .08,

    // font sizes
    h1: width * .078,
    h2: width * .062,
    h3: width * .058,
    h4: width * .052,
    h5: width * .048,
    h6: width * .042,
    h7: width * .038,
    h8: width * .034,
    h9: width * .032,
    input: width * .04,
    icon: width * .04,

    // app dimensions
    width,
    height
};
