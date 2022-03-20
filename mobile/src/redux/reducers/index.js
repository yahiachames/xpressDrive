import { combineReducers } from 'redux';

import location from "./location-rducer";
import RideId from "./ride-id-reducer";
// Root Reducer
const rootReducer = combineReducers({
  location,
  RideId,
});

export default rootReducer;
