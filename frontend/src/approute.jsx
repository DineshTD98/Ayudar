import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Loginpage from "./pages/loginpage";
import Home from "./pages/home";
import Firstpage from "./pages/firtstpage";
import Document from "./pages/documents";
import Events from "./pages/events";
import Budget from "./pages/budget";
import Shopping from "./pages/Shopping";

import Layout from "./components/layout";
import ProtecteRoute from "./components/protectedroute";
import Createbudget from "./components/createbudget";
import Expenses from "./components/expenses";
import Subscriptions from "./components/subscriptions";
import Transactions from "./components/transactions";

function AppRoutes({
  isloggedin,
  setIsloggedin,
  getstarted,
  setGetstarted,
}) {
  const navigate = useNavigate();

  // ✅ LocalStorage → URL sync
  useEffect(() => {
    const page = localStorage.getItem("currentpage");

    const routes = {
      expenses: "/budget/expenses",
      createbudget: "/budget/create",
      transactions: "/budget/transactions",
      subscriptions: "/budget/subscriptions",
      home:"/home",
      showbudget:'/budget/overview',

    };

    if (routes[page]) {
      navigate(routes[page], { replace: true });
    }

    if(page === "viewdocuments"){
         setViewdocuments(true);
         setOpendocuments(false);
    }

    if(page === "uploaddocuments"){
         setViewdocuments(false);
         setOpendocuments(true);
    }

    if(page === "createshopping"){
         setCreateshopping(true);
         setViewshopping(false);
    }

     if(page === "viewshopping"){
         setCreateshopping(false);
         setViewshopping(true);
    }

   }, [navigate]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Firstpage
            isloggedin={isloggedin}
            setIsloggedin={setIsloggedin}
            getstarted={getstarted}
          />
        }
      />

      <Route
        path="/login"
        element={
          <Loginpage
            setIsloggedin={setIsloggedin}
            isloggedin={isloggedin}
            setGetstarted={setGetstarted}
          />
        }
      />

      <Route element={<ProtecteRoute />}>
        <Route element={<Layout setGetstarted={setGetstarted} />}>
          <Route path="/home" element={<Home />} />
          <Route path="/document" element={<Document />} />

          <Route path="/budget" element={<Budget />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<></>} />
            <Route path="create" element={<Createbudget />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="subscriptions" element={<Subscriptions />} />
          </Route>

          <Route path="/events" element={<Events />} />
          <Route path="/shopping" element={<Shopping />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;