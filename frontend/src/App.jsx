import "./App.css";
import "./index.css";

import "./css/about.css";
import "./css/loginform.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import Loginpage from "./pages/loginpage";
import Home from "./pages/home";
import Firstpage from "./pages/firtstpage";
import Document from "./pages/documents";
import Events from "./pages/events";
import Budget from "./pages/budget";
import Shopping from "./pages/Shopping";

import Layout from "./components/layout";
import ProtecteRoute from "./components/protectedroute";

export const userContext = createContext();

function App() {
  const [opendocuments, setOpendocuments] = useState(false);
  const [viewdocuments, setViewdocuments] = useState(false);
  const [isloggedin, setIsloggedin] = useState(false);
  const [getstarted, setGetstarted] = useState(false);
  const [showbudget, setShowbudget] = useState(false);
  const [createbudget, setCreatebudget] = useState(false);
  const [active, setActive] = useState("A");
  const [dropdown, setDropdown] = useState("");
  const [createshopping, setCreateshopping] = useState(false);
  const [viewshopping, setViewshopping] = useState(false);
  const [remainingbudget,setRemainingbudget]=useState(0)
  useEffect(() => {
    const page = localStorage.getItem("currentpage");

    if (page === "opendocuments") {
      setOpendocuments(true);
      setViewdocuments(false);
    }

    if (page === "viewdocuments") {
      setOpendocuments(false);
      setViewdocuments(true);
    }

    if (page === "createbudget") {
      setCreatebudget(true);
      setShowbudget(false);
    }

    if (page === "createshopping") {
      setCreateshopping(true);
      setViewshopping(false);
    }

    if (page === "viewshopping") {
      setCreateshopping(false);
      setViewshopping(true);
    }
  }, []);

  return (
    <userContext.Provider
      value={{
        opendocuments,
        setOpendocuments,
        viewdocuments,
        setViewdocuments,
        showbudget,
        setShowbudget,
        createbudget,
        setCreatebudget,
        active,
        setActive,
        dropdown,
        setDropdown,
        createshopping,
        setCreateshopping,
        viewshopping,
        setViewshopping,
        remainingbudget,
        setRemainingbudget
      }}
    >
      <BrowserRouter>
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
              <Route path="/budget" element={<Budget />} />
              <Route path="/events" element={<Events />} />
              <Route path="/shopping" element={<Shopping />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </userContext.Provider>
  );
}

export default App;
