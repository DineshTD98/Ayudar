import Budgetcards from "../components/budgetcards";
import { useEffect, useMemo, useState } from "react";

import MyPieChart from "../components/piechart";
import useapi from "../customehooks/useapi";
import Expensetable from "../components/expensetable";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setSubscription } from "../redux/slices/subscriptionslice";
import { setCreatebudget } from "../redux/slices/createbudgetslice";
function Budget() {
  const [expense, setExpense] = useState([]);
  const [totalexpense, setAmount] = useState(null);
  const [creditcardamount, setCreditcardamount] =useState(0);
  const { request, error, loading } = useapi();
  const location = useLocation();
  
  
  const dispatch=useDispatch()

  const subscriptionlist=useSelector((state)=>state.Subscriptionlist.value)
  

  // getting the subscription list
     
     useEffect(() => {
         async function datafetch() {
               try {
                 const data = await request({
                   url: "/budget/getsubscription",
                   method: "GET",
                 });
                 if (data.subscription) {
                   dispatch(setSubscription(data.subscription));
                 }
               } catch (err) {
                 console.log(err.message);
               }
             }
             datafetch();
           }, []);
  

    useEffect(()=>{
        async function datafetch() {
            try {
              const data = await request({
                url: "/budget/getsalarydate",
                method: "GET",
              });
              if (data.salarydatebudget) {
                 dispatch(setCreatebudget(data.salarydatebudget));
              }
            } catch (err) {
              console.log(err.message);
            }
          }
          datafetch();
    },[]) 
   
    // used usememo to do the complex logic dont run again and again
 
    const totalsubmoney=useMemo(()=>{
           return Array.isArray(subscriptionlist) ? subscriptionlist.reduce((sum,sub)=>sum + (sub.price||0),0) : 0
     },[subscriptionlist])

  // getting expense from the backend 

  useEffect(() => {
    const fetchexpense = async () => {
      try {
        const data = await request({
          url: "/budget/getexpense",
          method: "GET",
        });

        setExpense(data.Expense);
        
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchexpense();
  }, []);

  // useeffect to add subscription expenses from the subscription 

  useEffect(()=>{
       const overallexpense=Array.isArray(expense) ?
          expense.reduce((sum,exp)=> sum + (exp.amount||0), 0):
          0;
      setAmount(overallexpense + totalsubmoney)
  },[expense,totalsubmoney])



  // to add a color to find out which page is active
  const navClass = ({ isActive }) =>
    `text-left px-4 py-2 rounded-lg font-semibold transition-all ${
      isActive
        ? "bg-green-700 text-white"
        : "hover:bg-green-100 text-gray-700"
    }`;

  

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* SIDEBAR */}
      <aside className="w-[260px] bg-white shadow-lg p-4">
        <h1 className="text-2xl font-bold text-green-700 mb-8 text-center">
          Budget
        </h1>

        <nav className="flex flex-col gap-3">
          <NavLink to="overview" className={navClass}
           onClick={()=>{
            localStorage.setItem("currentpage","overview")
           }}
          >
            Overview
          </NavLink>

          <NavLink to="create" className={navClass}
            onClick={()=>{
            localStorage.setItem("currentpage","createbudget")
           }}
          >
            Create Budget
          </NavLink>

          <NavLink to="expenses" className={navClass}
             onClick={()=>{
            localStorage.setItem("currentpage","expenses")
           }}
          >
            Expenses
          </NavLink>

          <NavLink to="transactions" className={navClass}
            onClick={()=>{
            localStorage.setItem("currentpage","transactions")}}
          >
            Transactions
          </NavLink>

          <NavLink to="subscriptions" className={navClass}
              onClick={()=>{
            localStorage.setItem("currentpage","subscriptions")}}
          >
            Subscriptions
          </NavLink>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6">
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

                <div className="mt-6 grid grid-cols-12 gap-6">
                  <div className="col-span-7 bg-white rounded-lg shadow p-4">
                    <h2 className="text-xl font-semibold mb-4">
                      Recent Expenses
                    </h2>
                    <Expensetable expense={expense} />
                  </div>

                  <div className="col-span-5 bg-white rounded-lg shadow p-4">
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
                setExpense,
                setAmount,
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