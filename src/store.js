import { configureStore } from "@reduxjs/toolkit";
import generalReducer from "./reducers/general";
import authReducer from "./reducers/auth";

export const store = configureStore({
  reducer: {
    general: generalReducer,
    auth: authReducer,
  },
});
