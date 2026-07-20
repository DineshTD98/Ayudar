import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import DashboardCard from "../components/DashboardCard";
import Infoslide2 from "../assets/infoslideimages/infoslideimage3.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const { remainingbudget, alerts, todayevents, updateRemainingBudgetAmount } = useContext(UserContext);
  const [opennav,setOpennav] = useState(false);
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [tempAmount, setTempAmount] = useState("");

  return (
    <div className="relative z-10 pt-28 sm:pt-32 max-w-7xl mx-auto w-full px-4 sm:px-6 pb-12">

    
    <div className="relative z-10 pt-0 max-w-7xl mx-auto w-full">
        
      <div className="flex flex-col lg:flex-row lg:gap-6 items-start lg:items-start">
          <div className="mb-12 animate-fade-in flex flex-col gap-3 lg:item-start w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              Welcome back, <span className="text-emerald-400">Family</span>!
            </h1>
            <p className="text-white/70 text-base sm:text-lg font-light">
              Here's what's happening with your family today.
            </p>
          </div>

          <div className="mb-12 lg:w-1/2 w-full">
            <div className="animate-fade-in relative z-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <h3 className="text-white font-display font-bold text-xl md:text-2xl tracking-widest uppercase opacity-80 flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  Daily Briefing
                </h3>
                <div className="h-px flex-grow bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </div>
 
             <div className="flex flex-col gap-6">
                {/* Today Events */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <h4 className="text-white font-semibold text-lg">Today's Schedule</h4>
                      </div>
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-widest px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">Active</span>
                    </div>

                    <div className="space-y-4 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                      {todayevents.length > 0 ? (
                        todayevents.map((event, index) => (
                          <div key={event._id} className="group/item flex items-start gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors duration-200">
                            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 font-bold text-xs group-hover/item:text-blue-400 transition-colors">
                              {index + 1}
                            </span>
                            <div>
                              <p className="text-white/90 font-medium text-base mb-0.5">{event.title}</p>
                              <p className="text-white/50 text-sm font-light leading-relaxed">{event.description}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-6 text-center">
                          <p className="text-white/30 italic text-sm">No scheduled events for today</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Tomorrow Alerts */}
                <div className="group relative">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-amber-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
                  <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl transition-all duration-300">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <h4 className="text-white font-semibold text-lg">Upcoming Tomorrow</h4>
                      </div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">Pending</span>
                    </div>

                    <div className="space-y-4 max-h-[160px] overflow-y-auto pr-2 custom-scrollbar">
                      {alerts.length > 0 ? (
                        alerts.map((alert, index) => (
                          <div key={alert._id} className="group/item flex items-start gap-4 p-3 rounded-2xl hover:bg-white/5 transition-colors duration-200">
                            <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 font-bold text-xs group-hover/item:text-emerald-400 transition-colors">
                              {index + 1}
                            </span>
                            <div>
                              <p className="text-white/90 font-medium text-base mb-0.5">{alert.title}</p>
                              <p className="text-white/50 text-sm font-light leading-relaxed">{alert.description}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="py-6 text-center">
                          <p className="text-white/30 italic text-sm">Clear schedule for tomorrow</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
             </div>

        {/* Dashboard Grid */}
             <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
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
                <span className="text-sm uppercase tracking-wider text-white/40 mb-1 flex items-center justify-between">
                  <span>Remaining</span>
                  {!isEditing && (
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setTempAmount(remainingbudget);
                        setIsEditing(true);
                      }}
                      className="p-1 rounded hover:bg-white/10 text-emerald-400 transition-colors"
                      title="Edit Total Budget"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                      </svg>
                    </button>
                  )}
                </span>
                {isEditing ? (
                  <div className="flex flex-col gap-3 mt-2 w-full" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="number"
                      value={tempAmount}
                      onChange={(e) => setTempAmount(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-3 text-white text-xl sm:text-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500 font-black tracking-tight"
                      autoFocus
                    />
                    <div className="flex items-center gap-2 justify-end w-full">
                      <button 
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-400 rounded-xl text-xs font-bold transition-colors"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={async () => {
                          const parsed = parseFloat(tempAmount);
                          if (!isNaN(parsed) && parsed >= 0) {
                            await updateRemainingBudgetAmount(parsed);
                          }
                          setIsEditing(false);
                        }}
                        className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-colors shadow-lg shadow-emerald-500/20"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                ) : (
                  <span className="text-4xl sm:text-5xl font-black text-emerald-400 tracking-tight leading-none mt-1">
                    ₹{remainingbudget.toLocaleString()}
                  </span>
                )}
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
         <div className="mt-8 sm:mt-12 p-5 sm:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
           <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Quick Tip</h2>
           <p className="text-white/60 leading-relaxed font-light text-sm sm:text-base">
             "The key to a happy home is organization. Use Ayudar to track your daily expenses and never lose a document again."
           </p>
         </div>
    </div>
  );
}

export default Home;