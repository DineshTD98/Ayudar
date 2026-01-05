import { useContext } from "react";
import { userContext } from "../App";
import DashboardCard from "../components/DashboardCard";
import Infoslide2 from "../assets/infoslideimages/infoslideimage3.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const { remainingbudget, alerts, todayevents } = useContext(userContext);
  const [opennav,setOpennav] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed relative overflow-hidden flex flex-col pb-12 px-6"
      style={{ backgroundImage: `url(${Infoslide2})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0"></div>

    
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center h-24 px-6">
            <div className="w-1/2 sm:w-2/3 text-right">
               <p className="font-display text-4xl font-extrabold tracking-[0.25em] uppercase
                  bg-gradient-to-r from-emerald-300 via-white to-emerald-300 
                  bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(52,211,153,0.35)]">
                     Ayudar
                </p>
            </div>
            <div className="lg:hidden w-1/2 sm:w-1/3 text-right">
            <button className=" text-white p-2" onClick={()=>setOpennav(!opennav)}>
               <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                {
                  opennav ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                         : (
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                 )}
                </svg>
            </button>
            </div>
            <div className="hidden w-1/2 lg:flex gap-4 justify-end">
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("currentpage");
                    navigate("/");
                  }}
                  className="px-7 py-2.5 bg-white/10 hover:bg-red-500/20 text-white font-display font-semibold text-sm tracking-wide rounded-full border border-white/20 transition-all duration-300 backdrop-blur-md hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
                >
                  Logout
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="px-7 py-2.5 bg-white/10 hover:bg-emerald-500/20 text-white font-display font-semibold text-sm tracking-wide rounded-full border border-white/20 transition-all duration-300 backdrop-blur-md hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Profile
                </button>
            </div>
     </div>
     {/* Mobile menu */}
     <div className={`lg:hidden fixed top-24 left-0 right-0 z-40 overflow-hidden transition-all duration-300 ease-in-out ${opennav ? "max-h-screen opacity-100" : "opacity-0 max-h-0"}`}>
        <div className="bg-black/50 backdrop-blur-md px-6 py-4 space-y-3">
            <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("currentpage");
                    navigate("/");
                  }}
                  className="w-full px-7 py-2.5 bg-white/10 hover:bg-red-500/20 text-white font-display font-semibold text-sm tracking-wide rounded-full border border-white/20 transition-all duration-300 backdrop-blur-md hover:scale-105 hover:shadow-lg hover:shadow-red-500/20"
                >
                  Logout
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="w-full px-7 py-2.5 bg-white/10 hover:bg-emerald-500/20 text-white font-display font-semibold text-sm tracking-wide rounded-full border border-white/20 transition-all duration-300 backdrop-blur-md hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
                >
                  Profile
                </button>
        </div>
           </div>
     

     
    <div className="relative z-10 pt-32 max-w-7xl mx-auto w-full">
        
      <div className="flex flex-col lg:flex-row lg:gap-6 items-start lg:items-start">
          <div className="mb-12 animate-fade-in flex flex-col gap-3 lg:item-start w-full lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Welcome back, <span className="text-emerald-400">Family</span>!
            </h1>
            <p className="text-white/70 text-lg font-light">
              Here's what's happening with your family today.
            </p>
          </div>

          <div className="mb-12 lg:w-1/2 w-full">
            <div className="animate-fade-in relative z-12">
              <h3 className="block text-center w-full text-red-400 font-display font-extrabold text-[32px] tracking-tight animate-shake-80% animate-blink drop-shadow-[0_0_15px_rgba(248,113,113,0.5)]">
                Important Alerts<span className="text-red-500 text-[36px]">!</span>
              </h3>
 
             <div className="flex lg:flex-row flex-col gap-6 items-start">
  {/* Tomorrow Alerts */}
                <div className="flex flex-col w-[400px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></span>
                    <h4 className="text-blue-300 font-display font-semibold tracking-wide">
                      Today Events
                    </h4>
                  </div>

                <div className="border-2 border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-blue-800/10 p-5 rounded-2xl max-h-[150px] overflow-y-auto backdrop-blur-md shadow-lg shadow-blue-500/20">
                  {todayevents.length > 0 ? (
                    todayevents.map((event, index) => (
                      <div key={event._id} className="flex flex-col gap-1 mb-3 last:mb-0">
                        <p className="text-blue-200 font-semibold text-lg">
                          {index + 1}. {event.title}
                        </p>
                        <p className="text-white/70 text-lg">{event.description}</p>
                        <p className="text-blue-400/50 text-[20px]">{event.date}</p>
                  </div>
                 ))
                ) : (
                  <p className="text-white/40 text-center italic text-sm">
                    No urgent events today
                  </p>
                )}
                </div>
                </div>
              <div className="flex flex-col w-[400px]">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
                    <h4 className="text-emerald-300 font-display font-semibold tracking-wide">
                      Tomorrow Alerts
                    </h4>
             </div>

            <div className="border-2 border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 to-emerald-800/10 p-5 rounded-2xl max-h-[150px] overflow-y-auto backdrop-blur-md shadow-lg shadow-emerald-500/20">
              {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <div key={alert._id} className="flex flex-col gap-1 mb-3 last:mb-0">
                    <p className="text-emerald-200 font-semibold text-lg">
                      {index + 1}. {alert.title}
                    </p>
                    <p className="text-white/70 text-lg">{alert.description}</p>
                    <p className="text-emerald-400/50 text-[20px]">{alert.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-white/40 text-center italic text-lg">
                  No alerts for tomorrow
                </p>
              )}
            </div>
              </div>

  
  
              </div>
            </div>
          </div>
             </div>

        {/* Dashboard Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Budget"
            color="bg-emerald-500"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0Z" />
              </svg>
            }
            content={
              <div className="flex flex-col">
                <span className="text-sm uppercase tracking-wider text-white/40 mb-1">
                  Remaining
                </span>
                <span className="text-3xl font-bold text-emerald-400">
                  ₹{remainingbudget.toLocaleString()}
                </span>
              </div>
            }
            link="/budget"
          />

          <DashboardCard
            title="Events"
            color="bg-blue-500"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            }
            content={
              <div className="flex flex-col">
                {todayevents.length>0?<span className="text-xl font-bold  text-red-500">{todayevents[0].title}</span>:<span className="text-sm text-white/60">No events for today</span>}
                <span className="mt-2 text-white/40 italic">Stay tuned!</span>
              </div>
            }
            link="/events"
          />

          <DashboardCard
            title="Documents"
            color="bg-amber-500"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            content={
              <div className="flex flex-col">
                <span className="text-sm text-white/60 font-medium">
                  Quick Access
                </span>
                <p className="text-sm text-white/40 mt-1">
                  Keep your important files safe and organized.
                </p>
              </div>
            }
            link="/document/viewdocuments"
          />

          <DashboardCard
            title="Shopping"
            color="bg-rose-500"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            }
            content={
              <div className="flex flex-col">
                <span className="text-sm text-white/60">
                  Manage your essentials
                </span>
                <p className="text-sm text-white/40 mt-1">
                  Don't forget anything on your next trip.
                </p>
              </div>
            }
            link="/shopping/viewshopping"
          />
             </div>
         </div>
         <div className="mt-12 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
           <h2 className="text-2xl font-semibold text-white mb-4">Quick Tip</h2>
           <p className="text-white/60 leading-relaxed font-light">
             "The key to a happy home is organization. Use Ayudar to track your daily expenses and never lose a document again."
           </p>
         </div>
    </div>
  );
}

export default Home;