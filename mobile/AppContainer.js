import React, { Fragment, useState, useEffect, useContext } from "react";
import { StatusBar } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { useFonts } from "expo-font";
import { fonts } from "./src/constants/index";
import AppLoading from "expo-app-loading";
import GuestStack from "./src/navigation/guest-stack";
import MainStack from "./src/navigation/main-stack";
import { NavigationContainer } from "@react-navigation/native";
import storage from "./src/config/storage";
import { AUTH_KEY, SERVER_URL, USER_Key } from "./src/config/config";
import jwt_decode from "jwt-decode";
import AuthContext from "./src/context/AuthContext";
import AppNavigator from "./src/navigation/AppNavigator";
import Screen from "./src/components/screen";
import SocketContext from "./src/context/SocketContext";

export default function AppContainer() {
  const [permLocation, setPermLocation] = useState(false);
  const { socket, setSocket } = useContext(SocketContext);
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts(fonts);
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const restoreUser = async () => {
    const token = await storage.getKey(AUTH_KEY);

    //decode token
    const user = token ? jwt_decode(token.split(" ")[1]) : undefined;
    setUser(user);
    user && setUser(user);

    console.log(user, "userrrrrrrrrr");

    // if (user.role == "driver") {
    //   getOneDriver(user.user_id).then((res) => {
    //     console.log(res.status);
    //     dispatch(profile_add(res.data.data));
    //   });
    // } else {
    //   getOneRider(user.user_id).then((res) => {
    //     console.log(res.status);
    //     dispatch(profile_add(res.data.data));
    //   });

    //   // call user
    // }
  };

  useEffect(() => {
    console.log("dispatch executed");
    return restoreUser();
  }, []);

  return (
    <Screen>
      {fontsLoaded ? (
        <>
          <StatusBar barStyle="dark-content" />
          {loading ? (
            <></>
          ) : (
            <NavigationContainer>
              {user ? (
                user.role == "driver" ? (
                  <MainStack />
                ) : (
                  <AppNavigator />
                )
              ) : (
                <GuestStack />
              )}
            </NavigationContainer>
          )}
        </>
      ) : (
        <AppLoading />
      )}
    </Screen>
  );
}

