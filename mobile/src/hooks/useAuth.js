import { View, Text } from "react-native";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";
import storage from "../config/storage";
import { AUTH_KEY } from "../config/config";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (user) => setUser(user);
  const logOut = () => {
    storage.removeKey(AUTH_KEY);
    setUser(null);
  };
  return { logIn, logOut };
};

export default useAuth;
