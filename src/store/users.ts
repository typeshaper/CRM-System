import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserFilters } from "../types/admin";

interface InitialState {
  userFilters: UserFilters;
}

const initialState: InitialState = {
  userFilters: {},
};

const usersSlice = createSlice({
  name: "usersSlice",
  initialState,
  reducers: {
    setUserFilters(state, action: PayloadAction<UserFilters>) {
      state.userFilters = {
        ...state.userFilters,
        ...action.payload,
      };
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;
