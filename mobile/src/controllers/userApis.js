import api from "./ApiConfig";

export const login = (username, password) =>
  api.post("users/login", {
    username,
    password,
  });

export const signup = (username, password) =>
  api.post("users/signup", {
    username,
    phone,
    email,
    password,
    role,
  });
