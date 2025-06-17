import { createSlice } from "@reduxjs/toolkit";
import type { Token } from "../types/auth";

const initialState: Token = {
  accessToken: "",
  refreshToken: "",
};

const hasValidToken = (token: Token): token is Token => {
  return (
    "accessToken" in token &&
    "refreshToken" in token &&
    typeof token.accessToken === "string" &&
    typeof token.refreshToken === "string"
  );
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens(state, action) {
      if (hasValidToken(action.payload)) {
        const { accessToken, refreshToken } = action.payload;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
      }
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
