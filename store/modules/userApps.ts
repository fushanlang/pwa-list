import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "firebase/firestore";

import { RootState } from "../index";
import firebase from "../../plugins/firebase";

const userApps = createSlice({
  name: "userApps",
  initialState: {
    isLoading: true,
    apps: [],
  },
  reducers: {
    remove(state, { payload }) {
      state.apps = state.apps.filter((value) => {
        return value.id !== payload;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setAsyncWithLoading.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setAsyncWithLoading.fulfilled, (state, action) => {
        state.isLoading = false;
        state.apps = action.payload.map((doc) => ({
          id: doc.id,
          name: doc.data().name,
          nameLowercase: doc.data().nameLowercase,
          icon: doc.data().icon,
          isPublic: doc.data().isPublic,
          isRejected: doc.data().isRejected,
          rejectionMessage: doc.data().rejectionMessage,
        }));
      });
  },
});

const setAsyncWithLoading = createAsyncThunk("userApps/setAsyncWithLoading", async (payload: string) => {
  const db = firebase.firestore();
  const response = await db.collection("applications").where("userId", "==", payload).orderBy("updatedAt", "desc").get();
  return response.docs;
});

const { remove } = userApps.actions;

export { remove, setAsyncWithLoading };
export const selectUserApps = (state: RootState) => state.userApps.apps;
export const selectIsLoading = (state: RootState) => state.userApps.isLoading;
export default userApps.reducer;
