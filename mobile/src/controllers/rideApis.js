import api from "./api-config";

export const createRide = ({
  currentPoint,
  destination,
  driver_id,
  rider_id,
  distance,
  total_price,
}) => {
  return api.post("ride/create", {
    currentPoint,
    destination,
    driver_id,
    rider_id,
    distance,
    total_price,
  });
};

export const getPendingRides = (id) => api.get(`ride/status/pending/${id}`);
export const acceptRide = (id, driver_location) =>
  api.post(`ride/accept/${id}`, { driver_position: driver_location });
export const declineRide = (id, driver_location) =>
  api.post(`ride/decline/${id}`, { driver_position: driver_location });

export const updateStatus = (id, status) =>
  api.post(`ride/status/update/${id}`, { status });

  export const DeleteRide = (id, driver_id) =>
    api.post(`ride/delete/${id}`, { driver_id });

export const completedRide = (id, rider_id) =>
  api.post(`ride/completed/${id}`, { rider_id });