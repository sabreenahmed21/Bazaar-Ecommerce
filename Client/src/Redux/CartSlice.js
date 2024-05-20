import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    totalQuantity: 0,
    shippingInfo: {
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNo: "",
    },
  },
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) =>
          item._id === newItem._id && item.selectedSize === newItem.selectedSize
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      state.totalQuantity += newItem.quantity;
    },
    removeItemFromCart(state, action) {
      const { id, selectedSize } = action.payload;
      const existingItem = state.items.find(
        (item) => item._id === id && item.selectedSize === selectedSize
      );
      if (existingItem) {
        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          state.totalQuantity--;
        } else {
          state.items = state.items.filter(
            (item) => item._id !== id || item.selectedSize !== selectedSize
          );
          state.totalQuantity--;
        }
      }
    },
    shippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
  },
});

export const { addItemToCart, removeItemFromCart, shippingInfo } =
  cartSlice.actions;
export const saveShippingInfo = (shippingInfo) => (dispatch) => {
  dispatch(cartSlice.actions.shippingInfo(shippingInfo));
};
export default cartSlice.reducer;
