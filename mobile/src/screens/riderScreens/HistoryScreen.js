import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import ProfileContext from "../../context/ProfileContext";
import { FlatList } from "react-native-gesture-handler";

const HistoryScreen = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { user } = profile;
  return (
    <View style={styles.container}>
      <Text>No rides found</Text>
    </View>
  );
};

export default HistoryScreen;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
