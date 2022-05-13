import {FlatList, StyleSheet, TouchableOpacity, View} from "react-native";
import React, {useCallback, useMemo, useRef, useState} from "react";
import PieChart from "../../../components/pie-chart";
import {adaptToHeight, adaptToWidth} from "../../../config/dimensions";
import RatingStar from "../../../components/rating-star";
import colors from "../../../constants/colors";
import sizes from "../../../constants/sizes";
import AppText from "../../../components/custom-text";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import BottomSheet from "@gorhom/bottom-sheet";
import BasicButton from "../../../components/basic-button";
import routes from "../../../navigation/routes";

const ReviewsScreen = ({navigation}) => {

    const bottomSheet = useRef(1);
    const snapPoints = useMemo(() => ["13%", "40%"], []);
    const handleSheetChange = useCallback((index) => {
    }, []);

    const [rate, setRate] = useState(0)

    const data = [
        {
            text: "Very good",
            rate: 3
        },
        {
            text: "Just in time!",
            rate: 4
        },
    ]

    const NoData = () => {
        return (
            <View style={{flex: 1,alignItems: "center", justifyContent: "center"}}>
                <AppText style={{color: colors.grey, fontSize: sizes.h6}}>No Data</AppText>
            </View>
        )
    }

    const sendRate = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={{alignItems: "flex-start"}}>
                    <View style={{alignItems: "center", flexDirection: "row"}}>
                        <AppText style={{fontSize: sizes.h4, fontFamily: 'latoMedium'}}>4.2</AppText>
                        <TouchableOpacity onPress={() => navigation.navigate(routes.RANKING)}>
                            <AppText style={{fontSize: sizes.h8, color: colors.grey, paddingHorizontal: sizes.inch}}>(Ranking)</AppText>
                        </TouchableOpacity>
                    </View>
                    <RatingStar
                        disabled={true}
                        style={{marginVertical: sizes.inch}}
                        size={sizes.icon * 1.2}
                        rate={3}
                        color={colors.primary}
                    />
                    <View style={{alignItems: "center", flexDirection: "row"}}>
                        <MaterialCommunityIcons
                            style={styles.icon}
                            name={"note-multiple-outline"}
                        />
                        <AppText style={{
                            fontSize: sizes.h7,
                            fontFamily: 'latoRegular',
                            paddingHorizontal: sizes.inch,
                            color: colors.grey
                        }}>325 reviews</AppText>
                    </View>
                </View>
                <PieChart
                    title={"525"}
                    text={"Total Trips"}
                    width={adaptToWidth(.35)}
                    height={adaptToWidth(.35)}
                    percentage={10}
                    strokeWidth={15}
                />
            </View>
            <View style={styles.content}>
                {data ? <FlatList
                    data={data}
                    ItemSeparatorComponent={() => {
                        return <View style={{backgroundColor: colors.greyLight, height: adaptToHeight(.001)}}></View>
                    }}
                    renderItem={({item}) => {
                        return <View style={styles.rateItem}>
                            <RatingStar
                                disabled={true}
                                style={{marginVertical: sizes.inch}}
                                size={sizes.icon * 1.2}
                                rate={item.rate}
                                color={colors.primary}
                            />
                            <AppText>{item.text}</AppText>
                        </View>
                    }}/> : <NoData/>}
            </View>
            <BottomSheet
                ref={bottomSheet}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChange}
            >
               <View style={{alignItems: "center", justifyContent: "center"}}>
                   <AppText style={{marginVertical: sizes.margin}}>How was your driver?</AppText>
                   <AppText style={{marginBottom: sizes.margin, fontFamily: "latoMedium"}}>John Doe</AppText>
                   <RatingStar
                       style={{marginBottom: sizes.margin}}
                       rate={rate}
                       color={colors.primary}
                       size={sizes.icon * 2}
                       onPress={setRate}
                   />
                   <BasicButton onPress={() => sendRate()} title={"Rate Driver"} />
               </View>
            </BottomSheet>
        </View>
    );
};

export default ReviewsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: colors.white,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: sizes.padding,
        marginBottom: sizes.margin,
        flex: .3
    },
    content: {
        flex: .7
    },
    rateItem: {
        backgroundColor: colors.white,
        padding: sizes.padding
    }
});
