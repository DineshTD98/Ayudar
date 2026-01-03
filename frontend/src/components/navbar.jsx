import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { useContext, useEffect } from "react";

function Navbar({ setGetstarted }) {
  const {
    setActive,
    dropdown,
    setDropdown,
  } = useContext(userContext);

  const navigate = useNavigate();
  const location = useLocation();

  const handleDropdown = (dropdownKey) => {
    setDropdown(dropdown === dropdownKey ? "" : dropdownKey);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown &&
        !event.target.closest(".dropdown-button") &&
        !event.target.closest(".dropdown-menu")
      ) {
        setDropdown("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdown, setDropdown]);

  return (
    <div
      className="bg-green-200 p-3 fixed top-0 left-0 right-0 z-50"
      style={{ backgroundImage: "linear-gradient(to bottom, rgba(128, 143, 135, 1), rgba(128, 143, 135, 1))" }}
    >
      <div className="flex flex-row items-center justify-between p-4 h-16 relative text-white">
        {/* Left side - Ayudar text */}
        <div className="text-2xl font-bold text-emerald-100">Ayudar</div>

        {/* Right side - Navigation buttons */}
        <div className="flex items-center space-x-6 relative">
          {/* Home menu navbar */}
          <button
            className={`${location.pathname === "/home" ? "text-white font-bold" : "text-black"} rounded px-3 py-2 text-lg font-medium hover:bg-yellow-800 hover:text-white transition-colors`}
            onClick={() => {
              navigate("/home");
              setDropdown(dropdown === "A" ? "" : "A");
              localStorage.setItem("currentpage", "home");
            }}
          >
            Home
          </button>

          {/* Budget menu navbar */}
          <div className="relative dropdown-button">
            <button
               className={`${location.pathname.includes("/budget") ? "text-white font-bold" : "text-black"} rounded px-3 py-2 text-lg font-medium hover:bg-yellow-800 hover:text-white transition-colors flex items-center gap-1`}
              onClick={() => handleDropdown("B")}
            >
              Budget
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${dropdown === "B" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {dropdown === "B" && (
              <div className="absolute top-full left-0 mt-1 min-w-[140px] z-50 dropdown-menu">
                <div className="bg-green-900 rounded shadow-lg py-1">
                  <button
                    className="block w-full text-left text-white px-4 py-2 hover:bg-green-800"
                    onClick={() => {
                      navigate("/budget");
                      setActive("A");
                      setDropdown("");
                      localStorage.setItem("currentpage", "showbudget");
                    }}
                  >
                    Show budget
                  </button>
                  <button
                    className="block w-full text-left text-white px-4 py-2 hover:bg-green-800"
                    onClick={() => {
                      navigate("/budget");
                      setDropdown("");
                      setActive("B");
                      navigate('/budget/create')
                      localStorage.setItem("currentpage", "createbudget");
                    }}
                  >
                    Create budget
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Documents menu navbar */}
          <div className="relative dropdown-button">
            <button
               className={`${location.pathname.includes("/document") ? "text-white font-bold" : "text-black"} rounded px-3 py-2 text-lg font-medium hover:bg-yellow-800 hover:text-white transition-colors flex items-center gap-1`}
              onClick={() => handleDropdown("C")}
            >
              Documents
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${dropdown === "C" ? "rotate-180" : ""}`}
                fill="none"
                stroke="black"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {dropdown === "C" && (
              <div className="absolute top-full left-0 mt-1 min-w-[160px] z-50 dropdown-menu">
                <div className="bg-green-900 rounded shadow-lg py-1">
                  <button
                    className="block w-full text-left text-white px-4 py-2 hover:bg-green-800"
                    onClick={() => {
                      navigate("/document/viewdocuments")
                      setDropdown("");
                      localStorage.setItem("currentpage", "viewdocuments");
                    }}
                  >
                    View documents
                  </button>
                  <button
                    className="block w-full text-left text-white px-4 py-2 hover:bg-green-800"
                    onClick={() => {
                      setDropdown("");
                      navigate('/document/uploaddocuments')
                      localStorage.setItem("currentpage", "uploaddocuments");
                    }}
                  >
                    Upload documents
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Shopping menu navbar */}
          <div className="relative dropdown-button">
            <button
               className={`${location.pathname.includes("/shopping") ? "text-white font-bold" : "text-black"} rounded px-3 py-2 text-lg font-medium hover:bg-yellow-800 hover:text-white transition-colors flex items-center gap-1`}
              onClick={() => handleDropdown("D")}
            >
              Shopping
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${dropdown === "D" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {dropdown === "D" && (
              <div className="absolute top-full left-0 mt-1 min-w-[140px] z-50 dropdown-menu">
                <div className="bg-green-900 rounded shadow-lg py-1">
                  <button
                    className="block w-full text-left text-white px-4 py-2 hover:bg-green-800"
                    onClick={() => {
                      navigate("/shopping/createshopping");
                      setDropdown("");
                      localStorage.setItem("currentpage", "createshopping");
                    }}
                  >
                    Createshopping
                  </button>
                  <button
                    className="block w-full text-left text-white px-4 py-2 hover:bg-green-800"
                    onClick={() => {
                      navigate("/shopping/viewshopping");
                      setDropdown("");
                      localStorage.setItem("currentpage", "viewshopping");
                    }}
                  >
                    Viewshopping
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Events menu navbar */}
          <button
             className={`${location.pathname.includes("/events") ? "text-white font-bold" : "text-black"} rounded px-3 py-2 text-lg font-medium hover:bg-yellow-800 hover:text-white transition-colors`}
            onClick={() => {
              navigate("/events");
              setDropdown(dropdown === "E" ? "" : "E");
              
            }}
          >
            Events
          </button>

          {/* Profile menu navbar */}
          <div className="relative dropdown-button">
            <button
               className={`${location.pathname.includes("/profile") ? "text-white font-bold" : "text-black"} rounded px-3 py-2 text-lg font-medium hover:bg-yellow-800 hover:text-white transition-colors flex items-center gap-1`}
              onClick={() => handleDropdown("F")}
            >
              Profile
              <svg
                className={`w-4 h-4 transform transition-transform duration-200 ${dropdown === "F" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {dropdown === "F" && (
              <div className="absolute top-full left-0 mt-1 min-w-[120px] z-50 dropdown-menu">
                <div className="bg-green-900 rounded shadow-lg py-1">
                  <button className="block w-full text-left text-white px-4 py-2 hover:bg-green-800 rounded"
                  onClick={() => {
                    navigate("/profile/personal");
                    setDropdown("");
                    localStorage.setItem("currentpage", "personal");
                  }}
                  >
                    Settings
                  </button>
                  <button
                    className="block w-full text-left text-white px-4 py-2 hover:bg-green-800 rounded"
                    onClick={() => {
                      navigate("/");
                      setGetstarted(false);
                      localStorage.removeItem("currentpage");
                      localStorage.removeItem("token");
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
