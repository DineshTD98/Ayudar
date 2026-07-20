import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { useContext, useEffect, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";

function Navbar({ setGetstarted }) {
  const {
    dropdown,
    setDropdown,
  } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleDropdown = (dropdownKey) => {
    setDropdown(dropdown === dropdownKey ? "" : dropdownKey);
  };

  // Handle scroll for navbar dynamic background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

  // Close mobile menu and dropdowns when route changes
  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
    setDropdown("");
  }, [location.pathname]);

  const handlelogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    navigate("/");
    setGetstarted(false);
    localStorage.removeItem("currentpage");
    localStorage.removeItem("token");
    setIsLogoutModalOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? "bg-[#0f172a]/80 backdrop-blur-2xl border-b border-white/10 py-4 shadow-2xl" : "bg-white/5 backdrop-blur-lg py-8"
    }`}>
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div 
          className="text-3xl font-black tracking-[0.15em] uppercase text-white cursor-pointer hover:scale-105 transition-transform"
          onClick={() => navigate("/home")}
        >
          <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">Ayudar</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {/* Home */}
          <button
            onClick={() => navigate("/home")}
            className={`px-5 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center gap-2 ${
              location.pathname === "/home" 
                ? "bg-white/20 text-white shadow-inner" 
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </button>

          {/* Budget */}
          <div className="relative dropdown-button">
            <button
              onClick={() => handleDropdown("B")}
              className={`px-5 py-3 rounded-2xl text-lg font-bold transition-all duration-300 flex items-center gap-2 ${
                location.pathname.includes("/budget") 
                  ? "bg-white/20 text-white" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Budget
              <svg className={`w-4 h-4 transition-transform duration-300 ${dropdown === "B" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdown === "B" && (
              <div className="absolute top-full left-0 mt-3 min-w-[200px] bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in dropdown-menu p-2">
                <button
                  onClick={() => { navigate("/budget/overview"); setDropdown(""); }}
                  className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all text-sm font-medium"
                >
                  Show Budget
                </button>
                <button
                  onClick={() => { navigate("/budget/create"); setDropdown(""); }}
                  className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all text-sm font-medium"
                >
                  Create Budget
                </button>
              </div>
            )}
          </div>

          {/* Documents */}
          <div className="relative dropdown-button">
            <button
              onClick={() => handleDropdown("C")}
              className={`px-5 py-3 rounded-2xl text-lg font-bold transition-all duration-300 flex items-center gap-2 ${
                location.pathname.includes("/document") 
                  ? "bg-white/20 text-white" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Documents
              <svg className={`w-4 h-4 transition-transform duration-300 ${dropdown === "C" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdown === "C" && (
              <div className="absolute top-full left-0 mt-3 min-w-[200px] bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in dropdown-menu p-2">
                <button
                  onClick={() => { navigate("/document/viewdocuments"); setDropdown(""); }}
                  className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all text-sm font-medium"
                >
                  View Documents
                </button>
                <button
                  onClick={() => { navigate("/document/uploaddocuments"); setDropdown(""); }}
                  className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all text-sm font-medium"
                >
                  Upload Documents
                </button>
              </div>
            )}
          </div>

          {/* Shopping */}
          <div className="relative dropdown-button">
            <button
              onClick={() => handleDropdown("D")}
              className={`px-5 py-3 rounded-2xl text-lg font-bold transition-all duration-300 flex items-center gap-2 ${
                location.pathname.includes("/shopping") 
                  ? "bg-white/20 text-white" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Shopping
              <svg className={`w-4 h-4 transition-transform duration-300 ${dropdown === "D" ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropdown === "D" && (
              <div className="absolute top-full left-0 mt-3 min-w-[200px] bg-gray-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in dropdown-menu p-2">
                <button
                  onClick={() => { navigate("/shopping/viewshopping"); setDropdown(""); }}
                  className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all text-sm font-medium"
                >
                  Shopping List
                </button>
                <button
                  onClick={() => { navigate("/shopping/createshopping"); setDropdown(""); }}
                  className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all text-sm font-medium"
                >
                  Create List
                </button>
              </div>
            )}
          </div>

          {/* Events */}
          <button
            onClick={() => navigate("/events")}
            className={`px-5 py-3 rounded-2xl text-lg font-bold transition-all duration-300 flex items-center gap-2 ${
              location.pathname === "/events" 
                ? "bg-white/20 text-white" 
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Events
          </button>
        </div>

        {/* Profile & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-3 pr-4 border-r border-white/10">
             <button
              onClick={() => navigate("/profile/personal")}
              className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
          </div>
          
          <button
            onClick={handlelogout}
            className="hidden lg:flex items-center gap-2 px-6 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-2xl transition-all duration-300 text-lg font-bold"
          >
            Logout
          </button>

          <button
            className="lg:hidden w-12 h-12 flex items-center justify-center text-white bg-white/10 rounded-full hover:bg-white/20 transition-all"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-[72px] sm:top-[88px] bottom-0 z-40 bg-[#0f172a]/98 backdrop-blur-2xl overflow-y-auto transition-all duration-500 ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10 pointer-events-none"
        }`}
      >
        <div className="p-4 space-y-1 pb-24">
          <button className="w-full text-left px-6 py-4 text-white font-bold hover:bg-white/10 rounded-2xl transition-all text-lg" onClick={() => { navigate("/home"); setMobileMenuOpen(false); }}>🏠 Home</button>
          
          <div className="border-t border-white/5 my-2"></div>
          <p className="px-6 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">Budget Center</p>
          <button className="w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all font-medium" onClick={() => { navigate("/budget/overview"); setMobileMenuOpen(false); }}>📊 Show Budget</button>
          <button className="w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all font-medium" onClick={() => { navigate("/budget/create"); setMobileMenuOpen(false); }}>➕ Create Budget</button>
          
          <div className="border-t border-white/5 my-2"></div>
          <p className="px-6 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">Documents</p>
          <button className="w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all font-medium" onClick={() => { navigate("/document/viewdocuments"); setMobileMenuOpen(false); }}>📁 View Documents</button>
          <button className="w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all font-medium" onClick={() => { navigate("/document/uploaddocuments"); setMobileMenuOpen(false); }}>📤 Upload Documents</button>
          
          <div className="border-t border-white/5 my-2"></div>
          <p className="px-6 py-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">Shopping</p>
          <button className="w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all font-medium" onClick={() => { navigate("/shopping/viewshopping"); setMobileMenuOpen(false); }}>🛒 Shopping List</button>
          <button className="w-full text-left px-6 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-2xl transition-all font-medium" onClick={() => { navigate("/shopping/createshopping"); setMobileMenuOpen(false); }}>✏️ Create List</button>
          
          <div className="border-t border-white/5 my-2"></div>
          <button className="w-full text-left px-6 py-4 text-white font-bold hover:bg-white/10 rounded-2xl transition-all text-lg" onClick={() => { navigate("/events"); setMobileMenuOpen(false); }}>📅 Events</button>
          <button className="w-full text-left px-6 py-4 text-white font-bold hover:bg-white/10 rounded-2xl transition-all text-lg" onClick={() => { navigate("/profile/personal"); setMobileMenuOpen(false); }}>⚙️ Profile</button>
          
          <div className="border-t border-white/5 my-2"></div>
          <button
            onClick={() => { handlelogout(); setMobileMenuOpen(false); }}
            className="w-full text-left px-6 py-4 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all font-bold text-lg"
          >
            🚪 Logout
          </button>
        </div>
      </div>
      <ConfirmationModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Logout"
        message="Are you sure you want to log out from Ayudar?"
      />
    </nav>
  );
}

export default Navbar;
