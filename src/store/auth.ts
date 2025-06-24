import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
  accessToken: string;
  authStatus: boolean;
}

const initialState: InitialState = {
  accessToken: "",
  authStatus: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
    setAuthStatus(state, action: PayloadAction<boolean>) {
      state.authStatus = action.payload;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;
