import { configureStore } from "@reduxjs/toolkit";

import AuthenticationReducer from "./Features/AuthenticationSlice";
import MiscellaneousReducer from "./Features/MiscellaneousSlice";

export const store = configureStore({
  reducer: {
    Authentication: AuthenticationReducer,
    Miscellaneous: MiscellaneousReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
