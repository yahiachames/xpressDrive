import React, {Fragment, useState} from 'react';
import {StatusBar} from 'react-native';
import store from "./src/redux/store/store";
import {Provider} from "react-redux";
import {useFonts} from "expo-font";
import {fonts} from "./src/constants/index"
import AppLoading from "expo-app-loading";
import MainStack from "./src/navigation/main-stack";
import storage from "./src/config/storage";
import {AUTH_KEY} from "./src/config/config";
import jwt_decode from "jwt-decode";

export default function App() {

    const [user, setUser] = useState();

    const [fontsLoaded] = useFonts(fonts);

    const restoreUser = async () => {
        const token = await storage.getKey(AUTH_KEY)
        //decode token
        const user = jwt_decode(token)
        setUser(user)
        // call user
    };

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
