import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "checking", // 'checking', 'authenticated', 'not-authenticated'
    isAuthenticated: false,
    user: null,
    token: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.status = "authenticated";
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.status = "not-authenticated";
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
    checkingCredentials(state) {
      state.status = "checking";
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
