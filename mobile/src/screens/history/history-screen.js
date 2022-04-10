import {FlatList, StyleSheet, View} from "react-native";
import React, {useContext} from "react";
import ProfileContext from "../../context/ProfileContext";
import Screen from "../../components/screen";
import AppText from "../../components/Text";
import colors from "../../constants/colors";
import HistoryFilter from "./components/history-filter";
import HistoryMetric from "./components/history-metric";
import {sizes} from "../../constants";
import HistoryItem from "./components/history-item";

const HistoryScreen = () => {

    const {profile, setProfile} = useContext(ProfileContext);
    const {user} = profile;

    let rides = [
        {
            distance: '5.2',
            price: '56',
            state: 'Completed',
            pickup: '8745 Dwarf Village',
            dropOff: '652 Win St, New york, US',
            user: {
                name: 'John doe',
                photo: ''
            }
        },
    ]

    return (
        <Screen style={{backgroundColor: colors.light}}>
            <View style={{flex: .2}}>
                <AppText style={styles.filterLabel}>Sort By</AppText>
                <HistoryFilter />
            </View>
            <View style={{flex: .2}}>
                <HistoryMetric user={user} />
            </View>
            <View style={{flex: .6}}>
                {user && user.rides && !user.rides.length ?
                    <FlatList
                        data={rides}
                        renderItem={({item})=> <HistoryItem item={item}/>}
                    /> :
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                        <AppText style={styles.empty}>No rides found</AppText>
                    </View>
                }
            </View>
        </Screen>
    );
};

export default HistoryScreen;

const styles = StyleSheet.create({
    filterLabel: {
        padding: sizes.padding,
        borderBottomColor: colors.greyLight,
        borderBottomWidth: .5,
    },
    empty: {
        color: colors.greyMedium,
        fontFamily: 'LatoRegular',
        fontSize: sizes.h6
    }
});
