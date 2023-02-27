import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzas",
  async ({ currentPage, categoryId, sortType, searchValue }) => {
    const res = await axios.get(
      `https://63de507d9fa0d60060fc8e1c.mockapi.io/items?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sortType}&order=desc&filter=${searchValue}`
    );
    debugger;
    return res.data;
  }
);

const initialState = {
  items: [],
  status: '', // loading | success | error
  errorMessage: ''
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzaItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: { // поле для совершения асинхронных действий
    [fetchPizzas.pending]: (state) => {
        state.items = [];
        state.status = 'loading';
    },
    [fetchPizzas.fulfilled]: (state, action) => {
        debugger;
        state.items = action.payload;
        state.status = 'success';
    },
    [fetchPizzas.rejected]: (state, action) => {
        debugger;
        state.items = [];
        state.status = 'error';
        state.errorMessage = action.error.message;
    },
  }
});

export const { setPizzaItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
