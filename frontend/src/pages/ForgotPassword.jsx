import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import loginpageimage from "../assets/infoslideimages/loginpagebg.jpeg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/user/forgot-password`, { email });
      setMessage(response.data.message);
      // For development purposes, if the token is returned, we can show it or use it
      if (response.data.resetToken) {
          console.log("Reset Token:", response.data.resetToken);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000"
        style={{ backgroundImage: `url(${loginpageimage})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-4 animate-fade-in">
        <div className="bg-gray-400/50 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden px-8 py-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl text-white mb-3 tracking-tight">
              Forgot <span className="text-emerald-400">Password?</span>
            </h1>
            <p className="text-white/70 font-light">
              Enter your email to receive a password reset link
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-bold text-md font-medium text-white/80 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-emerald-400">
                  <svg className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                  </svg>
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 outline-none backdrop-blur-sm"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl transform transition-all duration-300 mt-4 disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            {message && (
              <div className="bg-emerald-500/20 border border-emerald-500/50 p-3 rounded-xl backdrop-blur-md">
                <p className="text-emerald-200 text-sm text-center font-medium">
                  {message}
                </p>
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500/50 p-3 rounded-xl backdrop-blur-md">
                <p className="text-red-200 text-sm text-center font-medium">
                  {error}
                </p>
              </div>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
