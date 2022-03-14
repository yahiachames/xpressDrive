import api from "./ApiConfig";

export const loginApi = ({ username, password }) => {
  console.log(username, password);
  return api.post("user/login", {
    username,
    password,
  });
};

export const signupApi = (username, password) =>
  api.post("user/signup", {
    username,
    phone,
    email,
    password,
    role,
  });
