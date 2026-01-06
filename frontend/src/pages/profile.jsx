import { Outlet,NavLink} from "react-router-dom";
import { useNavigate } from "react-router-dom";
function Profile() {
    const navigate = useNavigate();

    const handlelogout=()=>{
         const logout=window.confirm("Do you want to logout")
         if(!logout) return;
          
          navigate("/login"),
          localStorage.removeItem("token"),
          localStorage.removeItem("currentpage")
      }
      
  return (
    <div>
         <div className="min-h-screen bg-gray-100 flex lg:flex-row flex-col">
     
              {/* Sidebar */}
              <aside className="w-full lg:w-64 bg-white shadow-md">
                  <h2 className="hidden lg:flex text-xl font-bold p-4 border-b text-center mt-6">Profile</h2>

                  <nav className="flex lg:flex-col flex-row lg:p-4 p-3 gap-2 lg:gap-0 overflow-x-auto lg:overflow-x-visible">
                    <NavLink to="/profile/personal" onClick={() => localStorage.setItem("currentpage", "personal")}
                    className="border border-green-800 rounded p-2 bg-black text-white hover:bg-green-800 hover:text-white transition-colors duration-300 lg:mb-3 whitespace-nowrap text-center lg:text-left"
                    > Personal Info </NavLink>
                    
                    <NavLink to="/profile/security" onClick={() => localStorage.setItem("currentpage", "security")}
                    className="border border-green-800 rounded p-2 bg-black text-white hover:bg-green-800 hover:text-white transition-colors duration-300 lg:mb-3 whitespace-nowrap text-center lg:text-left"
                    > Security </NavLink>
                    
                    <NavLink to="/profile/preferences" onClick={() => localStorage.setItem("currentpage", "preferences")}
                    className="border border-green-800 rounded p-2 bg-black text-white hover:bg-green-800 hover:text-white transition-colors duration-300 lg:mb-3 whitespace-nowrap text-center lg:text-left"
                    >Preferences </NavLink>

                    <button className="border border-red-600 bg-red-600 text-white hover:bg-red-700 p-2 rounded transition-colors duration-300 lg:mb-3 whitespace-nowrap text-center lg:text-left" onClick={handlelogout}>
                      Logout
                    </button>
                  </nav>
              </aside>

              {/* Page Content */}
            <main className="flex-1 p-4 lg:p-6">
                <Outlet />
            </main>
          </div>
    </div>
  )
}

export default Profile