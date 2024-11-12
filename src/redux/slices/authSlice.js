import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constant";
import api from "../../api";

// Thunk for logging in a data
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/auth/login`,
        userCredentials
      );
      localStorage.setItem('token', response.data.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk for registering a data
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${BASE_URL}/auth/Register`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    data: null,
    loading: false,
    error: null,
    loginUser: { data: null,loading: false,error: null },
    logout: { data: null,loading: false,error: null },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loginUser.loading = true;
        state.loginUser.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUser.loading = false;
        state.loginUser.data = action.payload.data;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUser.loading = false;
        state.loginUser.error = action.payload;
      })

      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.registerUser.loading = true;
        state.registerUser.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registerUser.loading = false;
        state.registerUser.data = action.payload.data;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUser.loading = false;
        state.registerUser.error = action.payload;
      });
  },
});

// export const { logout } = authSlice.actions;
export default authSlice.reducer;
