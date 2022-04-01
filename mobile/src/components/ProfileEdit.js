import { StyleSheet, Text, View } from "react-native";
import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import BasicButton from "./basic-button";
import { colors } from "../constants";
import RequestRideModal from "./Modals/RequestRideModal";
import ProfileChildModal from "./Modals/Modalschildes/ProfileChildModal";

const ProfileEdit = () => {
  const { user, setUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const handleModal = (value) => {
    setShowModal(false);
  };
  return (
    <View>
      <BasicButton
        bgColor={colors.transparent}
        textColor={colors.secondary}
        title={"edit"}
        style={{ height: "auto" }}
        onPress={() => {
          setShowModal(true);
        }}
      />
      <RequestRideModal
        visible={showModal}
        child={<ProfileChildModal closeModal={handleModal} />}
      />
    </View>
  );
};

export default ProfileEdit;

const styles = StyleSheet.create({});
