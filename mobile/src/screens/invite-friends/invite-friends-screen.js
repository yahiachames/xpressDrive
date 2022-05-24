import {FlatList, Share, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useEffect, useState} from "react";
import BasicInput from "../../components/basic-input";
import {colors, sizes} from "../../constants";
import BasicButton from "../../components/basic-button";
import * as Contacts from "expo-contacts";
import Avatar from "../../components/avatar";
import AppText from "../../components/custom-text";
import * as SMS from "expo-sms";
import {generateColor} from "../../config/utils";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const InviteFriendsScreen = () => {

    const [contacts, setContacts] = useState([])
    const [filteredContacts, setFilteredContacts] = useState([])
    const [filteredText, setFilteredText] = useState("")
    const [selectedContacts, setSelectedContacts] = useState([])
    const [updated, setUpdated] = useState(false)

    useEffect(() => {
        (async () => {
            const {status} = await Contacts.requestPermissionsAsync();
            if (status === 'granted') {
                const {data} = await Contacts.getContactsAsync({
                    fields: [
                        Contacts.Fields.ID,
                        Contacts.PHONE_NUMBERS,
                        Contacts.EMAILS,],
                });
                const mappedData = data.map(item => {
                    return {
                        id: item?.id,
                        name: item?.name,
                        phone: item?.phoneNumbers[0]?.number,
                        color: generateColor()
                    }
                })
                if (mappedData.length > 0) {
                    setFilteredText("")
                    setContacts(mappedData)
                    setFilteredContacts(mappedData)
                }

            }
        })();
    }, []);

    const sendSMS = async () => {
        if (selectedContacts.length) {
            const phones = selectedContacts.map(contact => contact?.phone)
            const {result} = await SMS.sendSMSAsync(
                phones,
                //TODO add application link to share
                'My link',
            );
        }
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                //TODO add application link to share
                message: 'My link',
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const highLightWord = (word, highlight) => {
        const index = word.toLowerCase().indexOf(highlight)
        if (index !== -1) {
            const before = word.substring(0, index)
            const match = word.substring(index, index + highlight.length)
            const after = word.substring(index + highlight.length, word.length)
            return (
                <View style={{flexDirection: "row"}}>
                    <AppText style={{fontSize: sizes.h6}}>{before}</AppText>
                    <AppText style={{color: colors.primary, fontSize: sizes.h6}}>{match}</AppText>
                    <AppText style={{fontSize: sizes.h6}}>{after}</AppText>
                </View>
            )
        }
        return (
            <AppText style={{fontSize: sizes.h6}}>{word}</AppText>
        );
    };

    const onSelectContact = (item) => {
        let contacts = selectedContacts
        const index = selectedContacts.indexOf(item)
        index !== -1 ? contacts.splice(index, 1) : contacts.push(item)
        setSelectedContacts(contacts)
        setUpdated(!updated)
    }

    const filterContacts = (value) => {
        if (value.trim().length > 0) {
            setFilteredText(value.toLowerCase())
            const filteredData = contacts.filter(contact => {
                const {name} = contact
                return name?.toLowerCase()?.includes(value.toLowerCase())
            })
            setFilteredContacts(filteredData)
        } else {
            setFilteredText("")
            setFilteredContacts(contacts)
        }
    }

    const isItemSelected = (item) => {
        return selectedContacts.includes(item)
    }

    const ContactItem = ({item}) => {
        return <TouchableOpacity
            onPress={() => onSelectContact(item)}
            activeOpacity={.7}
            style={{
                alignItems: "center",
                flexDirection: "row",
                borderBottomWidth: .5,
                borderBottomColor: colors.greyLight,
                paddingBottom: sizes.padding
            }}
        >
            <View>
                <Avatar
                    size={sizes.avatar}
                    type={"circle"}
                    backgroundColor={item.color}
                >
                    {item.name}
                </Avatar>
                {isItemSelected(item) && <MaterialCommunityIcons
                    style={styles.icon}
                    name="check-circle"
                    size={sizes.icon}
                    color={colors.success}
                />}
            </View>
            <View style={{marginHorizontal: sizes.margin}}>
                {highLightWord(item.name, filteredText)}
                <AppText style={{color: colors.grey, fontSize: sizes.h7}}>{item.phone}</AppText>
            </View>
        </TouchableOpacity>
    }

    return (
        <View style={{flex: 1}}>
            <View style={{flex: .9}}>
                <BasicInput onChangeText={(value) => filterContacts(value)} style={styles.input}
                            placeholder={"Search contacts"}/>
                <TouchableOpacity
                    activeOpacity={.7}
                    style={styles.shareContainer}
                    onPress={() => onShare()}
                >
                    <BasicButton
                        bgColor={colors.transparent}
                        style={styles.shareBtn} iconType={"MaterialCommunityIcons"}
                        iconSize={sizes.icon * 1.3}
                        icon={"share-variant"}
                        title={"Share XDrive..."}
                        textColor={colors.grey}
                    />
                </TouchableOpacity>
                {filteredContacts.length ?
                    <FlatList
                        style={{padding: sizes.padding}}
                        data={filteredContacts}
                        renderItem={({item}) => <ContactItem item={item}/>}
                    /> : <View
                        style={{
                            flex: 1,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <AppText style={styles.noData}>No contacts found</AppText>
                    </View>}
            </View>
            {selectedContacts?.length > 0 && <TouchableOpacity
                onPress={() => sendSMS()}
                activeOpacity={.7}
                style={{
                    flex: .1,
                    backgroundColor: colors.primary,
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row"
                }}
            >
                <Avatar
                    backgroundColor={colors.white}
                    textColor={colors.primary}
                    size={sizes.avatar / 2}
                    fontSize={sizes.h5}
                    type={"circle"}
                >
                    {String(selectedContacts.length)}
                </Avatar>
                <AppText> </AppText>
                <AppText style={{color: colors.white, fontSize: sizes.h7}}>Invite To XDrive</AppText>
            </TouchableOpacity>
            }
        </View>
    );
};

export default InviteFriendsScreen;

const styles = StyleSheet.create({
    input: {
        borderBottomWidth: .5,
        borderBottomColor: colors.greyLight,
        borderRadius: 0,
        marginBottom: 0
    },
    shareContainer: {
        alignItems: "flex-start",
        justifyContent: "center",
        borderBottomWidth: .5,
        borderBottomColor: colors.greyLight,
        height: sizes.inputHeight,
    },
    shareBtn: {
        padding: 0,
        marginVertical: 0,
        marginHorizontal: 0,
    },
    noData: {
        color: colors.greyMedium,
        fontSize: sizes.h6,
    },
    icon: {
        position: "absolute",
        zIndex: 10,
        bottom: 0,
        right: 0,
        backgroundColor: colors.white,
        borderRadius: 40
    }
});
