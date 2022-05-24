import {useFormikContext} from "formik";
import ErrorMessage from "./error-message";
import BasicButton from "../basic-button";
import {StyleSheet, View} from "react-native";
import BasicPicker from "../basic-picker";
import {adaptToWidth} from "../../config/dimensions";
import {pickImage} from "../../config/utils";

function FormImagePicker({
                           items,
                           numberOfColumns,
                           PickerItemComponent,
                           placeholder,
                           width,
                         }) {
  const {errors, setFieldValue, touched, values} = useFormikContext();

  const handleUploadImage = async () => {
    const image = pickImage()
    if (image) {
      let label = values["imageName"];
      setFieldValue(label, image);
    }
  };

  const setValue = (value) => {
    setFieldValue("imageName", value);
  };

  return (
      <View style={styles.container}>
        <BasicButton
            icon={"camera"}
            title="upload"
            textStyle={{padding: 10}}
            onPress={() => handleUploadImage()}
            style={{width: adaptToWidth(.4)}}
        />
        <BasicPicker
            items={items}
            numberOfColumns={numberOfColumns}
            onChange={setValue}
            PickerItemComponent={PickerItemComponent}
            placeholder={"test"}
            selectedValue={values["imageName"]}
            style={{width: adaptToWidth(.4)}}
        />

        <ErrorMessage
            error={errors[values["imageName"]]}
            visible={touched[values["imageName"]]}
        />
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-around",
  },
  avatar: {
    height: adaptToWidth(.25),
    width: adaptToWidth(.25),
  },
});

export default FormImagePicker;
