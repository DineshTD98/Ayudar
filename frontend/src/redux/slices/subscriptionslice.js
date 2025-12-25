import { createSlice } from "@reduxjs/toolkit";

const Subscriptionslice = createSlice({
  name: "Subscription list",
  initialState: {
    value: [],
  },
  reducers: {
    setSubscription: (state, action) => {
      state.value = action.payload;
    },
  },
});
export default Subscriptionslice.reducer;
export const { setSubscription } = Subscriptionslice.actions;
