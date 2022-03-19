import React, {Fragment, useEffect, useState} from "react";
import {StatusBar} from "react-native";
import {useDispatch, useSelector} from "react-redux";
import {useFonts} from "expo-font";
import {fonts} from "./src/constants/index";
import AppLoading from "expo-app-loading";
import {persistantLogin} from "./src/redux/actions/auth-actions";
import GuestStack from "./src/navigation/guest-stack";
import MainStack from "./src/navigation/main-stack";
import {NavigationContainer} from "@react-navigation/native";
import storage from "./src/config/storage";
import {AUTH_KEY} from "./src/config/config";
import jwt_decode from "jwt-decode";

export default function AppContainer() {
    const [permLocation, setPermLocation] = useState(false);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const [fontsLoaded] = useFonts(fonts);
    const auth = useSelector((state) => state.auth.userData);
    const restoreUser = async () => {
        const token = await storage.getKey(AUTH_KEY);
        //decode token & set user
        const user = token ? jwt_decode(token.split(" ")[1]) : null;
        setUser(user);
    };

    useEffect(() => {
        restoreUser();
        dispatch(persistantLogin(user));
    }, []);

    useEffect(() => {
        setUser(auth);
    }, [auth]);

    return (
        <Fragment>
            {fontsLoaded ? (
                <>
                    <StatusBar barStyle="dark-content"/>
                    <NavigationContainer>
                        {user ? <MainStack/> : <GuestStack/>}
                    </NavigationContainer>
                </>
            ) : (
                <AppLoading/>
            )}
        </Fragment>
    );
}
