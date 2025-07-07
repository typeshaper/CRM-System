import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import authService from "../services/authService";
import type { Profile } from "../types/user";

interface InitialState {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  userData?: Profile;
}

const initialState: InitialState = {
  isAuthenticated: false,
  isAdmin: false,
  isModerator: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.isAuthenticated = true;
      localStorage.setItem("refreshToken", action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      authService.clearAccessToken();
      localStorage.removeItem("refreshToken");
    },
    setUserData(state, action: PayloadAction<Profile>) {
      state.userData = action.payload;
    },
    setIsAdmin(state) {
      state.isAdmin = true;
    },
    setIsModerator(state) {
      state.isModerator = true;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
