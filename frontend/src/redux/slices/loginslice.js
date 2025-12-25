import { createSlice } from "@reduxjs/toolkit";

const loginslice = createSlice({
  name: "profiledetails",
  initialState: {
    username: {
      value: "",
    },
    password: {
      value: "",
    },
  },
  reducers: {
    setUsername: (state, action) => {
      state.username.value = action.payload;
    },
    setPassword: (state, action) => {
      state.password.value = action.payload;
    },
  },
});
export default loginslice.reducer;
export const { setUsername, setPassword } = loginslice.actions;
