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
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);
      if (findItem) {
        debugger;
        if (findItem.size === action.payload.size) {
          findItem.count++;
        } else {
          state.items.push({
            ...findItem,
            size: action.payload.size,
            count: 1,
          });
        }
        state.totalPrice += findItem.price;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
        state.totalPrice += action.payload.price;
      }
      state.totalCount++;
    },
    addItemFromCart(state, action) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      // let temp = state.items.map(item => {
      //   return {
      //     id: item.id,
      //     size: item.size
      //   }
      // })
      state.items.forEach((item) => {
        if (
          item.id === action.payload.id &&
          item.size === action.payload.size
        ) {
          debugger;
          item.count++;
          state.totalPrice += item.price;
        }
      });
      // debugger;
      // if(findItem) {
      //   debugger;
      //   if(findItem.size === action.payload.size) {
      //     debugger
      //     findItem.count++;
      //     state.totalPrice += findItem.price;
      //   }
      // else {
      //   state.items.push({
      //     ...findItem,
      //     size: action.payload.size,
      //     count: 1
      //   });
      // }
      // }
      // else {
      //   state.items.push({
      //     ...action.payload,
      //     count: 1
      //   });
      //   state.totalPrice += action.payload.price;
      // }
      state.totalCount++;
    },
    removeItems(state, action) {
      state.items = state.items.filter((item) => {
        if (item.id !== action.payload.id) {
          return true;
        } else {
          state.totalPrice -= item.price;
          return false;
        }
      });
    },
    removeOneItem(state, action) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      findItem.count--;
      state.totalCount--;
      state.totalPrice -= findItem.price;
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      state.totalCount = 0;
    },
  },
});

export const {
  addItem,
  addItemFromCart,
  removeItems,
  removeOneItem,
  clearItems,
} = cartSlice.actions;

export default cartSlice.reducer;
