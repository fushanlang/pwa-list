import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "firebase/firestore";

import firebase from "../../plugins/firebase";

const loginUserApps = createSlice({
  name: "loginUserApps",
  initialState: {
    isLoading: true,
    apps: [],
  },
  reducers: {
    remove(state, { type, payload }) {
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
          link: doc.data().link,
          isPublic: doc.data().isPublic,
          isRejected: doc.data().isRejected,
          rejectionMessage: doc.data().rejectionMessage,
          imageMobile1: doc.data().imageMobile1,
          imageMobile2: doc.data().imageMobile2,
          imageMobile3: doc.data().imageMobile3,
          imagePc1: doc.data().imagePc1,
          imagePc2: doc.data().imagePc2,
          imagePc3: doc.data().imagePc3,
        }));
      });
  },
});

const setAsyncWithLoading = createAsyncThunk("loginUserApps/setAsyncWithLoading", async (payload: any) => {
  const db = firebase.firestore();
  const response = await db.collection("applications").where("userId", "==", payload).orderBy("updatedAt", "desc").get();
  return response.docs;
});

const { remove } = loginUserApps.actions;

export { remove, setAsyncWithLoading };
export default loginUserApps.reducer;
