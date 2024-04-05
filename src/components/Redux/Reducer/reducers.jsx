import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../Slice/authSlice';
import categoriesReducer from "../Slice/categoriesSlice";
import movieReducer from "../Slice/moviesSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  categories: categoriesReducer,
  movies: movieReducer,
});

export default rootReducer;
