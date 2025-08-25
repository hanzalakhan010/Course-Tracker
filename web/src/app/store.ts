import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/features/Auth";

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
