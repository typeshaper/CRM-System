import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { UserFilters } from "../types/admin";

interface InitialState {
  userFilters: UserFilters;
}

const initialState: InitialState = {
  userFilters: {},
};

const usersTableSlice = createSlice({
  name: "usersTable",
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

export const usersTableReducer = usersTableSlice.reducer;
export const usersTableActions = usersTableSlice.actions;
