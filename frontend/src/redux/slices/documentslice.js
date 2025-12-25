import { createSlice } from "@reduxjs/toolkit";

export const Documentslice = createSlice({
  name: "Documents",
  initialState: {
    value: [],
  },
  reducers: {
    setDocument: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default Documentslice.reducer;
export const { setDocument } = Documentslice.actions;
