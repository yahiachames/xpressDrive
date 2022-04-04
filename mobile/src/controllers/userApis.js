import api from "./api-config";

export const loginApi = ({ username, password }) => {
  console.log(username, password);
  return api.post("user/login", {
    username,
    password,
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
