import api from "./api-config";

export const getDrivers = () => {
  return api.get(`driver/all/online`);
};

export const updateLocation = (currentPosition, id) => {
  return api.post(`driver/localization/update/${id}`, {
    currentPosition: currentPosition,
    test: "test",
  });
};
export const updateOnline = (online, id) => {
  return api.post(`driver/online/update/${id}`, {
    online,
  });
};
export const getRidesPending = (id) => {
  return api.get(`driver/rides/pending/${id}`);
};
export const getRidesCompleted = (id) => {
  api.get(`driver/rides/completed/${id}`);
};
export const getRidesCancelled = (id) => {
  api.get(`driver/rides/cancelled/${id}`);
};
export const getDriverTotalGain = (driver_id) =>
  api.get(`driver/rides/gain/${driver_id}`);
export const getDriverTotalDistance = (driver_id) =>
  api.get(`driver/rides/distance/${driver_id}`);
export const getDriverTotalRate = (driver_id) =>
  api.get(`driver/rides/rate/${driver_id}`);
export const getOneDriver = (id) => {
  return api.get(`driver/one/${id}`);
};
export const updateDriverProfile = (driver_id, formdata) => {
  return api.post(`driver/update/${driver_id}`, formdata, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};




