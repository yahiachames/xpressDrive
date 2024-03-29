import api from "./api-config";

export const loginApi = ({ username, password, role }) => {
  return api.post("user/login", {
    username,
    password,
    role,
  });
};

export const signupApi = ({ username, password, email, phone, role }) =>
  api.post("user/signup", {
    username,
    phone,
    email,
    password,
    role: role.toLowerCase(),
  });

export const updateProfile = (id, user) => {
    api.post(`user/update/${id}`, user);
};

export const updateLocation = ({ latitude, longitude, id }) => {
  api.post(`user/location/update/${id}`, {
    location: { latitude, longitude },
  });
};
export const resetPass = (email) => {
  return api.post("user/forgot", { email });
};
export const PassChange = (email, password) => {
  return api.post("user/reset", { email, password });
};
