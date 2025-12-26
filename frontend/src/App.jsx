import "./App.css";
import "./index.css";

import "./css/about.css";
import "./css/loginform.css";

import { BrowserRouter } from "react-router-dom";
import { createContext, useState } from "react";

import AppRoutes from "./approute";

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
  const [remainingbudget, setRemainingbudget] = useState(0);

  return (
    <BrowserRouter>
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
          setRemainingbudget,
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