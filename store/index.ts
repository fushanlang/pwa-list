import { configureStore } from "@reduxjs/toolkit";
import reducer from "./modules/loginUserApps";

export default configureStore({
  reducer: {
    loginUserApps: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["loginUserApps/setAsyncWithLoading/fulfilled"],
      },
    }),
});
