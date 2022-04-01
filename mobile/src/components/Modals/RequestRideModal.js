import { StyleSheet, Text, View, Modal } from "react-native";
import React, { useState } from "react";
import BasicButton from "../basic-button";
import { colors } from "../../constants";
import { adaptToWidth, adaptToHeight } from "../../config/dimensions";
import { TouchableWithoutFeedback } from "react-native-web";

const RequestRideModal = ({
  animationType = "slide",
  visible,
  onDismiss,
  child,
  height,
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
                height ? { height: height } : { height: adaptToHeight(0.7) },
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

export default RequestRideModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backdrop,
  },
  modalInner: {
    width: adaptToWidth(0.8),
    padding: adaptToWidth(0.1),
    backgroundColor: colors.light,
    borderRadius: 10,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
