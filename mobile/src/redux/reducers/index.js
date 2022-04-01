import { combineReducers } from "redux";

import location from "./location-rducer";
import Profile from "./profile-reducer";
import RideId from "./ride-id-reducer";
// Root Reducer
const rootReducer = combineReducers({
  location,
  RideId,
  Profile,
});

export default rootReducer;
