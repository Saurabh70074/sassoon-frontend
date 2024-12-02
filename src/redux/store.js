import { combineReducers, createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from "./reducers/authReducer";
import bookingReducer from './reducers/bookingReducer';
import coursesPlacesReducer from "./reducers/CoursesPlacesReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  bookings: bookingReducer,
  coursesPlaces: coursesPlacesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;

