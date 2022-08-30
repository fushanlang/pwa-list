import { configureStore } from "@reduxjs/toolkit";
import reducer from "./modules/userApps";

export default configureStore({
  reducer: {
    userApps: reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["userApps/setAsyncWithLoading/fulfilled"],
      },
    }),
});
