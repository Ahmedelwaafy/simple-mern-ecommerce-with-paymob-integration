import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";
type Theme = "dark" | "light";

interface MiscellaneousState {
  theme: Theme;
}
const initialState: MiscellaneousState = {
  theme: (localStorage.getItem("theme") as Theme) || null,
};

export const MiscellaneousSlice = createSlice({
  name: "Miscellaneous",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
    },
  },
});

export default MiscellaneousSlice.reducer;
export const { setTheme } = MiscellaneousSlice.actions;
export const theme = (state: RootState) => state.Miscellaneous.theme;
