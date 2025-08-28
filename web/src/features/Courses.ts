// features/Courses.ts
import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "@/constants";

export interface Resource {
  _id: string;
  title: string;
  url: string;
}

export interface Lecture {
  _id: string;
  title: string;
  date: string;
}

export interface Course {
  _id: string;
  name: string;
  code: string;
  resources: Resource[];
  lectures: Lecture[];
}

export interface CoursesState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  courses: [],
  loading: false,
  error: null,
};

// Fetch all courses for the logged-in student
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${server}/api/courses`, {
        withCredentials: true,
      });
      return response.data as Course[];
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to fetch courses"
      );
    }
  }
);

// Add a new course for the student
export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (courseData: { name: string; code: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${server}/api/courses`, courseData, {
        withCredentials: true,
      });
      return response.data as Course;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Failed to add course"
      );
    }
  }
);

export const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    clearCourses: (state) => {
      state.courses = [];
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Fulfilled cases first
    builder
      .addCase(
        fetchCourses.fulfilled,
        (state, action: PayloadAction<Course[]>) => {
          state.loading = false;
          state.courses = action.payload;
        }
      )
      .addCase(addCourse.fulfilled, (state, action: PayloadAction<Course>) => {
        state.loading = false;
        state.courses.push(action.payload);
      });

    // Matchers for pending and rejected actions
    builder.addMatcher(
      (action) =>
        action.type.startsWith("courses/") && action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
        state.error = null;
      }
    );
    builder.addMatcher(
      (action) =>
        action.type.startsWith("courses/") && action.type.endsWith("/rejected"),
      (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      }
    );
  },
});

export const { clearCourses } = coursesSlice.actions;
export default coursesSlice.reducer;
