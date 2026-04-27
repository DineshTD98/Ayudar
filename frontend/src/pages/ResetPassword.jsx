import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import loginpageimage from "../assets/infoslideimages/loginpagebg.jpeg";
import Showpassword from "../assets/password-show.png";
import Hidepassword from "../assets/hide-password.jpg";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await axios.post(`${API_URL}/user/reset-password`, { 
        token, 
        newPassword 
      });
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${loginpageimage})` }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[3px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-4 animate-fade-in">
        <div className="bg-gray-400/50 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden px-8 py-10">
          <div className="text-center mb-10">
            <h1 className="text-4xl text-white mb-3 tracking-tight">
              Reset <span className="text-emerald-400">Password</span>
            </h1>
            <p className="text-white/70 font-light">
              Enter your new password below
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block font-bold text-md font-medium text-white/80 ml-1">
                New Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-emerald-400">
                  <svg className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={show ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

            <div className="space-y-2">
              <label className="block font-bold text-md font-medium text-white/80 ml-1">
                Confirm Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none group-focus-within:text-emerald-400">
                  <svg className="h-5 w-5 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type={show ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="block w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all duration-300 outline-none backdrop-blur-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg rounded-xl transform transition-all duration-300 mt-4 disabled:opacity-50"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>

            {message && (
              <div className="bg-emerald-500/20 border border-emerald-500/50 p-3 rounded-xl backdrop-blur-md">
                <p className="text-emerald-200 text-sm text-center font-medium">
                  {message}. Redirecting to login...
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
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
