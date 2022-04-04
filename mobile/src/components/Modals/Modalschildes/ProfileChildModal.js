import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import React, { useContext, useState } from "react";
import { Form, FormField, SubmitButton } from "../../forms";
import * as Yup from "yup";
import { adaptToHeight, adaptToWidth } from "../../../config/dimensions";
import { colors, images } from "../../../constants";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { updateRiderProfile } from "../../../controllers/RiderAPis";
import AuthContext from "../../../context/AuthContext";
import { updateDriverProfile } from "../../../controllers/DriversAPis";

const ProfileChildModal = ({ closeModal, handleSave }) => {
  const { user, setUser } = useContext(AuthContext);
  const initValues = {
    username: "",
    fullname: "",
    email: "",
    phone: "",
    email: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().label("Username"),
    fullname: Yup.string().label("Full Name"),
    email: Yup.string().email().label("Email"),
    phone: Yup.number().min(8).label("Phone Number"),
  });
  const { defaultUser } = images;

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const handleSubmit = (initValues) => {
    console.log(initValues);
    console.log(user);
    const formData = new FormData();
    if (image) {
      let formatImage = {
        // originalname: image.uri
        //   .split("/")
        //   [image.uri.split("/").length - 1].split(".")[0],
        // path: image.uri,
        // mimetype:
        //   "image/" +
        //   image.uri.split("/")[image.uri.split("/").length - 1].split(".")[
        //     image.uri.split("/")[image.uri.split("/").length - 1].split(".")
        //       .length - 1
        //   ],
        name: image.uri.split("/")[image.uri.split("/").length - 1],
        uri: image.uri,
        type:
          "image/" +
          image.uri.split("/")[image.uri.split("/").length - 1].split(".")[
            image.uri.split("/")[image.uri.split("/").length - 1].split(".")
              .length - 1
          ],
      };

      formData.append("photo", formatImage);
    }
    formData.append("username", initValues.username);
    formData.append("fullname", initValues.fullname);
    formData.append("email", initValues.email);
    formData.append("phone", initValues.phone);

    if (user.role == "driver") {
      updateDriverProfile(user.user_id, formData)
        .then((res) => {
          closeModal();
          console.log(res);
        })
        .catch((e) => console.log(e));
    } else {
      updateRiderProfile(user.user_id, formData)
        .then((res) => {
          closeModal();
          console.log(res);
        })
        .catch((e) => console.log(e));
    }

    closeModal();
  };

  return (
    <View
      style={{
        flex: 1,

        width: "100%",
        alignItems: "center",
      }}
    >
      <Form
        initialValues={initValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <ImageBackground
          source={image ? { uri: image.uri } : defaultUser}
          style={styles.avatar}
        >
          <AntDesign
            name="camera"
            size={20}
            style={{ position: "absolute", bottom: 0, right: 0 }}
            onPress={() => pickImage()}
          />
        </ImageBackground>
        <FormField
          name="username"
          width={300}
          placeholder="Username"
          styleView={styles.field}
          icon="account"
          color={colors.blueLight}
        />
        <FormField
          name="fullname"
          width={300}
          placeholder="full name"
          styleView={styles.field}
          icon="account-cog"
          color={colors.blueLight}
        />
        <FormField
          name="email"
          width={300}
          placeholder="Email"
          styleView={styles.field}
          icon="email"
          color={colors.blueLight}
        />
        <FormField
          name="phone"
          width={300}
          placeholder="Phone Number"
          styleView={styles.field}
          icon="cellphone-iphone"
          color={colors.blueLight}
        />
        <SubmitButton
          title="save"
          style={{
            width: "70%",
            height: "10%",
            marginTop: adaptToHeight(0.05),
            backgroundColor: colors.blueLight,
          }}
          onPress={() => {
            handleSubmit();
          }}
        />
      </Form>
    </View>
  );
};

export default ProfileChildModal;

const styles = StyleSheet.create({
  field: {
    width: "100%",
    borderWidth: 1,
    height: "12%",
    borderRadius: adaptToHeight(0.02),
    backgroundColor: colors.white,
    borderColor: colors.greyLight,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 40,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: colors.white,
  },
});
