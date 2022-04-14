import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import BasicButton from "../../basic-button";
import { Form, FormField, FormPicker, SubmitButton } from "../../forms";
import FormImagePicker from "../../forms/FormImagePicker";
import FormListImages from "../../forms/FormListImages";
import FormCheckBox from "../../forms/FormCheckBox";
import { adaptToHeight } from "../../../config/dimensions";
import AuthContext from "../../../context/AuthContext";
import { addCar } from "../../../controllers/carApis";

const initValues = {
  serial_number: "",
  marque: "",
  chv: "",
  air_conditioner: false,
  heating: false,
  level: "normal",
  type: "",
  photo: {},
  vignettes: {},
  visite: {},
  assurance: {},
  imageName: "photo",
};

const imageNames = [];

const VehicleManagementChildModal = ({ onCancel }) => {
  const { user, setUser } = useContext(AuthContext);
  const id = user.profile.user._id;
  const PicketItemCmpt = (item) => {
    console.log(item, "from item");
    return (
      <View>
        <Text>{item}</Text>
      </View>
    );
  };
  const handlesubmit = (values) => {
    let pre_values = values;
    if (pre_values.air_conditioner && pre_values.heating) {
      pre_values["level"] = "confort";
    }
    let formdata = new FormData();
    formdata.append("serial_number", pre_values.serial_number);
    formdata.append("marque", pre_values.marque);
    formdata.append("chv", pre_values.chv);
    formdata.append("air_conditioner", pre_values.air_conditioner);
    formdata.append("heating", pre_values.heating);
    formdata.append("level", pre_values.level);
    formdata.append("type", pre_values.type);
    formdata.append("photo", pre_values.photo);
    formdata.append("vignettes", pre_values.vignettes);
    formdata.append("visite", pre_values.visite);
    formdata.append("assurance", pre_values.assurance);

    addCar(id, formdata)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <View>
      <Form initialValues={initValues} onSubmit={handlesubmit}>
        <View style={styles.container}>
          <FormField
            name="serial_number"
            placeholder="Serial Number"
            width={"60%"}
          />
          <FormField name="marque" placeholder="Marque" width={"60%"} />
          <FormField
            name="chv"
            placeholder="Cheveau"
            keyboardType="numeric"
            width={"60%"}
          />
          <FormPicker
            placeholder={"car type"}
            items={[
              { label: "sedan", value: "sedan" },
              { label: "commercial", value: "commercial" },
              { label: "citadine", value: "citadine" },
            ]}
            PickerItemComponent={PicketItemCmpt}
            name={"type"}
            style={{ width: "40%" }}
          />
          <FormCheckBox name="air_conditioner" />
          <FormCheckBox name="heating" />
          <FormImagePicker
            items={[
              { label: "photo", value: "photo" },
              { label: "vignettes", value: "vignettes" },
              { label: "assurance", value: "assurance" },
              { label: "visite", value: "visite" },
            ]}
            PickerItemComponent={PicketItemCmpt}
          />

          <FormListImages
            names={["photo", "vignettes", "assurance", "visite"]}
          />

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              justifyContent: "space-between",
              padding: adaptToHeight(0.02),
            }}
          >
            <SubmitButton
              title={"submit"}
              style={{ width: "40%", backgroundColor: "green" }}
            />
            <BasicButton
              title={"cancel"}
              onPress={() => onCancel()}
              style={{ width: "40%", backgroundColor: "red" }}
            />
          </View>
        </View>
      </Form>
    </View>
  );
};

export default VehicleManagementChildModal;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "90%",

    justifyContent: "space-around",
  },
});
