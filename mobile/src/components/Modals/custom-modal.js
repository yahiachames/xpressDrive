import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useState } from "react";
import BasicButton from "../basic-button";
import { colors } from "../../constants";
import { adaptToWidth, adaptToHeight } from "../../config/dimensions";
import { TouchableWithoutFeedback } from "react-native-web";
import sizes from "../../constants/sizes";

const CustomModal = ({
  animationType = "slide",
  visible,
  onDismiss,
  child,
  height,
  width,
  styleModal,
}) => {
  return (
    <Modal animationType={animationType} transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={() => onDismiss()}>
        <View style={[styles.modal, styleModal]}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.modalInner,
                height ? { height: height } : { height: adaptToHeight(.7) },
                width ? { width: width } : { width: adaptToWidth(.7) },
              ]}
            >
              {child}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.backdrop,
  },
  modalInner: {
    //padding: sizes.padding,
    backgroundColor: colors.light,
  },
});
