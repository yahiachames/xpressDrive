import React from "react";
import {useFormikContext} from "formik";
import ErrorMessage from "./error-message";
import {StyleSheet} from "react-native";
import CustomCheckBox from "../custom-checkbox";

const FormCheckbox = ({name, title, ...props}) => {
    const {setFieldValue, errors, touched, values} =
        useFormikContext();

    return (
        <>
            <CustomCheckBox
                title={title}
                checked={values[name]}
                onCheck={() => setFieldValue(name, !values[name])}
                {...props}
            />
            <ErrorMessage error={errors[name]} visible={touched[name]}/>
        </>
    );
};

export default FormCheckbox;

const styles = StyleSheet.create({});
