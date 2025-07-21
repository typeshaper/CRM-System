import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./auth";
import { usersReducer } from "./users";

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
