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
