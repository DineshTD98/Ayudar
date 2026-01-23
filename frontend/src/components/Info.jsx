import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import Infoslide2 from "../assets/infoslideimages/infoslideimage3.jpg";

function Info() {
  const navigate = useNavigate();
  const { getstarted, setIsloggedin } = useOutletContext();

  const handlesignup = () => {
    setIsloggedin(true);
    navigate("/login");
  };

  return (
    <div 
      className="h-screen w-full bg-cover bg-center bg-no-repeat relative overflow-hidden flex flex-col"
      style={{ backgroundImage: `url(${Infoslide2})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[3px] z-0"></div>

      {/* Main Container */}
      <div className="relative z-10 h-full flex flex-col justify-between py-6 px-6">
        
        {/* Top Navigation */}
        <div className="w-full flex justify-end gap-3">
          <button
            onClick={() => { navigate("/login"); setIsloggedin(false); }}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full border border-white/20 transition-all duration-300 backdrop-blur-md"
          >
            Login
          </button>
          <button
            onClick={handlesignup}
            className="px-5 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/20"
          >
            Sign Up
          </button>
        </div>

        {/* Hero & Brief Info */}
        <div className="flex-grow flex flex-col items-center justify-center max-w-7xl mx-auto w-full gap-8">
          <div className="text-center space-y-3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Welcome to <span className="text-emerald-400">Ayudar</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 font-light max-w-3xl mx-auto">
              Happy Family! Happy life! The smartest way to manage your family's budget, 
              events, documents, and shopping. Keep everything safe and organized in one place.
            </p>
          </div>

          {/* Quick Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Smart Budgeting</h3>
              <p className="text-white/60 text-sm leading-relaxed">Track income, expenses, and subscriptions with detailed insights and balance alerts.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Family Calendar</h3>
              <p className="text-white/60 text-sm leading-relaxed">A shared place for the whole family to schedule gatherings and set important reminders.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Secure Vault</h3>
              <p className="text-white/60 text-sm leading-relaxed">Keep important family documents organized and accessible in a secure central place.</p>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center text-center hover:bg-white/10 transition-all duration-300">
              <div className="w-12 h-12 bg-rose-500/20 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Shopping Lists</h3>
              <p className="text-white/60 text-sm leading-relaxed">Efficiently manage household shopping. Create lists together and track your essentials.</p>
            </div>
          </div>


          <button
            onClick={() => {
              getstarted ? navigate("/home") : navigate("/login");
              setIsloggedin(false);
            }}
            className="group relative px-12 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-xl rounded-full transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] overflow-hidden"
          >
            <span className="relative z-10">Get Started</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          </button>
        </div>

        {/* Bottom Text */}
        <div className="w-full text-center">
            <p className="text-white/30 text-[10px] tracking-widest uppercase">Ayudar — Organize your family life</p>
        </div>
      </div>
    </div>
  );


}

export default Info;
