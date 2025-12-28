import { createSlice } from "@reduxjs/toolkit";


const Shoppingslice=createSlice({
    name:'shoppinglist',
    initialState:{
        value:[]
    },
    reducers:{
        setShoppingcart:(state,action)=>{
            state.value=action.payload.map((item)=>({
                ...item,
                completed:false
            }))
        },
        togglecomplete:(state,action)=>{
            const index=action.payload;
            state.value[index].completed=!state.value[index].completed
        },
        clearshoppingcart:(state)=>{
            state.value=[]
        }
    }
})

export default Shoppingslice.reducer;
export const {setShoppingcart,togglecomplete,clearshoppingcart}=Shoppingslice.actions