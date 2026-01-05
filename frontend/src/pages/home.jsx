import { useContext } from "react";
import { userContext } from "../App";
import DashboardCard from "../components/DashboardCard";
import Infoslide2 from "../assets/infoslideimages/infoslideimage3.jpg";
import { useNavigate } from "react-router-dom";

function Home() {
  const { remainingbudget, alerts, todayevents } = useContext(userContext);
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat bg-fixed relative overflow-hidden flex flex-col pb-12 px-6"
      style={{ backgroundImage: `url(${Infoslide2})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-0"></div>

    
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center h-24 px-6">
        <div className="w-1/2 text-right">
          <p className="text-3xl font-bold text-white tracking-widest uppercase">
            Ayudar
          </p>
        </div>
        <div className="w-1/2 flex gap-4 justify-end">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("currentpage");
              navigate("/");
            }}
            className="px-6 py-2 bg-white/10 hover:bg-red-500/20 text-white font-medium rounded-full border border-white/20 transition-all duration-300 backdrop-blur-md"
          >
            Logout
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-2 bg-white/10 hover:bg-emerald-500/20 text-white font-medium rounded-full border border-white/20 transition-all duration-300 backdrop-blur-md"
          >
            Profile
          </button>
        </div>
      </div>
     

     
      <div className="relative z-10 pt-32 max-w-7xl mx-auto w-full">
        
        <div className="flex">
          <div className="mb-12 animate-fade-in w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Welcome back, <span className="text-emerald-400">Family</span>!
            </h1>
            <p className="text-white/70 text-lg font-light">
              Here's what's happening with your family today.
            </p>
          </div>

          <div className="mb-12 w-1/2">
            <div className="animate-fade-in relative z-12">
              <h3 className="block text-center w-full text-red-500 font-bold text-[28px] animate-shake-80% animate-blink">
                Important Alerts <span className="text-red-500">!</span>
              </h3>

              <div className="flex gap-2">
                <div className="border border-green-900 p-4 rounded-2xl mt-2 max-h-[150px] w-[400px] overflow-y-auto">
                  {alerts.length > 0 ? (
                    alerts.map((alert, index) => (
                      <div key={alert._id} className="flex flex-col gap-2">
                        <p className="text-blue-500 border-b border-white/5 py-1">
                          {index + 1}. {alert.title}
                        </p>
                        <p className="text-white/70">{alert.description}</p>
                        <p className="text-white/70">{alert.date}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-white/40 text-center italic">
                      No Alerts for tomorrow.
                    </p>
                  )}
                </div>

                <div className="border text-center border-green-800 p-4 rounded-2xl mt-2 max-h-[150px] w-[400px] overflow-y-auto">
                  {todayevents.length > 0 ? (
                    todayevents.map((event, index) => (
                      <div key={event._id} className="flex flex-col gap-2">
                        <p className="text-blue-500 border-b border-white/5 py-1">
                          {index + 1}. {event.title}
                        </p>
                        <p className="text-white/70">{event.description}</p>
                        <p className="text-white/70">{event.date}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-white/40 text-center italic">
                      No urgent events today.
                    </p>
                  )}
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
                <span className="text-sm text-white/60">No events for today</span>
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