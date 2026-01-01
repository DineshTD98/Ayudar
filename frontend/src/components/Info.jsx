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
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat relative overflow-hidden"
      style={{ backgroundImage: `url(${Infoslide2})` }}
    >
      {/* Dark Overlay for better contrast */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>

      {/* Main Content Card - Glassmorphism */}
      <div className="relative z-10 h-[500px] w-full max-w-[800px] mx-4 p-8 md:p-12 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl animate-fade-in">
        
        {/* Navigation - Top Right of Card */}
        <div className="absolute top-6 right-6 flex gap-3">
          <button
            onClick={() => { navigate("/login"); setIsloggedin(false); }}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium rounded-full border border-white/30 transition-all duration-300 backdrop-blur-sm"
          >
            Login
          </button>
          <button
            onClick={handlesignup}
            className="px-6 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300"
          >
            Sign Up
          </button>
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-center text-center mt-12 md:mt-0">
          {/* Decorative Pulse Dots */}
          <div className="flex space-x-3 mb-8">
            <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse delay-150"></div>
          </div>

          <h1 className="text-4xl md:text-4xl font-bold text-white mb-6 drop-shadow-lg tracking-tight">
            Welcome to <span className="text-emerald-400">Ayudar</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-12 font-light leading-relaxed">
            Happy Family! Happy life! <br />
            Keep everything for your family in one place, safe and organized.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 items-center">
            <button
              onClick={() => {
                getstarted ? navigate("/home") : navigate("/login");
                setIsloggedin(false);
              }}
              className="group relative px-16 py-5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-bold text-2xl rounded-full transition-all duration-500 transform hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] overflow-hidden"
            >
              <span className="relative z-10 transition-colors duration-300">Get Started</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </button>
          </div>

          <p className="text-white/60 mt-6 text-sm flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            Join thousands of happy families today
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-0 right-0 text-center px-6">
        <p className="text-white/40 text-sm">
          ©Ayudar. All rights reserved. | 
          <a href="#" className="hover:text-white transition-colors ml-2">Privacy Policy</a> | 
          <a href="#" className="hover:text-white transition-colors ml-2">Terms of Service</a>
        </p>
      </div>
    </div>
  );
}

export default Info;
