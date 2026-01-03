import { createSlice } from "@reduxjs/toolkit";

const expenseslice = createSlice({
    name: "Expense",
    initialState: {
        value: [],
    },
    reducers: {
        setExpense: (state, action) => {
            state.value = action.payload;
        },
        addExpense: (state, action) => {
            state.value.push(action.payload);
        },
    },
});

export const { setExpense, addExpense } = expenseslice.actions;
export default expenseslice.reducer;
