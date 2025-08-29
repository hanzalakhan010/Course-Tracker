import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "@/features/Auth";
import CoursesReducer from "@/features/Courses";
import CourseReducer from "@/features/courseSlice";
export const store = configureStore({
  reducer: {
    Auth: AuthReducer,
    Courses: CoursesReducer,
    Course: CourseReducer,
  },
});

export type Rootstate = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
