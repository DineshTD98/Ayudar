import { useLocation, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import { useContext, useEffect } from "react";
import Navbarimage from "../assets/navbarimage2.webp";
function Navbar({ setGetstarted }) {
  const {
    setViewdocuments,
    setOpendocuments,
    setActive,
    dropdown,
    setDropdown,
    setCreateshopping,
    setShowbudget,
    setCreatebudget,
    setViewshopping,
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
      className="bg-green-200 p-3"
      style={{ backgroundImage: "linear-gradient(to right, #4D8467, #BEDA7C)" }}
    >
      <div className="flex flex-row items-center justify-between p-8 h-12 relative text-black">
        {/* Left side - Ayudar text */}
        <div className="text-2xl font-bold text-emerald-100">Ayudar</div>

        {/* Right side - Navigation buttons */}
        <div className="flex items-center space-x-4 relative">
          {/* Home menu navbar */}
          <button
            className={`${location.pathname === "/home" ? "text-white font-bold" : "text-black"} rounded p-1 hover:bg-yellow-800 hover:text-white transition-colors`}
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
              className={`${location.pathname === "/budget" ? "text-white font-bold" : "text-black"} rounded p-1 hover:bg-yellow-800 hover:text-white transition-colors`}
              onClick={() => handleDropdown("B")}
            >
              Budget
            </button>
            {dropdown === "B" && (
              <div className="absolute top-full left-0 mt-1 min-w-[140px] z-50 dropdown-menu">
                <div className="bg-green-900 rounded shadow-lg py-1">
                  <button
                    className="block w-full text-left text-white px-4 py-2 hover:bg-green-800"
                    onClick={() => {
                      navigate("/budget");
                      setShowbudget(true);
                      setCreatebudget(false);
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
                      setShowbudget(false);
                      setCreatebudget(true);
                      setDropdown("");
                      setActive("B");
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
              className={`${location.pathname === "/document" ? "text-white font-bold" : "text-black"} rounded p-1 hover:bg-yellow-800 hover:text-white transition-colors`}
              onClick={() => handleDropdown("C")}
            >
              Documents
            </button>
            {dropdown === "C" && (
              <div className="absolute top-full left-0 mt-1 min-w-[160px] z-50 dropdown-menu">
                <div className="bg-green-900 rounded shadow-lg py-1">
                  <button
                    className="block w-full text-left text-white px-4 py-2 hover:bg-green-800"
                    onClick={() => {
                      navigate("/document");
                      setDropdown("");
                      localStorage.setItem("currentpage", "viewdocuments");
                    }}
                  >
                    View documents
                  </button>
                  <button
                    className="block w-full text-left text-white px-4 py-2 hover:bg-green-800"
                    onClick={() => {
                      navigate("/document");
                      setDropdown("");
                      navigate('/documents/uploaddocuments')
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
              className={`${location.pathname === "/shopping" ? "text-white font-bold" : "text-black"} rounded p-1 hover:bg-yellow-800 hover:text-white transition-colors`}
              onClick={() => handleDropdown("D")}
            >
              Shopping
            </button>
            {dropdown === "D" && (
              <div className="absolute top-full left-0 mt-1 min-w-[140px] z-50 dropdown-menu">
                <div className="bg-green-900 rounded shadow-lg py-1">
                  <button
                    className="block w-full text-left text-white px-4 py-2 hover:bg-green-800"
                    onClick={() => {
                      navigate("/shopping");
                      setDropdown("");
                      setCreateshopping(true);
                      setViewshopping(false);
                      localStorage.setItem("currentpage", "createshopping");
                    }}
                  >
                    Createshopping
                  </button>
                  <button
                    className="block w-full text-left text-white px-4 py-2 hover:bg-green-800"
                    onClick={() => {
                      navigate("/shopping");
                      setDropdown("");
                      setCreateshopping(false);
                      setViewshopping(true);
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
            className={`${location.pathname === "/events" ? "text-white font-bold" : "text-black"} rounded p-1 hover:bg-yellow-800 hover:text-white transition-colors`}
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
              className={`${location.pathname === "/profile" ? "text-white font-bold" : "text-black"} rounded p-1 hover:bg-yellow-800 hover:text-white transition-colors`}
              onClick={() => handleDropdown("F")}
            >
              Profile
            </button>
            {dropdown === "F" && (
              <div className="absolute top-full left-0 mt-1 min-w-[120px] z-50 dropdown-menu">
                <div className="bg-green-900 rounded shadow-lg py-1">
                  <button className="block w-full text-left text-white px-4 py-2 hover:bg-green-800 rounded">
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
