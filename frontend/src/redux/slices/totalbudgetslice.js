import { createSlice } from "@reduxjs/toolkit";

const totalbudgetslice=createSlice({
    name:'totalbudget',
    initialState:{
        value:[]
    },
    reducers:{
        setTotalbudget:(state,action)=>{
             state.value=action.payload
        },
        updateTotalbudget:(state,action)=>{
            state.value=[...state.value,action.payload]
        }
    }
})

export default totalbudgetslice.reducer;
 export const {setTotalbudget,updateTotalbudget}=totalbudgetslice.actions
