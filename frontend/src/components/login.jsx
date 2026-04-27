import { useSelector, useDispatch } from "react-redux";
import { setUsername, setPassword } from "../redux/slices/loginslice";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import Showpassword from "../assets/password-show.png";
import Hidepassword from "../assets/hide-password.jpg";
import axios from "axios";
import loginpageimage from "../assets/infoslideimages/loginpagebg.jpeg";

function Login({ setIsloggedin, setGetstarted }) {
  const [welcome, setWelcome] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.Logindetails.username.value);
  const password = useSelector((state) => state.Logindetails.password.value);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter your username and password");
      return;
    }
    setError("");
    try {
      const API_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${API_URL}/user/login`, {
        username,
        password,
      });
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      setWelcome(true);

      setTimeout(() => {
        Navigate("/home");
        setWelcome(false);
        setGetstarted(true);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials. Please try again.");
    }
  };

  const handlesignup = () => {
    setIsloggedin(true);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Fixed Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{ backgroundImage: `url(${loginpageimage})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]"></div>
      </div>

      {!welcome ? (
        <div className="relative z-10 w-full max-w-lg mx-4 animate-in fade-in zoom-in-95 duration-700">
          {/* Glassmorphism Card */}
          <div className="bg-gray-900/40 backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-3xl overflow-hidden px-8 sm:px-12 py-10 sm:py-14">
            
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight">
                Welcome <span className="text-emerald-400">Back</span>
              </h1>
              <p className="text-white/60 font-medium">
                Securely sign in to your account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handlesubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block text-[10px] font-black uppercase tracking-widest text-white/50 ml-1">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-emerald-400 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => dispatch(setUsername(e.target.value))}
                    className="block w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 outline-none backdrop-blur-sm"
                    placeholder="your_username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="block text-[10px] font-black uppercase tracking-widest text-white/50">
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-emerald-400 transition-colors">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    className="block w-full pl-12 pr-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 outline-none backdrop-blur-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  >
                    <img
                      src={show ? Showpassword : Hidepassword}
                      alt="toggle password"
                      className="w-5 h-5 opacity-30 hover:opacity-100 transition-opacity duration-200 invert"
                    />
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <Link 
                    to="/forgot-password" 
                    className="text-emerald-400 hover:text-emerald-300 text-[10px] font-black uppercase tracking-widest transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-14 bg-emerald-500 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transform transition-all active:scale-95 duration-200 mt-4"
              >
                Sign In
              </button>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl backdrop-blur-md animate-shake">
                  <p className="text-red-400 text-xs text-center font-bold">
                    {error}
                  </p>
                </div>
              )}
            </form>

            {/* Divider */}
            <div className="mt-10 pt-8 border-t border-white/5 text-center">
              <p className="text-white/40 text-xs font-medium mb-6">
                New to Ayudar?
              </p>
              <button
                onClick={handlesignup}
                className="w-full h-14 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all duration-200 backdrop-blur-sm active:scale-95"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Redesigned Success State */
        <div className="relative z-20 text-center animate-in fade-in zoom-in duration-500 px-4">
          <div className="bg-gray-900/40 backdrop-blur-3xl w-full max-w-md rounded-[40px] border border-white/10 p-12 sm:p-16 mx-auto shadow-3xl">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Hello!
            </h2>
            <p className="text-2xl text-emerald-400 font-bold mb-10">
              {username}
            </p>
            <div className="inline-flex items-center gap-3 text-white/40">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
              <span className="text-xs font-black uppercase tracking-[0.2em]">Entering Hub...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
