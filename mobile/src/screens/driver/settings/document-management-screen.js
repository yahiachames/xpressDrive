import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useContext, useRef, useState} from "react";
import AuthContext from "../../../context/AuthContext";
import ImagedCarouselCard from "../../../components/imaged-carousel-card";
import {adaptToWidth, width} from "../../../config/dimensions";
import Carousel from "../../../components/carousel";
import AppText from "../../../components/custom-text";
import {colors, images} from "../../../constants";
import sizes from "../../../constants/sizes";
import BasicButton from "../../../components/basic-button";
import {openCamera, pickImage} from "../../../config/utils";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import {updateDoc} from "../../../controllers/DocumentsApi";

const {defaultImage, driverLicence, cin, avatar} = images;

const carousel = [
    {
        uri: avatar,
        title: 'Your Avatar',
        content: 'Your avatar',
    },
    {
        uri: cin,
        title: 'Your Identification Card',
        content: 'Your Cin card',
    },
    {
        uri: driverLicence,
        title: 'Your driving licence',
        content: 'Your driving licence card',
    },
];

const DocumentManagementScreen = () => {

    const {user, setUser} = useContext(AuthContext);
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [updated, setUpdated] = useState(false)

    const updateUploadedImages = (image) => {
        if (image) {
            const index = uploadedImages.findIndex(item => item.index === currentIndex)
            let images = uploadedImages
            if (index === -1) {
                images.push({index: currentIndex, image: image})
            } else {
                images[index].image = image
            }
            setUploadedImages(images)
            setUpdated(!updated)
        }
    };

    const handlePressCamera = async () => {
        const image = await openCamera()
        updateUploadedImages(image)
    }

    const handlePressUpload = async () => {
        const image = await pickImage()
        updateUploadedImages(image)
    }

    const removeImage = () => {
        let filteredImages = uploadedImages
        const index = uploadedImages.findIndex(item => item.index === currentIndex)
        if (index !== -1) {
            filteredImages.splice(index, 1)
            setUploadedImages(filteredImages)
            setUpdated(!updated)
        }
    }

    const handleCarouselScrollEnd = (item, index) => {
        setCurrentIndex(index);
    }

    const renderCarouselItem = ({item, index}) => {
        const {uri, title, content} = item;
        return (
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                    carouselRef.current.scrollToIndex(index);
                }}>
                <ImagedCarouselCard
                    height={100}
                    width={125}
                    text={title}
                    source={uri}
                />
            </TouchableOpacity>
        );
    }

    const File = () => {
        const {image} = uploadedImages[currentIndex]
        return (
            <View style={[styles.upload]}>
                <View style={{flexDirection: "row", alignItems: "center"}}>
                    <Image
                        source={{uri: image.uri}}
                        style={styles.image}
                    />
                    <TouchableOpacity
                        activeOpacity={.3}
                        onPress={() => removeImage()}
                        style={{paddingHorizontal: sizes.tiny}}
                    >
                        <MaterialCommunityIcons
                            name="delete-circle"
                            size={sizes.icon * 2}
                            color={colors.danger}
                        />
                    </TouchableOpacity>
                </View>
            </View>

        )
    }

    const UploadFile = () => {
        return (
            <TouchableOpacity
                style={styles.upload}
                activeOpacity={.7}
                onPress={() => handlePressUpload()}
            >
                <Image source={defaultImage} style={{height: 60, width: 60}}/>
                <View style={{marginHorizontal: sizes.margin}}>
                    <AppText style={{fontSize: sizes.h6}}>Select the document from Gallery</AppText>
                    <AppText style={{color: colors.grey, fontSize: sizes.h8}}>PNG, JPEG or PDF</AppText>
                </View>
            </TouchableOpacity>
        )
    }

    const getUploadedImageByIndex = (index) => {
        const i = uploadedImages.findIndex(item => item.index === index)
        if(i !== -1) {
            return uploadedImages[i]?.image
        }
        return null
    }

    const onSubmit = () => {
        let formData = new FormData();
        formData.append("photo", getUploadedImageByIndex(0));
        formData.append("cin",  getUploadedImageByIndex(1));
        formData.append("permis",  getUploadedImageByIndex(2));
        updateDoc(id, formData)
            .then((res) => console.log(res))
            .catch((e) => console.log(e));
    }

    return (
        <View style={{flex: 1}}>
            <View style={{
                flex: .4,
                backgroundColor: colors.dark,
            }}>
                <Carousel
                    style={styles.carousel}
                    data={carousel}
                    renderItem={renderCarouselItem}
                    itemWidth={.5 * width}
                    inActiveOpacity={.3}
                    containerWidth={width}
                    onScrollEnd={handleCarouselScrollEnd}
                    ref={carouselRef}
                />
            </View>
            <BasicButton
                onPress={() => handlePressCamera()}
                bgColor={colors.secondary}
                style={styles.floatingButton}
                icon={"camera"}
                title={"Use Camera"}
                activeOpacity={.9}
            />
            {uploadedImages[currentIndex] ? <File/> : <UploadFile/>}
            <View style={styles.footer}>
                <BasicButton
                    onPress={() => onSubmit()}
                    bgColor={colors.primary}
                    style={styles.btn}
                    title={"Confirm"}
                />
            </View>
        </View>
    );
};

export default DocumentManagementScreen;

const styles = StyleSheet.create({
    carousel: {
        backgroundColor: colors.dark,
        aspectRatio: 1.8,
        flexGrow: 0,
        marginBottom: sizes.margin,
    },
    upload: {
        flex: .5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.light
    },
    floatingButton: {
        position: 'absolute',
        top: '34%',
        alignSelf: 'center',
        borderRadius: sizes.radius * 2,
        zIndex: 10
    },
    image: {
        width: 100,
        height: 100,
        position: "relative",
    },
    footer: {
        flex: .1,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: .7,
        borderTopColor: colors.greyLight
    },
    btn: {
        borderRadius: sizes.radius * 2,
        marginVertical: 0,
        width: adaptToWidth(.4)
    }
});
