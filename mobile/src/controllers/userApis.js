import api from "./ApiConfig";

export const loginApi = (username, password) =>
  api.post("users/login", {
    username,
    password,
  });

export const signupApi = (username, password) =>
  api.post("users/signup", {
    username,
    phone,
    email,
    password,
    role,
  });
