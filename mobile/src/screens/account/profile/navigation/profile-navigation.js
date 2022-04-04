import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, { useState, useContext } from "react";
import AuthContext from "../../../../context/AuthContext";
import BasicButton from "../../../../components/basic-button";
import { colors } from "../../../../constants";
import CustomModal from "../../../../components/Modals/custom-modal";
import ProfileChildModal from "../../../../components/Modals/childs/profile-child-modal";
import sizes from "../../../../constants/sizes";
import AppText from "../../../../components/Text";

const ProfileNavigation = () => {
  const { user, setUser } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const handleModal = (value) => {
    setShowModal(false);
  };
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setShowModal(true);
        }}
      >
          <AppText style={{color: colors.secondary}}>Edit</AppText>
      </TouchableOpacity>
      <CustomModal
        height={sizes.height}
        width={sizes.width}
        visible={showModal}
        child={<ProfileChildModal closeModal={handleModal} />}
      />
    </View>
  );
};

export default ProfileNavigation;

const styles = StyleSheet.create({});
