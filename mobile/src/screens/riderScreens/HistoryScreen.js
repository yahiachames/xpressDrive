import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import ProfileContext from "../../context/ProfileContext";

const HistoryScreen = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { documents } = profile;
  useEffect(() => {
    console.log(documents.photo);
  }, [JSON.stringify(documents)]);
  const base64Image = documents.photo;
  return (
    <View style={styles.container}>
      <Text>No rides found</Text>
      <Image
        source={{ uri: `data:image/jpg;base64,${base64Image}` }}
        style={{ width: 150, height: 150 }}
      />
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
