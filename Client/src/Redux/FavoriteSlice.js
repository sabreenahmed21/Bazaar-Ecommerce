import { createSlice } from "@reduxjs/toolkit";

export const FavoriteSlice = createSlice({
  name: "favorite",
  initialState: {
    items: [],
    totalQuantity: 0,
  },
  reducers: {
    addItemToFav(state = { items: [], totalQuantity: 0 }, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item._id === newItem._id);
      if (!existingItem) {
        state.items.push({
          ...newItem,
          quantity: 1,
        });
        state.totalQuantity++;
      }
    },
    removeItemFromFav(state, action) {
      const id = action.payload._id; 
      const existingItemIndex = state.items.findIndex(item => item._id === id);
      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];
        if (existingItem.quantity === 1) {
          state.items.splice(existingItemIndex, 1); 
        } else {
          existingItem.quantity--;
        }
        state.totalQuantity--;
      }
    },
  },
});

export const { addItemToFav, removeItemFromFav } = FavoriteSlice.actions;
export default FavoriteSlice.reducer;
