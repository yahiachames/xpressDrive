import { combineReducers } from 'redux';
import auth from '../reducers/auth-reducer'
import location from "./location-rducer";

// Root Reducer
const rootReducer = combineReducers({
  auth,
  location,
});

export default rootReducer;
