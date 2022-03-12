import * as SecureStore from "expo-secure-store";
import {getAccount} from "../controllers/AuthApi";

const key = "authToken";

const storeToken = async (authToken) => {
    try {
        await SecureStore.setItemAsync(key, authToken);
    } catch (error) {
        console.log("Error storing the auth token", error);
    }
};

const getToken = async () => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log("Error getting the auth token", error);
    }
};

const getUser = async () => {
    const token = await getToken();
    if (token) {
        const newUser = await getAccount()
        //console.warn("new_user", newUser)
        return newUser.data
    } else {
        console.log("no token", token)
    }
};

const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log("Error removing the auth token", error);
    }
};

export default {getToken, getUser, removeToken, storeToken};
