import Budgetcards from "../components/budgetcards";
import { useMemo } from "react";
import MyPieChart from "../components/piechart";
import useapi from "../customehooks/useapi";
import Expensetable from "../components/expensetable";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setExpense } from "../redux/slices/expenseslice";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

function Budget() {
  const { error, loading } = useapi();
  const location = useLocation();
  const dispatch = useDispatch();

  const expense = useSelector((state) => state.Expense.value);
  const subscriptionlist = useSelector((state) => state.Subscriptionlist.value);
  
  const { creditcardamount, setCreditcardamount } = useContext(UserContext);

  const totalsubmoney = useMemo(() => {
    return Array.isArray(subscriptionlist) ? subscriptionlist.reduce((sum, sub) => sum + (sub.price || 0), 0) : 0;
  }, [subscriptionlist]);

  const totalexpense = useMemo(() => {
    const overallexpense = Array.isArray(expense) ?
      expense.reduce((sum, exp) => sum + (exp.amount || 0), 0) :
      0;
    return overallexpense + totalsubmoney;
  }, [expense, totalsubmoney]);

  const navClass = ({ isActive }) =>
    `text-left px-5 py-4 rounded-2xl font-bold transition-all flex items-center gap-4 ${
      isActive
        ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <div className="min-h-screen text-slate-200 p-4 sm:p-6 pt-28 sm:pt-32">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
        {/* SIDEBAR */}
        <aside className="w-full lg:w-[320px] lg:shrink-0">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl lg:rounded-[40px] p-5 sm:p-8 lg:sticky lg:top-36 shadow-2xl">
            <div className="mb-6 lg:mb-12 px-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight italic">Budget <span className="text-indigo-400">Center</span></h1>
              <p className="text-slate-500 text-sm mt-2 font-medium tracking-wide">Manage your finances</p>
            </div>

            <nav className="flex lg:flex-col flex-row gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
              <NavLink to="overview" className={navClass} onClick={() => localStorage.setItem("currentpage", "overview")}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.6} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Overview
              </NavLink>

              <NavLink to="create" className={navClass} onClick={() => localStorage.setItem("currentpage", "createbudget")}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.6} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Create Budget
              </NavLink>

              <NavLink to="expenses" className={navClass} onClick={() => localStorage.setItem("currentpage", "expenses")}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.6} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                Expenses
              </NavLink>

              <NavLink to="subscriptions" className={navClass} onClick={() => localStorage.setItem("currentpage", "subscriptions")}>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.6} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Subscriptions
              </NavLink>
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0">
          {error ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 shadow-2xl">
              <svg className="w-16 h-16 text-red-400 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-2xl font-black text-white">Service Interrupt</p>
              <p className="text-slate-400 mt-2 font-medium">Unable to synchronize financial records.</p>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              {location.pathname.endsWith("/overview") && (
                <div className="space-y-10">
                  <Budgetcards totalexpense={totalexpense}/>

                  <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-10">
                    <div className="xl:col-span-7 bg-white/5 backdrop-blur-2xl rounded-3xl lg:rounded-[40px] border border-white/10 p-5 sm:p-10 shadow-2xl">
                      <div className="flex items-center justify-between mb-10">
                        <h2 className="text-2xl font-black text-white tracking-tight">Recent Activity</h2>
                        <button className="text-indigo-400 text-sm font-black uppercase tracking-widest hover:text-indigo-300 transition-colors">View All</button>
                      </div>
                      <Expensetable expense={expense} />
                    </div>

                    <div className="xl:col-span-5 bg-white/5 backdrop-blur-2xl rounded-3xl lg:rounded-[40px] border border-white/10 p-5 sm:p-10 shadow-2xl">
                      <h2 className="text-2xl font-black text-white tracking-tight mb-10">Analytics</h2>
                      <div className="flex justify-center p-6 bg-white/5 rounded-[32px] border border-white/5">
                        {loading ? (
                          <div className="h-[300px] flex items-center justify-center text-slate-500 italic font-medium">
                            Synthesizing analytics...
                          </div>
                        ) : (
                          <MyPieChart expense={expense} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-0">
                <Outlet
                  context={{
                    expense,
                    setExpense: (data) => {
                      if (typeof data === 'function') {
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
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Budget;