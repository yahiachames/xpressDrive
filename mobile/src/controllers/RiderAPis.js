import api from "./api-config";
export const updateRiderProfile = (rider_id, formdata) => {
  return api.post(`rider/update/${rider_id}`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getOneRider = (id) => {
  return api.get(`rider/one/${id}`);
};
export const getRidesRider = (id) => api.get(`rider/rides/${id}`);
