import * as SecureStore from "expo-secure-store";

const getKey = async (key) => {
    try {
        return await SecureStore.getItemAsync(key);
    } catch (error) {
        console.log(`Error getting the key ${key}`, error);
    }
};

const storeKey = async (key, value) => {
    try {
        await SecureStore.setItemAsync(key, value);
    } catch (error) {
        console.log(`Error storing ${key}`, error);
    }
};

const removeKey = async (key) => {
    try {
        await SecureStore.deleteItemAsync(key);
    } catch (error) {
        console.log(`Error removing the key ${key}`, error);
    }
};

export default {getKey, storeKey, removeKey};
