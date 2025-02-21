import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const initialState = {
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
  isLoading: false,
};

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:5000/api/auth/register",
      formData
    );

    return response.data;
  }
);

export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  const response = await axios.post(
    "http://localhost:5000/api/auth/login",
    formData
  );
  return response.data;
});

export const check_auth = createAsyncThunk("/auth/checkauth", async () => {
  try {
    const response = await axios.get(
      "http://localhost:5000/api/auth/check-auth",
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {},
    logout: (state) => {
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("userInfo");
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
  //to save the data in states we use extra reducers
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userInfo = null;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        state.isLoading = false;
        state.userInfo = null;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = !action.payload.success ? null : action.payload.user;
        state.isAuthenticated = !action.payload.success ? false : true;
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.userInfo = null;
        state.isAuthenticated = false;
      })
      .addCase(check_auth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(check_auth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = action.payload.success;
        state.userInfo = action.payload.success ? action.payload.user : null;

        // Store in localStorage
        localStorage.setItem("isAuthenticated", action.payload.success);
        localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      })
      .addCase(check_auth.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.userInfo = null;

        // Clear localStorage on failure
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("userInfo");
      });
  },
});

export const { setUserInfo } = authSlice.actions;
export default authSlice.reducer;
