import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import BasicButton from "../../basic-button";
import { Form, FormField, FormPicker } from "../../forms";
import FormImagePicker from "../../forms/FormImagePicker";
import FormListImages from "../../forms/FormListImages";

const initValues = {
  serial_number: "",
  marque: "",
  chv: 0,
  air_conditioner: false,
  heating: false,
  level: "normal",
  type: "sedan",
  photo: {},
  vignettes: {},
  visite: {},
  assurance: {},
  imageName: "",
};

const imageNames = [];

const VehicleManagementChildModal = ({ onCancel }) => {
  const PicketItemCmpt = (item) => {
    console.log(item, "from item");
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>CarChildModal</Text>
      <Form initialValues={initValues}>
        <FormField name="serial_number" placeholder="Serial Number" />
        <FormField name="marque" placeholder="Marque" />
        <FormField name="chv" placeholder="Cheveau" />
        <FormPicker
          placeholder={"car type"}
          items={[
            { label: "sedan", value: "sedan" },
            { label: "commercial", value: "commercial" },
            { label: "citadine", value: "citadine" },
          ]}
          PickerItemComponent={PicketItemCmpt}
          name="type"
        />
        <FormImagePicker
          items={[
            { label: "photo", value: "photo" },
            { label: "vignettes", value: "vignettes" },
            { label: "assurance", value: "assurance" },
            { label: "visite", value: "visite" },
          ]}
          PickerItemComponent={PicketItemCmpt}
        />

        <FormListImages names={["photo", "vignettes", "assurance", "visite"]} />
      </Form>
      <BasicButton title={"cancel"} onPress={() => onCancel()} />
    </View>
  );
};

export default VehicleManagementChildModal;

const styles = StyleSheet.create({});
