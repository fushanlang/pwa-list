import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../index";

const userApps = createSlice({
  name: "userApps",
  initialState: {
    apps: [],
  },
  reducers: {
    set(state, { payload }) {
      state.apps = payload.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        nameLowercase: doc.data().nameLowercase,
        icon: doc.data().icon,
        isPublic: doc.data().isPublic,
        isRejected: doc.data().isRejected,
        rejectionMessage: doc.data().rejectionMessage,
      }));
    },
    remove(state, { payload }) {
      state.apps = state.apps.filter((value) => {
        return value.id !== payload;
      });
    },
  },
});

const { set, remove } = userApps.actions;

export { set, remove };
export const selectUserApps = (state: RootState) => state.userApps.apps;
export default userApps.reducer;
