import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import { adaptToHeight } from "../../../config/dimensions";
import FormCheckBox from "../../../components/forms/FormCheckBox";
import FormListImages from "../../../components/forms/FormListImages";
import FormImagePicker from "../../../components/forms/FormImagePicker";
import {
  Form,
  FormField,
  FormPicker,
  SubmitButton,
} from "../../../components/forms";
import BasicButton from "../../../components/basic-button";
import { updateDoc } from "../../../controllers/DocumentsApi";

const initValues = {
  photo: {},
  cin: {},
  permis: {},

  imageName: "photo",
};

const DocumentManagement = () => {
  const { user, setUser } = useContext(AuthContext);
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

    let formdata = new FormData();

    formdata.append("photo", pre_values.photo);
    formdata.append("cin", pre_values.cin);
    formdata.append("permis", pre_values.permis);

    console.log(pre_values, "from submit", user.user_id);
    updateDoc(user.user_id, formdata)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  return (
    <View>
      <Form initialValues={initValues} onSubmit={handlesubmit}>
        <View style={styles.container}>
          <FormImagePicker
            items={[
              { label: "photo", value: "photo" },
              { label: "cin", value: "cin" },
              { label: "permis", value: "permis" },
            ]}
            PickerItemComponent={PicketItemCmpt}
          />

          <FormListImages names={["photo", "cin", "permis"]} />

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

export default DocumentManagement;

const styles = StyleSheet.create({});
