import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import cartReducer from "./cartSlice";
import pizzasReducer from "./pizzaSlice";

const store = configureStore({
  reducer: { filterReducer, cartReducer, pizzasReducer }
});

export default store;