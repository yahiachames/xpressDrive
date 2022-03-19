import {StyleSheet} from "react-native";
import React, {useEffect} from "react";
import AppContainer from "./AppContainer";
import store from "./src/redux/store/store";
import {Provider} from "react-redux";
import * as Location from "expo-location";

const App = () => {
    useEffect(() => {
        (async () => {
            await Location.enableNetworkProviderAsync();
            let {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
            }
        })();
    }, []);

    return (
        <Provider store={store()}>
            <AppContainer/>
        </Provider>
    );
};

export default App;

const styles = StyleSheet.create({});
