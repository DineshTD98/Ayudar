import { useSelector, useDispatch } from "react-redux";
import { setUsername, setPassword } from "../redux/slices/loginslice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Showpassword from "../assets/password-show.png";
import Hidepassword from "../assets/hide-password.jpg";
import axios from "axios";
import loginpageimage from "../assets/infoslideimages/loginpagebg.jpeg";

function Login({ setIsloggedin, setGetstarted }) {
  const [welcome, setWelcome] = useState(false);
  const [show, setShow] = useState(false);
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const username = useSelector((state) => state.Logindetails.username.value);
  const password = useSelector((state) => state.Logindetails.password.value);

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }
    try {
      const response = await axios.post("https://ayudar.onrender.com/user/login", {
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
      alert(err.response?.data?.message || err.message);
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
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"></div>
      </div>

      {!welcome ? (
        <div className="relative z-10 w-full max-w-lg mx-4 animate-fade-in">
          {/* Glassmorphism Card */}
          <div className="bg-gray-400/50 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden px-8 py-10">
            
            {/* Header */}
            <div className="text-center mb-10">
              <h1 className="text-4xl text-white mb-3 tracking-tight">
                Welcome <span className="text-emerald-400">Back</span>
              </h1>
              <p className="text-white/70 font-light">
                Securely sign in to your Ayudar account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handlesubmit} className="space-y-6">
              {/* Username Field */}
              <div className="space-y-2">
                <label className="block font-bold text-md font-medium text-white/80 ml-1">
                  Username
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-400">
                    <svg className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => dispatch(setUsername(e.target.value))}
                    className="block w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 outline-none backdrop-blur-sm"
                    placeholder="your_username"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between ml-1">
                  <label className="block font-bolder text-md font-medium text-white/80">
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-emerald-400">
                    <svg className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <input
                    type={show ? "text" : "password"}
                    value={password}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    className="block w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 outline-none backdrop-blur-sm"
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
                      className="w-5 h-5 opacity-40 hover:opacity-100 transition-opacity duration-200 invert"
                    />
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                className="w-full h-14 bg-green-900 text-white font-bold text-lg rounded-xl hover:bg-black hover:text-white transform transition-all duration-300 mt-4"
              >
                Sign In
              </button>
            </form>

            {/* Divider */}
            <div className="mt-10 pt-8 border-t border-white/10 text-center">
              <p className="text-white/60 text-sm mb-6">
                New to the family?
              </p>
              <button
                onClick={handlesignup}
                className="w-full h-14 bg-white/10 hover:bg-blue-700 hover:text-white text-white font-semibold rounded-xl border border-white/20 transition-all duration-200 backdrop-blur-sm overflow-hidden group"
              >
                <span className="relative z-10">Create New Account</span>
              </button>
            </div>

            <footer className="mt-8 text-center">
              <p className="text-[10px] text-white/40 leading-tight">
                By continuing, you agree to our <br />
                <a href="#" className="underline hover:text-white/60 transition-colors">Terms of Service</a> & <a href="#" className="underline hover:text-white/60 transition-colors">Privacy Policy</a>
              </p>
            </footer>
          </div>
        </div>
      ) : (
        /* Redesigned Success State */
        <div className="relative z-20 text-center animate-fade-in px-4">
          <div className="bg-white/10 backdrop-blur-3xl w-[500px] rounded-[40px] border border-white/20 p-16 max-w-md mx-auto shadow-3xl">
            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
              <svg className="w-12 h-12 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-5xl font-bold text-white mb-4 tracking-tight">
              Hello!
            </h2>
            <p className="text-2xl text-emerald-300 font-medium mb-10">
              {username}
            </p>
            <div className="inline-flex items-center gap-3 text-white/60">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></div>
              <span className="text-sm font-light">Entering dashboard...</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
