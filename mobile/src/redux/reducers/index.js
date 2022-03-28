import { combineReducers } from "redux";

import location from "./location-rducer";
import PhoneNumber from "./phone-reducer";
import RideId from "./ride-id-reducer";
// Root Reducer
const rootReducer = combineReducers({
  location,
  RideId,
  PhoneNumber,
});

export default rootReducer;
