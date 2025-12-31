import { Outlet,NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Profile() {
    const navigate = useNavigate();
  return (
    <div>
         <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <h2 className="text-xl font-bold p-4 border-b">Profile</h2>

        <nav className="flex flex-col p-2">
          <NavLink to="/profile/personal" onClick={() => localStorage.setItem("currentpage", "personal")}> Personal Info </NavLink>
          <NavLink to="/profile/security" onClick={() => localStorage.setItem("currentpage", "security")}> Security </NavLink>
          <NavLink to="/profile/preferences" onClick={() => localStorage.setItem("currentpage", "preferences")}>Preferences </NavLink>

          <button className="mt-6 text-red-600 hover:bg-red-50 p-2 rounded" onClick={() => {navigate("/"),localStorage.removeItem("token"),localStorage.removeItem("currentpage")}}>
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