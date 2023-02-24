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
    removeItems(state, action) {
      state.items = state.items.filter((item => {
        if(item.id !== action.payload.id) {
          return true;
        } else {
          state.totalPrice -= item.price;
          return false;
        }
      }))
    },
    removeOneItem(state, action) {
      state.items = state.items.map((item => {
        debugger
        if(item.id === action.payload.id) {
          state.totalPrice -= item.price;
          return {...item, count: item.count-1};
        } else {
          return item;
        }
      }))
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    }
  },
});

export const {
  addItem,
  removeItems,
  removeOneItem,
  clearItems
} = cartSlice.actions;

export default cartSlice.reducer;