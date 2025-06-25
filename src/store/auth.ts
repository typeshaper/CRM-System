import { createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";

interface InitialState {
  isAuthenticated: boolean;
}

const initialState: InitialState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state) {
      state.isAuthenticated = true;
    },
    logout(state) {
      state.isAuthenticated = false;
      authService.clearAccessToken();
      localStorage.removeItem("refreshToken");
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
