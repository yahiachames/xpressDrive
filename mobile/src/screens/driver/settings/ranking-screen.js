import {FlatList, StyleSheet, View} from "react-native";
import React from "react";
import AppText from "../../../components/custom-text";
import sizes from "../../../constants/sizes";
import colors from "../../../constants/colors";

const RankingScreen = () => {

    const rank = [
        {
            position: "1",
            name: "John Doe",
            rate: '4.5'
        }
    ]

    const RankItem = ({item}) => {
        return <View style={{alignItems: "center", justifyContent: "flex-start", flexDirection: "row"}}>
            <AppText style={{flex: .2, fontSize: sizes.h6}}>{item.position}</AppText>
            <AppText style={{flex: .5, fontSize: sizes.h6,}}>{item.name}</AppText>
            <View style={{flex: .3, padding: sizes.tiny,}}>
                <View style={{padding: sizes.tiny, backgroundColor: colors.light, alignItems: "center"}}>
                    <AppText style={{fontSize: sizes.h6}}>{item.rate}</AppText>
                </View>
            </View>
        </View>
    }

    const NoData = () => {
        return (
            <View style={{alignItems: "center", justifyContent: "center", flex: 1}}>
                <AppText style={{color: colors.grey, fontSize: sizes.h6}}>No Data</AppText>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={{flex: .1,paddingVertical: sizes.padding, alignItems: 'center', justifyContent: "center", flexDirection: "row"}}>
                <AppText style={{color: colors.primary, fontSize: sizes.h3 }}>14 </AppText>
                <AppText style={{fontSize: sizes.h5}}> / 123</AppText>
            </View>
            <View style={{flex: .1, alignItems: "center", justifyContent: "flex-start", flexDirection: "row", borderBottomWidth: .5, borderBottomColor: colors.greyLight, paddingBottom: sizes.tiny}}>
                <AppText style={{flex: .2, fontSize: sizes.h6, color: colors.grey, fontFamily: "latoRegular"}}>Position</AppText>
                <AppText style={{flex: .5, fontSize: sizes.h6, color: colors.grey, fontFamily: "latoRegular"}}>Driver</AppText>
                <AppText style={{flex: .3, fontSize: sizes.h6, color: colors.grey, fontFamily: "latoRegular"}}>Rate</AppText>
            </View>
            <View style={{flex: .8}}>
                {rank ? <FlatList data={rank} renderItem={({item}) => <RankItem item={item} />} /> : <NoData/>}
            </View>
        </View>
    );
};

export default RankingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: sizes.padding
    }
});
