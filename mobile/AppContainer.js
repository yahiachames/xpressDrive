import React, { Fragment, useState, useEffect } from "react";
import { StatusBar } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { useFonts } from "expo-font";
import { fonts } from "./src/constants/index";
import AppLoading from "expo-app-loading";

import * as Location from "expo-location";
import { persistantLogin } from "./src/redux/actions/auth-actions";
import AuthNavigator from "./src/navigation/AuthNavigator";
import AppNavigator from "./src/navigation/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { obj } from "./src/config/iinObject";
import storage from "./src/config/storage";
import { AUTH_KEY } from "./src/config/config";
import jwt_decode from "jwt-decode";

export default function AppContainer() {
  const [permLocation, setPermLocation] = useState(false);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts(fonts);
  const auth = useSelector((state) => state.auth.userData);
  console.log(auth, "authhhhhhhhh");
  const restoreUser = async () => {
    const token = await storage.getKey(AUTH_KEY);

    //decode token
    const user = token ? jwt_decode(token.split(" ")[1]) : null;
    console.log(user);
    setUser(user);
    // call user
  };

  useEffect(() => {
    console.log("dispatch executed");
    restoreUser();
    dispatch(persistantLogin(user));
  }, []);

  useEffect(() => {
    setUser(auth);
    console.log("store aurth syue", auth);
  }, [auth]);

  return (
    <Fragment>
      {fontsLoaded ? (
        <>
          <StatusBar barStyle="dark-content" />
          <NavigationContainer>
            {user ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </>
      ) : (
        <AppLoading />
      )}
    </Fragment>
  );
}
