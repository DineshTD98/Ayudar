import "./App.css";
import "./index.css";
import "./css/loginform.css";

import { BrowserRouter } from "react-router-dom";
import { createContext, useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import useApi from "./customehooks/useapi";

// Redux Actions
import { setTotalbudget } from "./redux/slices/totalbudgetslice";
import { setExpense } from "./redux/slices/expenseslice";
import { setSubscription } from "./redux/slices/subscriptionslice";
import { addevent } from "./redux/slices/eventslice";
import { setCreatebudget } from "./redux/slices/createbudgetslice";


import AppRoutes from "./approute";

export const userContext = createContext();

const formatLocalDate = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function App() {
  const dispatch = useDispatch();
  const { request } = useApi();

  const [isloggedin, setIsloggedin] = useState(false);
  const [getstarted, setGetstarted] = useState(false);
  const [active, setActive] = useState("A");
  const [dropdown, setDropdown] = useState("");
  const [remainingbudget, setRemainingbudget] = useState(0);
  const [creditcardamount, setCreditcardamount] = useState(0);

  // Derived events from Redux Store
  const events = useSelector((state) => state.Events.value);
  
  const { todayEvents, tomorrowEvents } = useMemo(() => {
    const todayStr = formatLocalDate(new Date());
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = formatLocalDate(tomorrow);

    return {
      todayEvents: events.filter((event) => event.date === todayStr),
      tomorrowEvents: events.filter((event) => event.date === tomorrowStr),
    };
  }, [events]);

  // Fetch all necessary data on mount or when logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const fetchData = async () => {
      try {
        // 1. Fetch Total Budget
        const budgetresponse = await request({ url: "/budget/gettotalbudget", method: "GET" });
        if (budgetresponse?.totalbudget) {
          dispatch(setTotalbudget(budgetresponse.totalbudget));
        }

        // 2. Fetch Expenses
        const expenseresponse = await request({ url: "/budget/getexpense", method: "GET" });
        if (expenseresponse?.Expense) {
          dispatch(setExpense(expenseresponse.Expense));
        }

        // 3. Fetch Subscriptions
        const subscriptionresponse = await request({ url: "/budget/getsubscription", method: "GET" });
        if (subscriptionresponse?.subscription) {
          dispatch(setSubscription(subscriptionresponse.subscription));
        }

        // 4. Fetch all the Budget details 
        const salaryresponse = await request({ url: "/budget/getcreatebudget", method: "GET" });
        if (salaryresponse?.allcreatebudget) {
          dispatch(setCreatebudget(salaryresponse.allcreatebudget));
        }

        // 5. Fetch Credit Budget
        const creditresponse = await request({ url: "/budget/getcreditbudget", method: "GET" });
        if (creditresponse?.creditbudget) {
          setCreditcardamount(creditresponse.creditbudget.limit);
        }

        // 6. Fetch Events
        const eventresponse = await request({ url: "/event/getevents", method: "GET" });
        if (eventresponse?.events) {
          dispatch(addevent(eventresponse.events));
        }
      } catch (err) {
        console.error("Error fetching global data:", err);
      }
    };

    fetchData();
  }, [getstarted]);

  // Global Remaining Budget Calculation
  const totalBudget = useSelector((state) => state.Totalbudget.value);
  const totalExpenseList = useSelector((state) => state.Expense.value);
  const subscriptionList = useSelector((state) => state.Subscriptionlist.value);



  useEffect(() => {
    const totalAmount = Array.isArray(totalBudget)
      ? totalBudget.reduce((sum, item) => sum + Number(item.nettotal || 0), 0)
      : 0;

    const overallExpense = Array.isArray(totalExpenseList)
      ? totalExpenseList.reduce((sum, exp) => sum + Number(exp.amount || 0), 0)
      : 0;

    const totalSubMoney = Array.isArray(subscriptionList)
      ? subscriptionList.reduce((sum, sub) => sum + Number(sub.price || 0), 0)
      : 0;

    setRemainingbudget(totalAmount - (overallExpense + totalSubMoney));
  }, [totalBudget, totalExpenseList, subscriptionList]);

  return (
    <BrowserRouter>
      <userContext.Provider
        value={{
          active,
          setActive,
          dropdown,
          setDropdown,
          remainingbudget,
          setRemainingbudget,
          creditcardamount,
          setCreditcardamount,
          alerts: tomorrowEvents,
          todayevents: todayEvents,
        }}
      >
        <AppRoutes
          isloggedin={isloggedin}
          setIsloggedin={setIsloggedin}
          getstarted={getstarted}
          setGetstarted={setGetstarted}
        />
      </userContext.Provider>
    </BrowserRouter>
  );
}

export default App;