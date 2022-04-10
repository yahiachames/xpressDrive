import React, {useState} from "react";
import {ImageBackground, StyleSheet, Text, View,} from "react-native";
import * as Yup from "yup";
import BasicButton from "../../../components/basic-button";
import {colors, images, sizes} from "../../../constants";
import {FunctionSelect} from "./components/function-select";
import Screen from "../../../components/screen";
import routes from "../../../navigation/routes";
import FormInput from "../../../components/forms/form-input";
import SubmitButton from "../../../components/forms/submit-button";
import CustomForm from "../../../components/forms/Form";
import { signupApi } from "../../../controllers/userApis";
import { useDispatch } from "react-redux";
import { useFormikContext } from "formik";

const initialValues = {
    email: "",
    phone: "",
    role: "",
    username: "",
    password: "",
};

const { bg } = images;

const RegisterScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [selected, setSelected] = useState(false);
    const [role, setRole] = useState("");

    const validationSchema = Yup.object().shape({
      email: Yup.string()
        .label("Email")
        .email("Enter a valid email")
        .required("Please enter a valid email"),
      phone: Yup.number()
        .label("Phone")
        .required()
        .min(8, "Must have at least 8 numbers"),
      password: Yup.string().min(4, "must have at least 4 charchters"),
      username: Yup.string().min(4, "must have at least 4 charchters"),
    });

    const onSubmit = (values) => {
      const pre_values = { ...values, phone: "+216" + values.phone };
      console.log(pre_values);
      signupApi(pre_values)
        .then((res) => {
            console.log(res);
          navigation.navigate(routes.LOGIN, {
            params: { role: values.role.toLowerCase() },
          });
        })
        .catch((e) => console.warn(e));
    };

    const RegisterForm = () => {
      const { values, setFieldValue } = useFormikContext();
      return (
        <>
          <ImageBackground
            source={bg}
            resizeMode="stretch"
            style={styles.image}
          >
            <Text style={styles.title}>
              <Text style={{ fontWeight: "bold" }}>Sign up</Text>
              <Text> with email and phone number</Text>
            </Text>
          </ImageBackground>
          <View style={styles.form}>
            <View>
              <FormInput
                style={styles.input}
                placeholder={"username"}
                name={"username"}
              />
              <FormInput
                style={styles.input}
                placeholder={"name@example.com"}
                name={"email"}
              />
              <FormInput
                style={styles.input}
                placeholder={"password"}
                name={"password"}
              />
              <FormInput
                style={[styles.input]}
                placeholder={"Mobile number"}
                name={"phone"}
              />
              <SubmitButton
                title={"Sign up"}
                style={{ backgroundColor: colors.dark }}
                color={colors.white}
              />
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <BasicButton
              style={{ padding: 0 }}
              textColor={colors.black}
              title={"Sign In"}
              onPress={() => {
                console.log(role);
                navigation.navigate(routes.LOGIN, {
                  role,
                });
              }}
              bgColor="transparent"
            />
          </View>
        </>
      );
    };

    const onSelectFunction = (role) => {
      console.log(role);
      setRole(role);
      setSelected(true);
    };

    return (
      <Screen style={styles.container}>
        <CustomForm
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {selected ? (
            <RegisterForm />
          ) : (
            <FunctionSelect name={"role"} onPress={onSelectFunction} />
          )}
        </CustomForm>
      </Screen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: sizes.padding,
    },
    title: {
        color: colors.dark,
        fontFamily: 'latoRegular',
        fontSize: sizes.h2,
        padding: (sizes.padding) * 2.5,
        letterSpacing: 1
    },
    image: {
        flex: .25,
        margin: -sizes.margin * 2,
    },
    form: {
        flex: .65,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: colors.greyLight,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    footer: {
        flex: .1,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    footerText: {
        fontFamily: 'latoRegular',
        color: colors.grey,
        fontSize: sizes.h5
    },
});

export default RegisterScreen;
