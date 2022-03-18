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
