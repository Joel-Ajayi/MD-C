import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./user";

const makeStore = () => {
  return configureStore({
    reducer: { user: authSlice.reducer },
    devTools: process.env.NODE_ENV !== "production",
  });
};

// Infer the type of makeStore
export const store = makeStore();
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
