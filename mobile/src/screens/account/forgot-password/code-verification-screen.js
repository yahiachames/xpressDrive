import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { adaptToWidth } from "../../../config/dimensions";
import Screen from "../../../components/screen";
import * as Yup from "yup";
import { colors, images, sizes } from "../../../constants";

import ConfirmationCode from "../../../components/confirmation-code";
import BasicButton from "../../../components/basic-button";
import Routes from "../../../navigation/routes";
import SubmitButton from "../../../components/forms/submit-button";
import CustomForm from "../../../components/forms/Form";
import { useSelector } from "react-redux";
const initialValues = {
  code: "",
};

const { forgerPassword2 } = images;

const CodeVerificationScreen = ({ navigation }) => {
  const phone = useSelector((state) => state.PhoneNumber);
  console.log(phone);
  const validationSchema = Yup.object().shape({
    code: Yup.number().label("Code").required("Enter a valid code number"),
  });

  const onSubmit = (values) => {
    navigation.navigate(Routes.RESET_PASSWORD);
  };

  return (
      <Screen style={styles.container}>
        <View style={{flex: .3, alignItems: 'center'}}>
          <Image
              style={styles.image}
              source={forgerPassword2}
              resizeMode="center"
          />
        </View>
        <View style={{flex: .6, justifyContent: 'center'}}>
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
          </CustomForm>
        </View>
        <View style={{flex: .1}}>
          <BasicButton
              bgColor={"transparent"}
              title={"Resend code?"}
              textColor={colors.grey}
              textStyle={styles.resendBtn}
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
    width: adaptToWidth(.4),
    height: adaptToWidth(.4),
  },
  title: {
    fontFamily: "latoBold",
    fontSize: sizes.h3,
    color: colors.black,
    textAlign: 'center',
    letterSpacing: 1,
    marginBottom: sizes.margin
  },
  description: {
    fontFamily: "latoBold",
    fontSize: sizes.h4,
    color: colors.grey,
    letterSpacing: .3,
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
    textDecorationLine: "underline"
  },
});
