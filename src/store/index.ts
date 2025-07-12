import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { usersTableReducer } from "./usersTable";

const store = configureStore({
  reducer: {
    auth: authReducer,
    usersTable: usersTableReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
