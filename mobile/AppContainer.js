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

export default function AppContainer() {
  const [permLocation, setPermLocation] = useState(false);
  const { socket, setSocket } = useContext(SocketContext);
  const { profile, setProfile } = useContext(ProfileContext);
  const dispatch = useDispatch();
  const [fontsLoaded] = useFonts(fonts);
  const { user, setUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const getProfile = async (id, role) => {
    if (role == "driver") {
      getOneDriver(id)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((e) => console.log(e));
    } else {
      getOneRider(id)
        .then((res) => {
          setProfile(res.data);
        })
        .catch((e) => console.log(e));
    }
  };
  const restoreUser = async () => {
    const token = await storage.getKey(AUTH_KEY);

    //decode token
    if (token) {
      const user = jwt_decode(token.split(" ")[1]);
      setUser(user);
      getProfile(user.user_id, user.role);
    }
  };

  useEffect(() => {
    console.log("dispatch executed");

    restoreUser();
    setLoading(false);
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

