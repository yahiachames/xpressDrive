import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";

import ErrorMessage from "./error-message";
import BasicPicker from "../basic-picker";

function AppFormPicker({
  items,
  name,
  numberOfColumns,
  PickerItemComponent,
  placeholder,
  style,
}) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const setValue = (value) => {
    setFieldValue(name, value);
  };

  return (
    <>
      <BasicPicker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(value, itemIndex) => {
          setValue(name, value);
        }}
        onChange={setValue}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedValue={values[name]}
        style={style}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormPicker;
