import { configureStore } from "@reduxjs/toolkit";
import userAppsreducer from "./modules/userApps";

export const store = configureStore({
  reducer: {
    userApps: userAppsreducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["userApps/setAsyncWithLoading/fulfilled"],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
