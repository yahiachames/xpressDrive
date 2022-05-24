import {StyleSheet, TouchableOpacity, View} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../../constants";
import CustomModal from "../../../../components/Modals/custom-modal";
import ProfileChildModal from "../../../../components/Modals/childs/profile-child-modal";
import sizes from "../../../../constants/sizes";
import AppText from "../../../../components/custom-text";

const ProfileNavigation = () => {

  const [showModal, setShowModal] = useState(false);

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
        child={<ProfileChildModal closeModal={() => setShowModal(false)} />}
      />
    </View>
  );
};

export default ProfileNavigation;

const styles = StyleSheet.create({});
