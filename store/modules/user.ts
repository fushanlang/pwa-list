import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../index";

export const user = createSlice({
  name: "user",
  initialState: {
    user: { uid: "" },
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { uid: "" };
    },
  },
});

export const { login, logout } = user.actions;
export const selectUser = (state: RootState) => state.user.user;
export default user.reducer;
