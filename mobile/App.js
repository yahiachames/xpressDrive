import { StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import AppContainer from "./AppContainer";
import store from "./src/redux/store/store";
import { Provider } from "react-redux";
import * as Location from "expo-location";
import AuthContext from "./src/context/AuthContext";
import SocketContext from "./src/context/SocketContext";
import { io } from "socket.io-client";
import { SERVER_URL } from "./src/config/config";

const App = () => {
  const socketiNITI = io(SERVER_URL);
  const [socket, setSocket] = useState(socketiNITI);

  const [user, setUser] = useState(null);
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
    <AuthContext.Provider value={{ user, setUser }}>
      <SocketContext.Provider value={{ socket, setSocket }}>
        <Provider store={store()}>
          <AppContainer />
        </Provider>
      </SocketContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
