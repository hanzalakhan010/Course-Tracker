import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthState {
  user_id: number | null;
  loading: boolean;
  error: string | null;
}

const initialAuthState: AuthState = {
  user_id: null,
  loading: false,
  error: null
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/login", credentials);
      return response.data; // return { user_id, token, ... }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

// Async Thunk for signup
export const signupUser = createAsyncThunk(
  'auth/signup',
  async (credentials: { name: string, email: string, password: string }, thunkAPI) => {
    try {
      const response = await axios.post("/api/auth/signup", credentials);
      return response.data
    }
    catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Sign Up Failed")
    }
  }
)

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    logout: (state) => {
      state.user_id = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user_id = action.payload.user_id;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false
        state.user_id = action.payload.user_id
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
