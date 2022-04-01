import React, {useState} from "react";
import {ImageBackground, StyleSheet, Text, View,} from "react-native";
import * as Yup from "yup";
import BasicButton from "../../../components/basic-button";
import {colors, images, sizes} from "../../../constants";
import {adaptToHeight, adaptToWidth} from "../../../config/dimensions";
import {FunctionSelect} from "./components/function-select";
import BasicPicker from "../../../components/basic-picker";
import { countriesPhoneCodesData } from "../../../global/data";
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
        navigation.navigate(routes.LOGIN);
      })
      .catch((e) => console.warn(e));
  };

  const RegisterForm = () => {
    const { values, setFieldValue } = useFormikContext();
    return (
      <>
        <ImageBackground source={bg} resizeMode="stretch" style={styles.image}>
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
            <View style={styles.phoneInputContainer}>
              <View style={styles.pickerContainer}>
                <BasicPicker
                  enabled={false}
                  mode={"dropdown"}
                  items={countriesPhoneCodesData}
                  onChange={(code) => {
                    console.log(code);
                    setFieldValue("phone", code + values["phone"]);
                  }}
                />
              </View>
              <View style={styles.phoneCodeContainer}>
                <Text style={styles.phoneCodeText}>+216</Text>
              </View>
              <View style={{ flex: 0.6 }}>
                <FormInput
                  errorStyle={{ marginLeft: -adaptToWidth(0.35) }}
                  style={[styles.input, { borderLeftWidth: 0 }]}
                  placeholder={"Mobile number"}
                  name={"phone"}
                />
              </View>
            </View>
            <SubmitButton
              title={"Sign up"}
              style={{ backgroundColor: colors.dark }}
              color={colors.white}
            />
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.signIn}>
            <Text style={styles.footerText}>Already have an account?</Text>
            <BasicButton
              textColor={colors.black}
              title={"Sign In"}
              onPress={() => navigation.navigate(routes.LOGIN)}
              bgColor="transparent"
              type="clear"
            />
          </View>
        </View>
      </>
    );
  };

  const onSelectFunction = (role) => {};

  return (
    <Screen style={{ backgroundColor: colors.white }}>
      <CustomForm
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {selected ? (
          <RegisterForm />
        ) : (
          <FunctionSelect name={"role"} onPress={() => setSelected(true)} />
        )}
      </CustomForm>
    </Screen>
  );
};

const styles = StyleSheet.create({
    title: {
        color: colors.dark,
        fontFamily: 'latoRegular',
        fontSize: sizes.h1,
        padding: (sizes.padding) * 3,
        letterSpacing: 1
    },
    image: {
        flex: .4,
    },
    form: {
        flex: .4,
        paddingHorizontal: sizes.padding * 3,
        justifyContent: 'center',
    },
    input: {
        borderWidth: 2,
        borderColor: colors.greyLight,
    },
    phoneInputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginVertical: sizes.margin * 2
    },
    pickerContainer: {
        flex: .3,
        borderWidth: 2,
        borderColor: colors.greyLight,
        borderRightWidth: 0,
        borderTopLeftRadius: sizes.radius,
        borderBottomLeftRadius: sizes.radius,
        height: adaptToHeight(0.08),
    },
    phoneCodeContainer: {
        height: adaptToHeight(0.08),
        flex: .15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.greyLight,
        borderRightWidth: 0,
        marginRight: -sizes.margin
    },
    phoneCodeText: {
        textAlign: 'center',
        color: colors.dark,
        fontFamily: 'latoMedium',
        fontSize: sizes.input,
    },
    footer: {
        flex: .2,
        justifyContent: 'center',
        marginHorizontal: sizes.margin * 3,
    },
    footerText: {
        fontFamily: 'latoRegular',
        color: colors.grey,
        fontSize: sizes.h3
    },
    signIn: {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default RegisterScreen;
