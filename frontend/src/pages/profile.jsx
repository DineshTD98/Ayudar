import { Outlet,NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Profile() {
    const navigate = useNavigate();
  return (
    <div>
         <div className="min-h-screen bg-gray-100 flex">
     
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <h2 className="text-xl font-bold p-4 border-b text-center mt-6 ">Profile</h2>

        <nav className="flex flex-col p-2">
          <NavLink to="/profile/personal" onClick={() => localStorage.setItem("currentpage", "personal")}
           className="border border-green-800 rounded p-2 bg-black text-white hover:bg-green-800 hover:text-white transition-colors duration-300 transition-all ease-in-out 900ms mb-3"
          > Personal Info </NavLink>
          
          <NavLink to="/profile/security" onClick={() => localStorage.setItem("currentpage", "security")}
           className="border border-green-800 rounded p-2 bg-black text-white hover:bg-green-800 hover:text-white transition-colors duration-300 transition-all ease-in-out 900ms mb-3"
          > Security </NavLink>
          
          <NavLink to="/profile/preferences" onClick={() => localStorage.setItem("currentpage", "preferences")}
           className="border border-green-800 rounded p-2 bg-black text-white hover:bg-green-800 hover:text-white transition-colors duration-300 transition-all ease-in-out 900ms mb-3"
          >Preferences </NavLink>

          <button className="text-red-600 hover:bg-red-50 p-2 rounded" onClick={() => {navigate("/login"),localStorage.removeItem("token"),localStorage.removeItem("currentpage")}}>
            Logout
          </button>
        </nav>
      </aside>

      {/* Page Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
    </div>
  )
}

export default Profile