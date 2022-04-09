import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { adaptToHeight, adaptToWidth } from "../../../config/dimensions";
import Screen from "../../../components/screen";
import * as Yup from "yup";
import { colors, images, sizes } from "../../../constants";

import Routes from "../../../navigation/routes";
import CustomForm from "../../../components/forms/Form";
import SubmitButton from "../../../components/forms/submit-button";
import FormInput from "../../../components/forms/form-input";
import { resetPass } from "../../../controllers/userApis";

const initialValues = {
  email: "",
};

const { forgerPassword1 } = images;

const ForgetPasswordScreen = ({ navigation, route }) => {
  console.log(route);
  const [uCode, setUcode] = useState("");
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .label("Email")
      .email("Enter a valid email")
      .required("Please enter a valid email"),
  });

  const onSubmit = (values) => {
    console.log(values, "from values");
    resetPass(values.email)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          res.data.ucode;
          navigation.navigate(Routes.CODE_VERIFICATION, {
            ucode: res.data.ucode,
            email: values.email,
            role: route.params.role,
          });
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Screen style={styles.container}>
      <Image
        source={forgerPassword1}
        style={styles.image}
        resizeMode="center"
      />
      <View style={{ flex: 0.7 }}>
        <View style={{ flex: 0.5, justifyContent: "center" }}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Text style={styles.description}>
            Please enter your email address to receive a verification code
          </Text>
        </View>
        <View style={{ flex: 0.5, justifyContent: "center" }}>
          <CustomForm
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <View style={{ flex: 1 }}>
              <View style={{ justifyContent: "flex-start", flex: 0.9 }}>
                <FormInput
                  style={styles.input}
                  name={"email"}
                  placeholder={"Email"}
                />
              </View>
              <View style={{ justifyContent: "flex-end", flex: 0.1 }}>
                <SubmitButton
                  title={"Reset password"}
                  style={styles.button}
                  color={colors.primary}
                />
              </View>
            </View>
          </CustomForm>
        </View>
      </View>
    </Screen>
  );
};

export default ForgetPasswordScreen;

const styles = StyleSheet.create({
  container: {
    padding: sizes.padding,
  },
  image: {
    flex: 0.3,
    alignSelf: "center",
    width: adaptToWidth(0.6),
    height: adaptToWidth(0.6),
  },
  title: {
    fontFamily: "latoBold",
    fontSize: sizes.h3,
    color: colors.black,
    textAlign: "center",
    letterSpacing: 1,
    marginBottom: sizes.margin,
  },
  description: {
    fontFamily: "latoBold",
    fontSize: sizes.h4,
    color: colors.grey,
    letterSpacing: 0.3,
    marginBottom: sizes.margin,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.greyLight,
    borderRadius: sizes.radius,
  },
  button: {
    backgroundColor: colors.dark,
    height: adaptToHeight(0.07),
  },
});
