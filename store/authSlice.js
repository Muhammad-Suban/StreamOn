import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: JSON.parse(localStorage.getItem("status")) || false,
  userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      (state.status = true), (state.userInfo = action.payload);

      localStorage.setItem("status", JSON.stringify(true));
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      (state.status = false), (state.userInfo = null);

      localStorage.removeItem("status");
      localStorage.removeItem("userInfo");
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
