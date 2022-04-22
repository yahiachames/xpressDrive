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
import { getOneRider } from "./src/controllers/RiderAPis";
import { getOneDriver } from "./src/controllers/DriversAPis";
import ProfileContext from "./src/context/ProfileContext";
import useAuth from "./src/hooks/useAuth";

export default function AppContainer() {
  const [permLocation, setPermLocation] = useState(false);
  const { socket, setSocket } = useContext(SocketContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts(fonts);
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const { persistUser } = useAuth();

  useEffect(() => {
    persistUser();
  }, []);
  useEffect(() => {
    console.log("mount");
    return console.log("unmount");
  }, []);

  return (
    <Screen>
      {fontsLoaded ? (
        <>
          <StatusBar barStyle="dark-content" />

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
        </>
      ) : (
        <AppLoading />
      )}
    </Screen>
  );
}

