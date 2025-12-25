import { createSlice } from "@reduxjs/toolkit";

const Createbudgetslice = createSlice({
  name: "createbudget",
  initialState: {
    value: [],
  },
  reducers: {
    setCreatebudget: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default Createbudgetslice.reducer;
export const { setCreatebudget } = Createbudgetslice.actions;
