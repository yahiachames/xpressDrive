import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { CheckBox, Icon } from "react-native-elements";
import ErrorMessage from "./error-message";
import AppTextInput from "../AppInput";
import { StyleSheet } from "react-native";

const FormCheckBox = ({ name, onSelect }) => {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <>
      <CheckBox
        title={name}
        checkedIcon="dot-circle-o"
        uncheckedIcon="circle-o"
        checked={values[name]}
        onPress={() => setFieldValue(name, !values[name])}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default FormCheckBox;

const styles = StyleSheet.create({});
