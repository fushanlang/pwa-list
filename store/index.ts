import { configureStore } from "@reduxjs/toolkit";
import userAppsReducer from "./modules/userApps";
import userReducer from "./modules/user";

export const store = configureStore({
  reducer: {
    userApps: userAppsReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["userApps/setAsyncWithLoading/fulfilled"],
      },
    }),
});
export type RootState = ReturnType<typeof store.getState>;
