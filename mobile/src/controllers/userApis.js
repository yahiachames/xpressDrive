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
    role,
  });

export const getDrivers = () => {
  return api.get("user/drivers");
};

export const updateLocation = ({ latitude, longitude, id }) => {
  console.log("workedddd", { latitude, longitude, id });
  return api.post(`/user/location/update/${id}`, {
    location: { latitude, longitude },
  });
};
