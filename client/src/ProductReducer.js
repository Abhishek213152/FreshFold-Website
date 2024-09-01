import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    product: [],
  },
  reducers: {
    getProducts: (state, action) => {
      // Ensure no duplicates are added
      const existingProduct = state.product.find(
        (item) => item.id === action.payload.id
      );
      if (!existingProduct) {
        state.product.push({ ...action.payload });
      }
    },
    incrementQty: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        itemPresent.quantity++;
      }
    },
    decrementQty: (state, action) => {
      const itemPresent = state.product.find(
        (item) => item.id === action.payload.id
      );
      if (itemPresent) {
        if (itemPresent.quantity > 1) {
          itemPresent.quantity--;
        } else {
          itemPresent.quantity = 0;
          const removeItem = state.product.filter(
            (item) => item.id !== action.payload.id
          );
          state.product = removeItem;
        }
      }
    },
  },
});

export const { getProducts, incrementQty, decrementQty } = productSlice.actions;

export default productSlice.reducer;
