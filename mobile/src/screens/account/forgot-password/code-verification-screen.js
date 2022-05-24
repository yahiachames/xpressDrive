import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { adaptToHeight, adaptToWidth } from "../../../config/dimensions";
import Screen from "../../../components/screen";
import * as Yup from "yup";
import { colors, images, sizes } from "../../../constants";

import ConfirmationCode from "../../../components/confirmation-code";
import BasicButton from "../../../components/basic-button";
import Routes from "../../../navigation/routes";
import SubmitButton from "../../../components/forms/submit-button";
import CustomForm from "../../../components/forms/custom-form";
import { useSelector } from "react-redux";
import routes from "../../../navigation/routes";
import { ErrorMessage } from "../../../components/forms";
const initialValues = {
  code: "",
};

const { forgerPassword2 } = images;

const CodeVerificationScreen = ({ navigation, route }) => {
  const [failedCode, setFailedCode] = useState(false);
  console.log(route);
  const phone = useSelector((state) => state.PhoneNumber);
  const validationSchema = Yup.object().shape({
    code: Yup.string().label("Code").required("Enter a valid code number"),
  });

  const onSubmit = (values) => {
    console.log(values, "input verified code ");
    if (route.params.ucode == values.code) {
      navigation.navigate(Routes.RESET_PASSWORD, {
        email: route.params.email,
        role: route.params.role,
      });
    } else {
      setFailedCode(true);
    }
  };

  return (
    <Screen style={styles.container}>
      <View style={{ flex: 0.3, alignItems: "center" }}>
        <Image
          style={styles.image}
          source={forgerPassword2}
          resizeMode="center"
        />
      </View>
      <View style={{ flex: 0.6, justifyContent: "center" }}>
        <Text style={styles.title}>Verification</Text>
        <Text style={styles.description}>
          Enter the verification code we just sent you on your email address
        </Text>
        <CustomForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <ConfirmationCode name={"code"} />
          <SubmitButton
            title={"Verify"}
            style={styles.button}
            color={colors.primary}
          />
          <ErrorMessage error={"code incorrect"} visible={failedCode} />
        </CustomForm>
      </View>
      <View style={{ flex: 0.1 }}>
        <BasicButton
          bgColor={"transparent"}
          title={"Resend code?"}
          textColor={colors.grey}
          textStyle={styles.resendBtn}
          onPress={() => navigation.navigate(routes.FORGET_PASSWORD)}
        />
      </View>
    </Screen>
  );
};

export default CodeVerificationScreen;

const styles = StyleSheet.create({
  container: {
    padding: sizes.padding,
  },
  image: {
    width: adaptToWidth(0.4),
    height: adaptToWidth(0.4),
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
  },
  input: {
    borderWidth: 2,
    borderColor: colors.greyLight,
    borderRadius: sizes.radius,
  },
  button: {
    backgroundColor: colors.dark,
  },
  resendBtn: {
    textDecorationLine: "underline",
  },
});
