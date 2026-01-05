import Budgetcards from "../components/budgetcards";
import { useEffect, useMemo, useState } from "react";

import MyPieChart from "../components/piechart";
import useapi from "../customehooks/useapi";
import Expensetable from "../components/expensetable";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";

import { setExpense } from "../redux/slices/expenseslice";
import { useContext } from "react";
import { userContext } from "../App";
function Budget() {
  const { request, error, loading } = useapi();
  const location = useLocation();
  const dispatch = useDispatch();

  const expense = useSelector((state) => state.Expense.value);
  const subscriptionlist = useSelector((state) => state.Subscriptionlist.value);
  
  const {creditcardamount, setCreditcardamount} = useContext(userContext);
  
  const [totalexpense, setTotalexpense] = useState(null);

  // used usememo to do the complex logic dont run again and again
  const totalsubmoney = useMemo(() => {
    return Array.isArray(subscriptionlist) ? subscriptionlist.reduce((sum, sub) => sum + (sub.price || 0), 0) : 0;
  }, [subscriptionlist]);

  // useeffect to update total expense whenever expense or subscription change
  useEffect(() => {
    const overallexpense = Array.isArray(expense) ?
      expense.reduce((sum, exp) => sum + (exp.amount || 0), 0) :
      0;
    setTotalexpense(overallexpense + totalsubmoney);
  }, [expense, totalsubmoney]);



  // to add a color to find out which page is active
  const navClass = ({ isActive }) =>
    `text-left px-4 py-2 rounded-lg font-semibold transition-all ${
      isActive
        ? "bg-green-700 text-white"
        : "hover:bg-green-100 text-gray-700"
    }`;

  

  return (
    <div className="min-h-screen bg-gray-100 flex lg:flex-row flex-col">
      {/* SIDEBAR */}
      <aside className="w-full lg:w-[260px] lg:fixed lg:top-20 lg:left-0 lg:h-screen bg-white shadow-lg lg:p-4 p-3">
        <h1 className="hidden lg:block text-2xl font-bold text-green-700 mb-8 text-center">
          Budget
        </h1>

        <nav className="flex lg:flex-col flex-row gap-2 lg:gap-3 overflow-x-auto lg:overflow-x-visible">
          <NavLink to="overview" className={`${navClass} whitespace-nowrap text-center lg:text-left`}
           onClick={()=>{
            localStorage.setItem("currentpage","overview")
           }}
          >
            Overview
          </NavLink>

          <NavLink to="create" className={`${navClass} whitespace-nowrap text-center lg:text-left`}
            onClick={()=>{
            localStorage.setItem("currentpage","createbudget")
           }}
          >
            Create Budget
          </NavLink>

          <NavLink to="expenses" className={`${navClass} whitespace-nowrap text-center lg:text-left`}
             onClick={()=>{
            localStorage.setItem("currentpage","expenses")
           }}
          >
            Expenses
          </NavLink>

          <NavLink to="transactions" className={`${navClass} whitespace-nowrap text-center lg:text-left`}
            onClick={()=>{
            localStorage.setItem("currentpage","transactions")}}
          >
            Transactions
          </NavLink>

          <NavLink to="subscriptions" className={`${navClass} whitespace-nowrap text-center lg:text-left`}
              onClick={()=>{
            localStorage.setItem("currentpage","subscriptions")}}
          >
            Subscriptions
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 lg:p-6 lg:ml-[260px]">
        {error ? (
          <p className="text-red-600 text-center">
            Couldn't fetch the data
          </p>
        ) : (
          <>
            {/* Default Overview when route is /budget/overview */}
            {location.pathname.endsWith("/overview") && (
              <>
                <Budgetcards totalexpense={totalexpense}/>

                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Recent Expenses
                    </h2>
                    <Expensetable expense={expense} />
                  </div>

                  <div className="lg:col-span-5 bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-4 text-center">
                      Expense Breakdown
                    </h2>
                    {loading && <p>Loading chart...</p>}
                    {!loading && <MyPieChart expense={expense} />}
                  </div>
                </div>
              </>
            )}

            {/* Nested routes render here */}
            <Outlet
              context={{
                expense,
                setExpense: (data) => {
                  if (typeof data === 'function') {
                    // Handle functional updates if necessary, though dispatching is better
                    const updated = data(expense);
                    dispatch(setExpense(updated));
                  } else {
                    dispatch(setExpense(data));
                  }
                },
                creditcardamount,
                setCreditcardamount
              }}
            />
          </>
        )}
      </main>
    </div>
  );
}

export default Budget;