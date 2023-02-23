import { createSlice } from "@reduxjs/toolkit";

// const item = {
//   id,
//   name,
//   price,
//   imageUrl,
//   type: typesGlossary[activeType],
//   size: activeSize,
//   count
// };

const initialState = {
  totalPrice: 0,
  totalCount: 0,
  items: []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // addItem(state, action) {
    //   state.totalPrice += action.payload.price;
    //   debugger;
    //   state.items.push(action.payload);
    // },
    addItem(state, action) {
      const findItem = state.items.find(obj => obj.id === action.payload.id);
      if(findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        });
      }

      state.totalPrice += action.payload.price;
      state.totalCount++;
    },
    removeItem(state, action) {
      state.items = state.items.filter((item => {
        if(item.id !== action.payload) {
          return true;
        } else {
          state.totalPrice -= item.price;
          return false;
        }
      }))
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    }
  },
});

export const {
  addItem,
  removeItem,
  clearItems
} = cartSlice.actions;

export default cartSlice.reducer;