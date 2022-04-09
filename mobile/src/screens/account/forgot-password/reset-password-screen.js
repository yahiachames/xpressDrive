import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {adaptToWidth} from "../../../config/dimensions";
import Screen from "../../../components/screen";
import * as Yup from "yup";
import {colors, images, sizes} from "../../../constants";
import CustomForm from "../../../components/forms/Form";
import FormInput from "../../../components/forms/form-input";
import SubmitButton from "../../../components/forms/submit-button";
import { PassChange } from "../../../controllers/userApis";
import routes from "../../../navigation/routes";

const initialValues = {
  password: "",
  changePassword: "",
};

const { forgerPassword3 } = images;

const ResetPasswordScreen = ({ navigation, route }) => {
  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .label("Password")
      .required()
      .min(5, "Password must have more than 4 characters "),
    changePassword: Yup.string().when("password", {
      is: (val) => val && val.length > 0,
      then: Yup.string().oneOf(
        [Yup.ref("password")],
        "Both password need to be the same"
      ),
    }),
  });

  const onSubmit = (values) => {
    console.log(route);
    PassChange(route.params.email, values.password)
      .then((res) => {
        if (res.ok) {
          navigation.navigate(routes.LOGIN, { role: route.params.role });
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <Screen style={styles.container}>
      <View style={{ flex: 0.3, alignItems: "center" }}>
        <Image
          source={forgerPassword3}
          style={styles.image}
          resizeMode="center"
        />
      </View>
      <View style={{ flex: 0.7, justifyContent: "center" }}>
        <Text style={styles.title}>Create New Password</Text>
        <Text style={styles.description}>
          New password must be different from previously used password
        </Text>
        <CustomForm
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <FormInput
            style={styles.input}
            name={"password"}
            placeholder={"New Password"}
          />
          <FormInput
            style={styles.input}
            name={"changePassword"}
            placeholder={"Confirm Password"}
          />
          <SubmitButton
            title={"Reset password"}
            style={styles.button}
            color={colors.primary}
          />
        </CustomForm>
      </View>
    </Screen>
  );
};

export default ResetPasswordScreen;

const styles = StyleSheet.create({
    container: {
        padding: sizes.padding,
    },
    image: {
        width: adaptToWidth(.5),
        height: adaptToWidth(.5),
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
        marginBottom: sizes.margin
    },
    input: {
        borderWidth: 2,
        borderColor: colors.greyLight,
        borderRadius: sizes.radius,
    },
    button: {
        backgroundColor: colors.dark,
    },
});
