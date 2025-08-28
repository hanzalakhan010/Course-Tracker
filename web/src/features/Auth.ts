import { server } from "@/constants";
import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import axios from "axios";

export interface AuthState {
  user_email: string | null;
  loading: boolean;
  error: string | null;
}

const initialAuthState: AuthState = {
  user_email: null,
  loading: false,
  error: null,
};

// ----------------------
// Async Thunks
// ----------------------

export const authUser = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const response = await axios.post(`${server}/api/auth/me`, _, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return { user_email: response.data?.user_email };
    }
    throw new Error(response.data?.error);
  } catch {
    return thunkAPI.rejectWithValue("Automatic Auth failed, need to login");
  }
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${server}/api/auth/login`,
        credentials,
        { withCredentials: true }
      );
      return { user_email: response.data?.user_email ?? credentials.email };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.error || "Login failed"
      );
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${server}/api/auth/logout`,
        {},
        { withCredentials: true } // important: allows cookies to be sent
      );

      return response.data; // e.g. { success: true, message: "Logged out" }
    } catch (err: any) {
      return rejectWithValue(err.response?.data || { error: "Logout failed" });
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (
    credentials: { name: string; email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(
        `${server}/api/user/signup`,
        credentials,
        {
          withCredentials: true,
        }
      );
      return { user_email: response.data?.user_email };
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Sign Up Failed"
      );
    }
  }
);

// ----------------------
// Slice
// ----------------------

export const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ✅ Fulfilled cases per thunk
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user_email = action.payload.user_email;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user_email = action.payload.user_email;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user_email = action.payload?.user_email || null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user_email = null;
      })
      // ✅ Generic matcher: handle ALL pending states
      .addMatcher(isPending(loginUser, signupUser, authUser), (state) => {
        state.loading = true;
        state.error = null;
      })

      // ✅ Generic matcher: handle ALL rejected states
      .addMatcher(
        isRejected(loginUser, signupUser, authUser),
        (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        }
      );
  },
});

export const {} = authSlice.actions;
export default authSlice.reducer;
