import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import AuthContext from "../../../context/AuthContext";
import {
  assurance,
  defaultImage,
  technical,
  vignette,
} from "../../../constants/images";
import ImagedCarouselCard from "../../imaged-carousel-card";
import { colors } from "../../../constants";
import Carousel from "../../carousel";
import { adaptToHeight, width } from "../../../config/dimensions";
import BasicButton from "../../basic-button";
import sizes from "../../../constants/sizes";
import { openCamera, pickImage } from "../../../config/utils";
import { SubmitButton } from "../../forms";
import { addCar } from "../../../controllers/carApis";
import FormCheckbox from "../../forms/form-checkbox";
import FormPicker from "../../forms/form-picker";
import FormInput from "../../forms/form-input";
import AppText from "../../custom-text";
import Form from "../../forms/custom-form";
import { MaterialCommunityIcons } from "@expo/vector-icons";

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

const carousel = [
  {
    uri: vignette,
    title: "Your vehicle photo",
    content: "Your car photo",
  },
  {
    uri: vignette,
    title: "Your car sticker",
    content: "Your car sticker",
  },
  {
    uri: assurance,
    title: "Your driving assurance",
    content: "Your driving assurance",
  },
  {
    uri: technical,
    title: "Your car visit",
    content: "Your car visit",
  },
];

const VehicleManagementChildModal = ({ onCancel }) => {
  const { user, setUser } = useContext(AuthContext);
  const carouselRef = useRef(null);
  const id = user.profile.user._id;

  const [uploadedImages, setUploadedImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [updated, setUpdated] = useState(false);

  const handleCarouselScrollEnd = (item, index) => {
    console.log(index);
    setCurrentIndex(index);
  };

  const renderCarouselItem = ({ item, index }) => {
    const { uri, title, content } = item;
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          carouselRef.current.scrollToIndex(index);
        }}
      >
        <ImagedCarouselCard height={75} width={75} text={title} source={uri} />
      </TouchableOpacity>
    );
  };

  const removeImage = () => {
    let filteredImages = uploadedImages;
    const index = uploadedImages.findIndex(
      (item) => item?.index === currentIndex
    );
    if (index !== -1) {
      filteredImages[currentIndex].image = undefined;
      console.log(filteredImages);
      setUploadedImages(filteredImages);
      setUpdated(!updated);
    }
  };

  const File = () => {
    const { image } = uploadedImages[currentIndex];
    return (
      <View style={[styles.upload]}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image source={{ uri: image?.uri }} style={styles.image} />
          <TouchableOpacity
            activeOpacity={0.3}
            onPress={() => removeImage()}
            style={{ paddingHorizontal: sizes.tiny }}
          >
            <MaterialCommunityIcons
              name="delete-circle"
              size={sizes.icon * 2}
              color={colors.danger}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const updateUploadedImages = (image) => {
    if (image) {
      const index = uploadedImages.findIndex(
        (item) => item.index === currentIndex
      );
      let images = uploadedImages;
      if (index === -1) {
        images.push({ index: currentIndex, image: image });
      } else {
        images[index].image = image;
      }
      setUploadedImages(images);
      setUpdated(!updated);
    }
  };

  const handlePressUpload = async () => {
    const image = await pickImage();
    updateUploadedImages(image);
  };

  const UploadFile = () => {
    return (
      <TouchableOpacity
        style={styles.upload}
        activeOpacity={0.7}
        onPress={() => handlePressUpload()}
      >
        <Image source={defaultImage} style={{ height: 60, width: 60 }} />
        <View style={{ marginHorizontal: sizes.margin }}>
          <AppText style={{ fontSize: sizes.h6 }}>
            Select the document from Gallery
          </AppText>
          <AppText style={{ color: colors.grey, fontSize: sizes.h8 }}>
            PNG, JPEG or PDF
          </AppText>
        </View>
      </TouchableOpacity>
    );
  };

  const handlePressCamera = async () => {
    const image = await openCamera();
    updateUploadedImages(image);
  };

  const handleSubmit = (values) => {
    let pre_values = values;
    if (pre_values.air_conditioner && pre_values.heating) {
      pre_values["level"] = "confort";
    }
    let formData = new FormData();
    formData.append("serial_number", pre_values.serial_number);
    formData.append("marque", pre_values.marque);
    formData.append("chv", pre_values.chv);
    formData.append("air_conditioner", pre_values.air_conditioner);
    formData.append("heating", pre_values.heating);
    formData.append("level", pre_values.level);
    formData.append("type", pre_values.type);
    formData.append("photo", uploadedImages[0]?.image);
    formData.append("vignettes", uploadedImages[1]?.image);
    formData.append("visite", uploadedImages[3]?.image);
    formData.append("assurance", uploadedImages[2]?.image);

    addCar(id, formData)
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  };

  useEffect(() => {}, [JSON.stringify(uploadedImages)]);

  return (
    <View style={{ flex: 1 }}>
      <Form initialValues={initValues} onSubmit={handleSubmit}>
        <BasicButton
          onPress={() => handlePressCamera()}
          bgColor={colors.secondary}
          style={styles.floatingButton}
          icon={"camera"}
          title={"Use Camera"}
          activeOpacity={0.9}
        />
        <View style={{ flex: 0.85, backgroundColor: colors.white }}>
          <ScrollView>
            <View
              style={{
                backgroundColor: colors.dark,
              }}
            >
              <Carousel
                style={styles.carousel}
                data={carousel}
                renderItem={renderCarouselItem}
                itemWidth={0.5 * width}
                inActiveOpacity={0.3}
                containerWidth={width}
                onScrollEnd={handleCarouselScrollEnd}
                ref={carouselRef}
              />
            </View>
            <View style={{ padding: sizes.padding }}>
              {uploadedImages[currentIndex]?.image ? <File /> : <UploadFile />}
              <FormInput
                name="serial_number"
                placeholder="Serial Number"
                textStyle={{ color: colors.dark }}
                style={{
                  backgroundColor: colors.light,
                  borderRadius: sizes.radius,
                  color: colors.greyMedium,
                }}
              />
              <FormInput
                name="marque"
                placeholder="Marque"
                style={{
                  backgroundColor: colors.light,
                  borderRadius: sizes.radius,
                  color: colors.greyMedium,
                }}
                textStyle={{ color: colors.dark }}
              />
              <FormInput
                name="chv"
                placeholder="Cheveau"
                keyboardType="numeric"
                style={{
                  backgroundColor: colors.light,
                  borderRadius: sizes.radius,
                  color: colors.greyMedium,
                }}
              />
              <FormPicker
                placeholder={"car type"}
                items={[
                  { label: "sedan", value: "sedan" },
                  { label: "commercial", value: "commercial" },
                  { label: "citadine", value: "citadine" },
                ]}
                PickerItemComponent={(item) => <AppText>{item}</AppText>}
                name={"type"}
                style={{
                  backgroundColor: colors.light,
                  borderRadius: sizes.radius,
                  marginBottom: sizes.margin,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: colors.light,
                  height: sizes.inputHeight,
                  borderRadius: sizes.radius,
                }}
              >
                <FormCheckbox
                  name="air_conditioner"
                  title={"Air Conditioner"}
                  style={{
                    fontFamily: "latoRegular",
                    fontSize: sizes.h6,
                    marginBottom: 0,
                  }}
                />
                <AppText> </AppText>
                <FormCheckbox
                  name="heating"
                  title={"Heating"}
                  style={{
                    fontFamily: "latoRegular",
                    fontSize: sizes.h6,
                    marginBottom: 0,
                  }}
                />
              </View>
            </View>
          </ScrollView>
        </View>
        <View style={styles.footer}>
          <SubmitButton
            title={"submit"}
            style={{
              width: "40%",
              backgroundColor: colors.success,
              marginVertical: 0,
            }}
          />
          <BasicButton
            title={"cancel"}
            onPress={() => onCancel()}
            style={{
              width: "40%",
              backgroundColor: colors.danger,
              marginVertical: 0,
            }}
          />
        </View>
      </Form>
    </View>
  );
};

export default VehicleManagementChildModal;

const styles = StyleSheet.create({
  carousel: {
    backgroundColor: colors.dark,
    aspectRatio: 1.8,
    flexGrow: 0,
    marginBottom: sizes.margin,
  },
  upload: {
    height: adaptToHeight(0.2),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    marginTop: adaptToHeight(0.07),
  },
  floatingButton: {
    position: "absolute",
    top: "30%",
    alignSelf: "center",
    borderRadius: sizes.radius * 2,
    zIndex: 10,
  },
  footer: {
    flex: 0.15,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.light,
    padding: sizes.margin,
  },
  image: {
    width: 75,
    height: 75,
    position: "relative",
  },
});
