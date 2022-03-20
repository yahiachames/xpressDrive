import api from "./ApiConfig";

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

export const checkStatus = (id) => api.get(`ride/status/${id}`);
export const updateStatus = (id, status) =>
  api.post(`ride/status/update/${id}`, { status });
