import React from "react";
import {useFormikContext} from "formik";
import ErrorMessage from "./error-message";
import BasicInput from "../basic-input";

function FormInput({
                       name,
                       width,
                       style,
                       textStyle,
                       errorStyle,
                       ...otherProps
                   }) {

    const {setFieldTouched, setFieldValue, handleChange, errors, touched} =
        useFormikContext();

    return (
        <>
            <BasicInput
                onBlur={() => setFieldTouched(name)}
                onChangeText={(value) => setFieldValue(name, value)}
                textStyle={textStyle}
                {...otherProps}
                width={width}
                style={style}
            />
            <ErrorMessage style={errorStyle} error={errors[name]} visible={touched[name]}/>
        </>
    );
}

export default FormInput;
