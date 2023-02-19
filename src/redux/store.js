import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";

const store = configureStore({
  reducer: { filterReducer }
});

export default store;