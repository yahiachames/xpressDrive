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

export default function AppContainer() {
  const [permLocation, setPermLocation] = useState(false);
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts(fonts);
  const auth = useSelector((state) => state.auth.userData);
  console.log(auth, "authhhhhhhhh");
  // const restoreUser = async () => {
  //   const token = await storage.getKey(AUTH_KEY);
  //   console.log(token);
  //   //decode token
  //   const user = jwt_decode(token);
  //   console.log(user);
  //   setUser(user);
  //   // call user
  // };

  useEffect(() => {
    dispatch(persistantLogin);
  }, [auth]);

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
            {obj(user, "sub") ? <AppNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </>
      ) : (
        <AppLoading />
      )}
    </Fragment>
  );
}
