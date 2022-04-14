import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { colors, images, sizes } from "../../constants";
import Screen from "../../components/screen";
import BasicButton from "../../components/basic-button";
import routes from "../../navigation/routes";

import { loginApi } from "../../controllers/userApis";

import FormInput from "../../components/forms/form-input";
import SubmitButton from "../../components/forms/submit-button";
import CustomForm from "../../components/forms/Form";

import { ErrorMessage } from "../../components/forms";
import { adaptToHeight } from "../../config/dimensions";
import useAuth from "../../hooks/useAuth";

const initialValues = {
  username: "",
  password: "",
};

const { login1, login2 } = images;

const LoginScreen = ({ navigation, route }) => {
  const [failedLogin, setFailedLogin] = useState(false);
  const { logIn } = useAuth();

  const validationSchema = Yup.object().shape({
    username: Yup.string().label("Username").required(),
    password: Yup.string()
      .label("Password")
      .required()
      .min(4, "Password must have more than 4 characters "),
  });

  const onSubmit = (values) => {
    let pre_values = { ...values, role: route.params.role.toLowerCase() };
    loginApi(pre_values).then((res) => {
      console.log(res);
      if (res.ok) {
        logIn(res.data.token);
      } else {
        setFailedLogin(true);
      }
    });
  };

  return (
    <Screen style={styles.container}>
      <ImageBackground
        source={login1}
        resizeMode={"cover"}
        style={styles.image}
        imageStyle={{ opacity: 1 }}
      >
        <View style={styles.filter} />
        <Image source={login2} style={styles.wave} />
      </ImageBackground>
      <View style={styles.form}>
        <Text style={styles.title}>Let's get start</Text>
        <CustomForm
          validationSchema={validationSchema}
          onSubmit={onSubmit}
          initialValues={initialValues}
        >
          <FormInput
            style={[styles.input]}
            name={"username"}
            placeholder={"Username"}
          />
          <FormInput
            style={[styles.input]}
            placeholder={"Password"}
            name={"password"}
            secureTextEntry
          />
          <SubmitButton
            title={"Login"}
            style={{
              backgroundColor: colors.primary,
            }}
            color={colors.white}
          />
          <ErrorMessage
            visible={failedLogin}
            error="incorrect username or email"
            style={{
              alignSelf: "center",
              fontSize: adaptToHeight(0.02),
              marginTop: adaptToHeight(0.01),
            }}
          />
        </CustomForm>
      </View>
      <View style={styles.footer}>
        <BasicButton
          title={"Forget password?"}
          onPress={() =>
            navigation.navigate(routes.FORGET_PASSWORD, {
              role: route.params.role.toLowerCase(),
            })
          }
          bgColor="transparent"
          type="clear"
          textColor={colors.grey}
        />
        <View style={styles.signUp}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <BasicButton
            title={"Sign Up"}
            onPress={() => navigation.navigate(routes.REGISTER)}
            bgColor="transparent"
            type="clear"
            textColor={colors.black}
          />
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: sizes.padding,
  },
  image: {
    flex: 0.35,
    margin: -sizes.margin * 2,
    position: "relative",
  },
  filter: {
    backgroundColor: colors.primary,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: sizes.width,
    opacity: 0.4,
  },
  wave: {
    position: "absolute",
    bottom: 0,
    zIndex: 55,
    tintColor: colors.white,
    width: sizes.width,
    right: 0,
    left: 0,
  },
  form: {
    flex: 0.55,
    justifyContent: "center",
  },
  title: {
    fontFamily: "latoMedium",
    color: colors.primary,
    fontSize: sizes.h1,
    alignSelf: "flex-start",
    letterSpacing: 1,
    marginBottom: sizes.margin * 2,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.greyLight,
  },
  footer: {
    flex: 0.2,
    justifyContent: "center",
  },
  footerText: {
    fontFamily: "latoRegular",
    color: colors.grey,
    fontSize: sizes.h5,
  },
  signUp: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default LoginScreen;
