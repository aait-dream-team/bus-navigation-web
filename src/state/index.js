import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: null,
  userType: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload
    }
  },
});

export const { setMode, setUserType, setUserId } = globalSlice.actions;

export default globalSlice.reducer;
