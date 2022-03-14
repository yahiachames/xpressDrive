import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AppContainer from "./AppContainer";
import store from "./src/redux/store/store";
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store()}>
      <AppContainer />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
