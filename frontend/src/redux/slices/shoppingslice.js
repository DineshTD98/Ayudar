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
            const id=action.payload;
            const item = state.value.find(i => i._id === id);
            if (item) item.completed = !item.completed;
        },
        clearshoppingcart:(state)=>{
            state.value=[]
        }
    }
})

export default Shoppingslice.reducer;
export const {setShoppingcart,togglecomplete,clearshoppingcart}=Shoppingslice.actions