import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogged: false,
};
export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginIn: (state) => {
      state.isLogged = true;
    },
    loginOut: (state) => {
      state.isLogged = false;
    },
  },
});

export const { loginIn, loginOut } = loginSlice.actions;
export default loginSlice.reducer;
