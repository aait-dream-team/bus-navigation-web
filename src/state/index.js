import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "dark",
  userId: null,
  userType: null,
  token : null
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
    }, setToken: (state, action) => {
      state.token = action.payload
    }
  },
});

export const { setMode, setUserType, setUserId, setToken } = globalSlice.actions;

export default globalSlice.reducer;
