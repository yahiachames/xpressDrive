import React, {Fragment} from 'react';
import {StatusBar} from 'react-native';
import store from "./src/store/store";
import {Provider} from "react-redux";
import {useFonts} from "expo-font";
import {fonts} from "./src/constants/index"
import AppLoading from "expo-app-loading";
import MainStack from "./src/navigation/main-stack";

export default function App() {

    const [fontsLoaded] = useFonts(fonts);

    return (
        <Provider store={store()}>
            <Fragment>
                {fontsLoaded ? (
                    <>
                        <StatusBar barStyle="dark-content"/>
                        <MainStack/>
                    </>
                ) : <AppLoading/>}
            </Fragment>
        </Provider>
    );
}
