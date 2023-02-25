import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: []
};

const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPizzasItems(state, action) {
        state.items = action.payload;
    }
  },
});

export const {
    setPizzasItems
} = pizzasSlice.actions;

export default pizzasSlice.reducer;