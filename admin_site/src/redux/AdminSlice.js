import { createSlice } from "@reduxjs/toolkit";

export const adminSlice = createSlice({
  name: "admin",
  initialState: {
    currentAdmin: null,
  },
  reducers: {
    signInSuccess: (state, action) => {
      state.currentAdmin = action.payload;
    },
    logout: (state, action) => {
      state.currentAdmin = null;
    },
    updateProfilePhoto: (state, action) => {
      state.currentAdmin.data.user.avatar = action.payload;
    },
    updateAdminName: (state, action) => {
      state.currentAdmin.data.user.name = action.payload;
    },
    updatePassword: (state, action) => {
      state.currentAdmin.data.user.password = action.payload;
    },
  },
});

export const {
  signInSuccess,
  logout,
  updateProfilePhoto,
  updateAdminName,
  updatePassword,
} = adminSlice.actions;
export const selectCurrentAdmin = (state) => state.admin.currentAdmin;
export default adminSlice.reducer;
