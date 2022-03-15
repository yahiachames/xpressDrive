import {loginApi} from "../../controllers/userApis"
import storage from "../../config/storage";
import { AUTH_KEY } from "../../config/config";
import jwt_decode from "jwt-decode";

export function isLoading(bool) {
  return {
    type: "LOGIN_ATTEMPT",
    isLoading: bool,
  };
}

export function loginSuccess(userData) {
  return {
    type: "LOGIN_SUCCESS",
    userData,
  };
}

export function loginFailed(error) {
  return {
    type: "LOGIN_FAILED",
    error,
  };
}

export function login(username, password) {
  return (dispatch) => {
    dispatch(isLoading(true));
    return loginApi(username, password)
      .then((response) => {
        console.log(response);
        if (response.ok) {
          dispatch(isLoading(false));
          const user = jwt_decode(response.data.token);
          dispatch(loginSuccess(user));
          storage.storeKey(AUTH_KEY, response.data.token);
        } else {
          dispatch(isLoading(false));
          dispatch(loginFailed(response.data));
        }
      })
      .catch((error) => {
        dispatch(isLoading(false));
        dispatch(loginFailed(error));
      });
  };
}

export const persistantLogin = (user) => {
  return loginSuccess(user);
};
