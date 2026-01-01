import { createSlice } from "@reduxjs/toolkit";


const eventslice = createSlice({
    name: "events",
    initialState:{
       value:[]
    },
    reducers: {
        addnewEvent: (state, action) => {
            state.value=[...state.value,action.payload]
        },
        addevent: (state, action) => {
            state.value=action.payload
        }
    }
})

export default eventslice.reducer;
export const {addnewEvent,addevent}=eventslice.actions