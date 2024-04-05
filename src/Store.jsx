import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./components/Redux/Reducer/reducers";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
