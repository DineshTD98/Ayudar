import { configureStore } from "@reduxjs/toolkit";
import loginslice from "./slices/loginslice";
import Documentslice from "./slices/documentslice";
import Subscriptionslice from "./slices/subscriptionslice";
import Createbudgetslice from "./slices/createbudgetslice";
import totalbudgetslice from "./slices/totalbudgetslice";
import Shoppingslice from "./slices/shoppingslice"
import profileSlice from "./slices/profile";
import eventslice from "./slices/eventslice";
import expenseslice from "./slices/expenseslice";

export const Store = configureStore({
  reducer: {
    Logindetails: loginslice,
    Documentlist: Documentslice,
    Subscriptionlist: Subscriptionslice,
    Createbudget: Createbudgetslice,
    Totalbudget: totalbudgetslice,
    Shoppingcart: Shoppingslice,
    Profile: profileSlice,
    Events: eventslice,
    Expense: expenseslice
  },
});
export default Store;
