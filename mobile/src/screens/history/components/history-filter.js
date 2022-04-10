import {StyleSheet, View} from "react-native";
import React, {useState} from "react";
import {colors, sizes} from "../../../constants";
import BasicButton from "../../../components/basic-button";

const HistoryFilter = () => {

    const [selectedFilter, setSelectedFilter] = useState('ALL');

    const filters = [
        {
            id: 'ALL',
            value: 'All',
            style: {borderBottomLeftRadius: sizes.tiny, borderTopLeftRadius: sizes.tiny},
        },
        {
            id: 'PENDING',
            value: 'Pending',
            style: {},
        },
        {
            id: 'COMPLETED',
            value: 'Completed',
            style: {},
        },
        {
            id: 'REJECTED',
            value: 'Rejected',
            style: {borderRightWidth: .7, borderBottomRightRadius: sizes.tiny, borderTopRightRadius: sizes.tiny},
        }
    ]

    return (
        <View style={styles.filterBox}>
            <View style={[styles.filterContainer]}>
                {filters.map(filter =>
                    <BasicButton
                        onPress={() => {setSelectedFilter(filter.id)}}
                        textStyle={[styles.filterTextBtn, selectedFilter === filter.id ? styles.selectedFilter : '']}
                        style={[styles.filterButton, filter.style, selectedFilter === filter.id ? {backgroundColor: colors.primary} : '']}
                        title={filter.value}/>
                )}
            </View>
        </View>
    );
};

export default HistoryFilter;

const styles = StyleSheet.create({
    filterBox: {
        backgroundColor: colors.white,
        padding: sizes.padding,
        borderBottomColor: colors.greyLight,
        borderBottomWidth: .7,
    },
    filterContainer: {
        flexDirection: "row",
    },
    filterButton: {
        flexGrow: 1,
        borderColor: colors.primary,
        backgroundColor: colors.white,
        padding: sizes.tiny,
        marginVertical: 0,
        borderRadius: 0,
        borderWidth: .7,
        borderRightWidth: 0,
    },
    filterTextBtn: {
        color: colors.dark,
        fontFamily: 'latoRegular'
    },
    selectedFilter: {
        color: colors.white,
        fontFamily: 'latoBold'
    },
});
