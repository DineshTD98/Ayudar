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
            const newExpenses = Array.isArray(action.payload)? action.payload :[action.payload];
            state.value = [...state.value, ...newExpenses];
        },
        removeExpense: (state, action) => {
            state.value = state.value.filter(exp => exp._id !== action.payload);
        },
    },
});

export const { setExpense, addExpense, removeExpense } = expenseslice.actions;
export default expenseslice.reducer;
