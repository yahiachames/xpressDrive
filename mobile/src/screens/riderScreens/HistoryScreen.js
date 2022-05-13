import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext, useEffect } from "react";
import ProfileContext from "../../context/ProfileContext";
import { AUTH_KEY, SERVER_URL } from "../../config/config";
import { imageUri } from "../../config/image-uri";
import Storage from "../../config/storage";

const HistoryScreen = () => {
  const { profile, setProfile } = useContext(ProfileContext);
  const { documents } = profile;
  const getToken = async () => {
    Storage.getKey(AUTH_KEY)
      .then((res) => setToken(res))
      .catch((e) => console.log(e));
  };
  useEffect(() => {
    if (profile.documents)
      console.log(imageUri(`${SERVER_URL}uploads/${profile.documents.photo}`));
    getToken();
  }, [JSON.stringify(profile), token]);
  useEffect(() => {
    console.log(documents.photo);
  }, [JSON.stringify(documents)]);
  const base64Image = documents.photo;
  return (
    <View style={styles.container}>
      <Text>No rides found</Text>
      <Image
        source={
          profile.documents
            ? imageUri(`${SERVER_URL}uploads/${profile.documents.photo}`, token)
            : { uri: "" }
        }
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
