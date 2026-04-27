import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../components/ConfirmationModal";

function Profile() {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handlelogout = () => {
    setIsLogoutModalOpen(true);
  };

  const confirmLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    localStorage.removeItem("currentpage");
    setIsLogoutModalOpen(false);
  };

  const navClass = ({ isActive }) =>
    `text-left px-5 py-4 rounded-2xl font-bold transition-all flex items-center gap-4 ${
      isActive
        ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
        : "text-slate-400 hover:bg-white/5 hover:text-white"
    }`;

  return (
    <div className="min-h-screen text-slate-200 p-4 sm:p-6 pt-28 sm:pt-32">
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-6 lg:gap-10">
        
        {/* SIDEBAR */}
        <aside className="w-full lg:w-[300px] lg:shrink-0">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl lg:rounded-[40px] p-5 sm:p-8 lg:sticky lg:top-36 shadow-2xl">
            <div className="mb-6 lg:mb-10 px-2">
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight italic">
                Account <span className="text-indigo-400">Settings</span>
              </h1>
              <p className="text-slate-500 text-sm mt-2 font-medium tracking-wide">
                Manage your profile
              </p>
            </div>

            <nav className="flex lg:flex-col flex-row gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-hide">
              <NavLink
                to="/profile/personal"
                onClick={() => localStorage.setItem("currentpage", "personal")}
                className={navClass}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Personal
              </NavLink>

              <NavLink
                to="/profile/security"
                onClick={() => localStorage.setItem("currentpage", "security")}
                className={navClass}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Security
              </NavLink>

              <NavLink
                to="/profile/preferences"
                onClick={() => localStorage.setItem("currentpage", "preferences")}
                className={navClass}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Preferences
              </NavLink>

              <div className="lg:mt-8 border-t border-white/5 pt-4">
                <button
                  onClick={handlelogout}
                  className="w-full text-left px-5 py-4 rounded-2xl font-bold text-rose-400 hover:bg-rose-500/10 transition-all flex items-center gap-4"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Logout
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 min-w-0">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Outlet />
          </div>
        </main>
      </div>
      <ConfirmationModal 
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={confirmLogout}
        title="Logout"
        message="Are you sure you want to log out of your account?"
      />
    </div>
  );
}

export default Profile;