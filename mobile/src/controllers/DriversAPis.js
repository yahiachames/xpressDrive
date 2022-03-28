import api from "./api-config";

export const getDrivers = () => {
  return api.get(`driver/all/online`);
};

export const updateLocation = (currentPosition, id) => {
  console.log("workedddd", currentPosition);
  return api.post(`driver/localization/update/${id}`, {
    currentPosition: currentPosition,
    test: "test",
  });
};
export const updateOnline = (online, id) => {
  console.log("workedddd", online);
  return api.post(`driver/online/update/${id}`, {
    online,
  });
};
export const getRidesPending = (id) => {
  api.get(`driver/rides/pending/${id}`);
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
