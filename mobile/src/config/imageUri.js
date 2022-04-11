import { AUTH_KEY } from "./config";
import Storage from "./storage";

export const imageUri = (uri, authToken) => {
  return {
    uri,
    headers: {
      Authorization: authToken,
    },
  };
};
