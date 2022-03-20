export function setLocation(location) {
  return {
    type: "LOCATION_ATTEMPT",
    payload: location,
  };
}
export function setDestinationAction(location) {
  return {
    type: "ADD_DESTINATION",
    payload: location,
  };
}

export const updateLocation = (location) => ({
  type: "UPDATE_CURRENT_POSITION",
  payload: location,
});
