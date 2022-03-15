import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AppContainer from "./AppContainer";
import store from "./src/redux/store/store";
import { Provider } from "react-redux";
import * as Location from "expo-location";

const App = () => {
  useEffect(() => {
    (async () => {
      Location.enableNetworkProviderAsync();
      let { status } = await Location.requestForegroundPermissionsAsync();
      let { status: tstatus } =
        await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  return (
    <Provider store={store()}>
      <AppContainer />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
