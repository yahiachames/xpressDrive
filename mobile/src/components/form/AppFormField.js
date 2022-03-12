import React from "react";
import { useFormikContext } from "formik";
import AppTextInput from "../AppTextInput";
import ErrorMessage from "./ErrorMessage";
import BasicInput from "../basic-input";

function AppFormField({
  name,
  width,
  style,
  textStyle,
  onTextChange = () => {},
  ...otherProps
}) {
  const { setFieldTouched, setFieldValue, handleChange, errors, touched } =
    useFormikContext();

  return (
    <>
      <BasicInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(value) => {
          setFieldValue(name, value);
          onTextChange(value);
        }}
        textStyle={textStyle}
        {...otherProps}
        width={width}
        style={style}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormField;
