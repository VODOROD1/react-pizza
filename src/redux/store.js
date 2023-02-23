import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";

const store = configureStore({
  reducer: { filterReducer, cartReducer }
});

export default store;