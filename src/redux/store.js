import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";
import pizzaReducer from "./pizzaSlice";

const store = configureStore({
  reducer: { filterReducer, cartReducer, pizzaReducer }
});

export default store;