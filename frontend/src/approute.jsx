import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";

import Loginpage from "./pages/loginpage";
import Home from "./pages/home";
import Firstpage from "./pages/firstpage";
import Documents from "./pages/document";

import Events from "./pages/events";
import Budget from "./pages/budget";
import Shopping from "./pages/Shopping";

import Profile from "./pages/profile";

import Personal from "./components/personal";
import Security from "./components/security";
import Preferences from "./components/preference";

import Layout from "./components/layout";
import ProtecteRoute from "./components/protectedroute";
import Createbudget from "./components/createbudget";
import Expenses from "./components/expenses";
import Subscriptions from "./components/subscriptions";
import Transactions from "./components/transactions";
import Uploaddocuments from "./components/uploaddocuments";
import Viewdocuments from "./components/viewdocuments";
import { userContext } from "./App";
import Viewshopping from "./components/viewshopping";
import Createshopping from "./components/createshopping";
import Shoppinghistory from "./components/shoppinghistory";

function AppRoutes({
  isloggedin,
  setIsloggedin,
  getstarted,
  setGetstarted,
}) {
  const navigate = useNavigate();
 
 
//   // LocalStorage → URL sync
//   useEffect(() => {
//     const page = localStorage.getItem("currentpage");

// //     const routes = {
//       expenses: "/budget/expenses",
//       createbudget: "/budget/create",
//       transactions: "/budget/transactions",
//       subscriptions: "/budget/subscriptions",
//       // home:"/home",
//       showbudget:'/budget/overview',
//       uploaddocuments:'/document/uploaddocuments',
//       createshopping:'/shopping/createshopping',
//       viewshopping:'/shopping/viewshopping',
//       shoppinghistory:"/shopping/shoppinghistory",
//       // personal:"/profile/personal",
//       // security:"/profile/security",
//       // preferences:"/profile/preferences",
//     };

//     if (routes[page]) {
//       navigate(routes[page], { replace: true });
//     }
    
// }, [navigate]);

    
  return (
    // rotue creation for the url
     <Routes>
        {/* first route to landing page */}
            <Route
            path="/" element={<Firstpage
                isloggedin={isloggedin}
                setIsloggedin={setIsloggedin}
                getstarted={getstarted} />
            }
        >
            <Route index element={<Navigate to="firstpage"/>}/>
            <Route path="firstpage" element={<Firstpage/>}/>

        </Route>

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
    
    {/*protected routes */}

      <Route element={<ProtecteRoute />}>
        <Route element={<Layout setGetstarted={setGetstarted} />}>
          <Route path="/home" element={<Home />} />

      {/*document page routes */} 

          <Route path="/document" element={<Documents/>}>
              <Route index element={<Navigate to="viewdocuments"/>}/>
              <Route path="viewdocuments" element={<Viewdocuments/>}/>
              <Route path="uploaddocuments" element={<Uploaddocuments/>}/>
          </Route>

         {/*budget page routes */} 

          <Route path="/budget" element={<Budget />}>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<></>} />
            <Route path="create" element={<Createbudget />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="subscriptions" element={<Subscriptions />} />
          </Route>
        


          <Route path="/events" element={<Events />} />
     
        {/*shopping route creation */}
           <Route path="/shopping" element={<Shopping />}>
                <Route index element={<Navigate to="viewshopping" replace/>}/>
                <Route path="viewshopping" element={<Viewshopping/>}/>
                <Route path="createshopping" element={<Createshopping/>}/>
                <Route path="shoppinghistory" element={<Shoppinghistory/>}/>
           </Route>

           <Route path="/profile" element={<Profile />}>
                <Route index element={<Navigate to="personal" replace/>}/>
                <Route path="personal" element={<Personal/>}/>
                <Route path="security" element={<Security/>}/>
                <Route path="preferences" element={<Preferences/>}/>
           </Route> 
        </Route>
      </Route>
    </Routes>
  );
}

export default AppRoutes;