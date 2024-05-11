import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
  },
  reducers: {
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state, action) => {
      state.currentUser = null;
    },
    updateProfilePhoto: (state, action) => {
      state.currentUser.data.user.avatar = action.payload;
    },
    updateUserName: (state, action) => {
      state.currentUser.data.user.name = action.payload;
    },
    updatePassword: (state, action) => {
      state.currentUser.data.user.password = action.payload;
    },
  },
});

export const {
  signInSuccess,
  logout,
  updateProfilePhoto,
  updateUserName,
  updatePassword,
} = userSlice.actions;
export const selectCurrentUser = (state) => state.user.currentUser;
export default userSlice.reducer;
