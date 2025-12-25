import { useSelector, useDispatch } from "react-redux";
import { setUsername, setPassword } from "../redux/slices/loginslice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Showpassword from "../assets/password-show.png";
import Hidepassword from "../assets/hide-password.jpg";
import axios from "axios";

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
      alert("please enter username and password");
      return;
    }
    try {
      const response = await axios.post("https://ayudar.onrender.com/user/login", {
        username,
        password,
      });
      console.log("login response:", response.data);
      if (response?.data?.token) {
        localStorage.setItem("token", response.data.token);
      }

      alert(response.data.message);

      setWelcome(true);

      setTimeout(() => {
        Navigate("/home");
        setWelcome(false);
        setGetstarted(true);
      }, 1000);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || err.message);
    }
  };

  const handlesignup = () => {
    setIsloggedin(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      {!welcome ? (
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-black to-black px-8 py-4">
              <h1 className="text-2xl font-bold text-white text-center">
                Welcome Back
              </h1>
              <p className="text-blue-100 text-center mt-2">
                Sign in to your account
              </p>
            </div>

            {/* Form */}
            <div className="px-8 py-8">
              <form onSubmit={handlesubmit} className="space-y-6">
                {/* Username Field */}
                <div className="space-y-2">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => dispatch(setUsername(e.target.value))}
                      className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-none"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="text-sm text-blue-600 hover:text-blue-800 font-medium transition duration-200"
                    >
                      {show ? "Hide" : "Show"} password
                    </button>
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </div>
                    <input
                      type={show ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => dispatch(setPassword(e.target.value))}
                      className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 outline-none"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShow(!show)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <img
                        src={show ? Showpassword : Hidepassword}
                        alt={show ? "Hide password" : "Show password"}
                        className="w-5 h-5 opacity-60 hover:opacity-100 transition duration-200"
                      />
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-black to-black text-white font-semibold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-200 transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
              </form>

              {/* Divider */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-600">
                  Don't have an account?
                </p>
                <button
                  onClick={handlesignup}
                  className="w-full mt-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-emerald-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition duration-200 shadow-lg hover:shadow-xl"
                >
                  Create New Account
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By signing in, you agree to our Terms of Service and Privacy
                  Policy
                </p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="mt-8 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-500">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center animate-fade-in">
          <div className="bg-gradient-to-r from-black to-gray-400 rounded-2xl shadow-2xl p-12 max-w-lg mx-auto">
            <div className="mb-6">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-2 animate-pulse">
                Welcome!
              </h2>
              <p className="text-xl text-blue-100 font-medium">
                Hello,{" "}
                <span className="font-bold text-yellow-300">{username}</span>
              </p>
            </div>
            <div className="flex justify-center">
              <div className="w-8 h-8 border-t-2 border-white rounded-full animate-spin"></div>
            </div>
            <p className="mt-6 text-blue-100">
              Redirecting you to the dashboard...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
