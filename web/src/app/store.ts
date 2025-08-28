import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/features/Auth";
import CourseReducer from "@/features/Courses";

export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Courses: CourseReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
