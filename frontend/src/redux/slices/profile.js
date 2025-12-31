import { createSlice } from "@reduxjs/toolkit";

const profileSlice=createSlice({
    name:"profile",
    initialState:{
        value:''
    },
    reducers:{
        setprofile:(state,action)=>{
            state.value=action.payload
        }
    }
})
export default profileSlice.reducer
export const {setprofile}=profileSlice.actions
