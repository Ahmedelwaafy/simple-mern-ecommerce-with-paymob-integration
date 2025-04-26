import { IUserData } from "@/types";
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import type { RootState } from "../store";

interface AuthenticationState {
  userSession: string | null;
  userData: IUserData | null;
}
const initialState: AuthenticationState = {
  userSession: Cookies.get("Auth-State") || null,
  userData: localStorage.getItem("UD")
    ? JSON.parse(localStorage.getItem("UD")!)
    : null,
};
export const AuthorizedSlice = createSlice({
  name: "Authorized",
  initialState,
  reducers: {
    setUserSession: (state, action: PayloadAction<string | null>) => {
      state.userSession = action.payload;
    },
    setUserData: (state, action: PayloadAction<IUserData | null>) => {
      state.userData = action.payload;
    },
  },
});

export default AuthorizedSlice.reducer;
export const { setUserData, setUserSession } = AuthorizedSlice.actions;
export const userSession = (state: RootState) =>
  state.Authentication.userSession;
export const userData = (state: RootState) => state.Authentication.userData;
