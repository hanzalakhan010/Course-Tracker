// courseSlice.ts
import { server } from "@/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Course {
  _id: string;
  title: string;
  description: string;
  resources: any[];
  lectures: any[];
}

interface CourseState {
  course: Course | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  course: null,
  loading: false,
  error: null,
};

// Thunk: fetch a course by id
export const fetchCourseById = createAsyncThunk(
  "course/fetchById",
  async (id: string) => {
    console.log("debug");
    const res = await axios.get(`${server}/api/courses/${id}`,{withCredentials:true});
    return res.data as Course;
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearCourse(state) {
      state.course = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.course = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch course";
      });
  },
});

export const { clearCourse } = courseSlice.actions;
export default courseSlice.reducer;
