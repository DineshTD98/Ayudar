import { useState } from "react";
import Showpassword from "../assets/password-show.png";
import Hidepassword from "../assets/hide-password.jpg";
import axios from "axios";
import loginpageimage from "../assets/infoslideimages/loginpagebg.jpeg";
import toast from "react-hot-toast";

function Signuppage({ setIsloggedin }) {
  const [profile, setProfile] = useState({
    firstname: "",
    lastname: "",
    fullname: "",
    email: "",
    mobileno: "",
    username: "",
    password: "",
    confirmpassword: "",
  });
  const [display, setDisplay] = useState(false);
  const [showing, setShowing] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => {
      const updated = { ...prev, [name]: value };
      if (name === "firstname" || name === "lastname") {
        updated.fullname = (name === "firstname" ? value : prev.firstname) + " " + (name === "lastname" ? value : prev.lastname);
      }
      return updated;
    });
  };

  const validateField = (name, value) => {
    let error = "";
    if (value.trim() === "") {
      error = "This field is required";
    } else if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(value)) {
        error = "Invalid email format";
      }
    } else if (name === "mobileno") {
      if (value.length !== 10 || !/^\d+$/.test(value)) {
        error = "Mobile number must be 10 digits";
      }
    } else if (name === "password") {
      const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!pattern.test(value)) {
        error = "Requirement: Upper/lowercase, number, special char, 8+ chars";
      }
    } else if (name === "confirmpassword") {
      if (value !== profile.password) {
        error = "Passwords do not match";
      }
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    let hasErrors = false;

    Object.keys(profile).forEach((key) => {
      if (key !== "fullname") {
        const error = validateField(key, profile[key]);
        if (error) {
          newErrors[key] = error;
          hasErrors = true;
        }
      }
    });

    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      const BASE_URL = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${BASE_URL}/user/createuser`, profile);
      toast.success(response.data.message || "Account created successfully!");
      setIsloggedin(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      setErrors((prev) => ({ ...prev, submit: errorMsg }));
    }
  };

  const inputClass = (name) => `block w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl text-white placeholder-white/20 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 outline-none backdrop-blur-sm ${errors[name] ? "border-red-500/50" : "border-white/10"}`;
  const labelClass = "block text-[10px] font-black uppercase tracking-widest text-white/50 ml-1 mb-2";

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-x-hidden py-10 sm:py-20">
      {/* Shared Auth Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginpageimage})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[4px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-4 animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-gray-900/40 backdrop-blur-3xl rounded-[40px] border border-white/10 shadow-3xl overflow-hidden px-8 sm:px-12 py-10 sm:py-14">
          
          <header className="text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-black text-white mb-3 tracking-tight">
              Create <span className="text-emerald-400">Account</span>
            </h1>
            <p className="text-white/60 font-medium">Join the Ayudar family today</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={labelClass}>First Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-emerald-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <input type="text" name="firstname" value={profile.firstname} onChange={handleChange} onBlur={(e) => validateField("firstname", e.target.value)} className={inputClass("firstname")} placeholder="John" />
                </div>
                {errors.firstname && <p className="text-[10px] text-red-400 font-bold ml-1">{errors.firstname}</p>}
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Last Name</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-emerald-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  </div>
                  <input type="text" name="lastname" value={profile.lastname} onChange={handleChange} onBlur={(e) => validateField("lastname", e.target.value)} className={inputClass("lastname")} placeholder="Doe" />
                </div>
                {errors.lastname && <p className="text-[10px] text-red-400 font-bold ml-1">{errors.lastname}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={labelClass}>Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-emerald-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <input type="email" name="email" value={profile.email} onChange={handleChange} onBlur={(e) => validateField("email", e.target.value)} className={inputClass("email")} placeholder="john@example.com" />
                </div>
                {errors.email && <p className="text-[10px] text-red-400 font-bold ml-1">{errors.email}</p>}
              </div>

              <div className="space-y-2">
                <label className={labelClass}>Mobile No</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-emerald-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <input type="text" maxLength={10} name="mobileno" value={profile.mobileno} onChange={handleChange} onBlur={(e) => validateField("mobileno", e.target.value)} className={inputClass("mobileno")} placeholder="10-digit number" />
                </div>
                {errors.mobileno && <p className="text-[10px] text-red-400 font-bold ml-1">{errors.mobileno}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <label className={labelClass}>Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-emerald-400 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                </div>
                <input type="text" name="username" value={profile.username} onChange={handleChange} onBlur={(e) => validateField("username", e.target.value)} className={inputClass("username")} placeholder="choose_username" />
              </div>
              {errors.username && <p className="text-[10px] text-red-400 font-bold ml-1">{errors.username}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center pr-1">
                  <label className={labelClass}>Password</label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-emerald-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <input type={display ? "text" : "password"} name="password" value={profile.password} onChange={handleChange} onBlur={(e) => validateField("password", e.target.value)} className={inputClass("password")} placeholder="••••••••" />
                  <button type="button" onClick={() => setDisplay(!display)} className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <img src={display ? Showpassword : Hidepassword} alt="toggle" className="w-5 h-5 opacity-30 hover:opacity-100 transition-opacity invert" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center pr-1">
                  <label className={labelClass}>Confirm</label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/30 group-focus-within:text-emerald-400 transition-colors">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <input type={showing ? "text" : "password"} name="confirmpassword" value={profile.confirmpassword} onChange={handleChange} onBlur={(e) => validateField("confirmpassword", e.target.value)} className={inputClass("confirmpassword")} placeholder="••••••••" />
                  <button type="button" onClick={() => setShowing(!showing)} className="absolute inset-y-0 right-0 pr-4 flex items-center">
                    <img src={showing ? Showpassword : Hidepassword} alt="toggle" className="w-5 h-5 opacity-30 hover:opacity-100 transition-opacity invert" />
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg rounded-2xl shadow-xl shadow-emerald-500/20 transition-all active:scale-95 duration-200"
              >
                Create Account
              </button>
              {errors.submit && <p className="text-red-400 text-center text-sm font-bold mt-4 bg-red-500/10 p-3 rounded-xl border border-red-500/20 animate-shake">{errors.submit}</p>}
            </div>
          </form>

          <footer className="mt-10 pt-8 border-t border-white/5 text-center">
            <p className="text-white/40 text-xs font-medium mb-6">
              Already a member?
            </p>
            <button
              onClick={() => setIsloggedin(false)}
              className="w-full h-14 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all duration-200 backdrop-blur-sm active:scale-95"
            >
              Sign In
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default Signuppage;
