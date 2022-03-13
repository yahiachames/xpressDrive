import { combineReducers } from 'redux';
import auth from '../reducers/auth-reducer'

// Root Reducer
const rootReducer = combineReducers({
    auth
});

export default rootReducer;
