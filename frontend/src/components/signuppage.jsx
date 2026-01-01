import { useState } from "react";
import Showpassword from "../assets/password-show.png";
import Hidepassword from "../assets/hide-password.jpg";
import axios from "axios";
import Signuppageimage from "../assets/infoslideimages/signuppageimage.jpg"

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
  const [msgalert, setAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFullname = (e) => {
    setProfile((prev) => ({
      ...prev,
      fullname: prev.firstname + " " + prev.lastname,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (profile.password !== profile.confirmpassword) {
      alert("Password does not match");
      return;
    }

    if (Object.values(profile).some((value) => value === "")) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const response = await axios.post(
        "https://ayudar.onrender.com/user/createuser",
        profile,
      );
      console.log(response.data);
      alert(response.data.message);
      setIsloggedin(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="min-h-screen h-screen relative">
    <div style={{backgroundImage: `url(${Signuppageimage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat", width: "100%", height: "100%"}}>
    </div>
    <div className="w-full flex items-center justify-center absolute z-50 top-5">
        <div className="bg-white lg:w-[50%] md:w-[60%] w-full rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        {/* Header */}
          <div className="bg-green-900 px-6 py-4">
            <h1 className="text-3xl font-bold text-white text-center">
              Create Your Account
            </h1>
            <p className="text-gray-300 text-center mt-1 text-base">
              Join our community in just a few steps
            </p>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First Name */}
                <div className="space-y-1">
                  <label className="block text-base font-medium text-gray-700">
                    First Name
                    <span className="text-red-500 ml-1">*</span>
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
                      name="firstname"
                      value={profile.firstname}
                      onChange={(e) => {
                        handleChange(e);
                        handleFullname(e);
                      }}
                      onBlur={(e) => {
                        if (e.target.value !== "" && e.target.value.trim() === "") {
                           if (e.target.value == "") {
                             alert("Field cannot be empty");
                             return;
                           }
                        }
                        if (e.target.value == "") {
                            alert("Field cannot be empty");
                            return;
                        }
                      }}
                      className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition duration-200 outline-none text-base"
                      placeholder="Enter first name"
                    />
                  </div>
                </div>

                {/* Last Name */}
                <div className="space-y-1">
                  <label className="block text-base font-medium text-gray-700">
                    Last Name
                    <span className="text-red-500 ml-1">*</span>
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
                      name="lastname"
                      value={profile.lastname}
                      onChange={(e) => {
                        handleChange(e);
                        handleFullname(e);
                      }}
                      onBlur={(e) => {
                        if (e.target.value == "") {
                          alert("Field cannot be empty");
                          return;
                        }
                      }}
                      className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition duration-200 outline-none text-base"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>
              </div>

              {/* Full Name (Read-only) */}
              <div className="space-y-1">
                <label className="block text-base font-medium text-gray-700">
                  Full Name
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
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="fullname"
                    value={profile.fullname}
                    readOnly
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 outline-none text-base"
                    placeholder="Full name will appear here"
                  />
                </div>
              </div>

              {/* Contact Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-1">
                  <label className="block text-base font-medium text-gray-700">
                    Email Address
                    <span className="text-red-500 ml-1">*</span>
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
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      onBlur={(e) => {
                        if (e.target.value == "") {
                          alert("Field cannot be empty");
                          return;
                        }
                      }}
                      className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition duration-200 outline-none text-base"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div className="space-y-1">
                  <label className="block text-base font-medium text-gray-700">
                    Mobile Number
                    <span className="text-red-500 ml-1">*</span>
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
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      maxLength={10}
                      name="mobileno"
                      value={profile.mobileno}
                      onChange={handleChange}
                      onBlur={(e) => {
                        if (e.target.value !== "" && e.target.value.length !== 10) {
                          alert("Mobile number must be 10 digits");
                          return;
                        }
                      }}
                      className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition duration-200 outline-none text-base"
                      placeholder="10-digit mobile number"
                    />
                  </div>
                </div>
              </div>

              {/* Username */}
              <div className="space-y-1">
                <label className="block text-base font-medium text-gray-700">
                  Username
                  <span className="text-red-500 ml-1">*</span>
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
                    name="username"
                    value={profile.username}
                    onChange={handleChange}
                    onBlur={(e) => {
                      if (e.target.value == "") {
                        alert("Field cannot be empty");
                        return;
                      }
                    }}
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition duration-200 outline-none text-base"
                    placeholder="Choose a username"
                  />
                </div>
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Password */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-base font-medium text-gray-700">
                      Password
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setDisplay(!display)}
                      className="text-xs text-black hover:text-gray-700 font-medium transition duration-200"
                    >
                      {display ? "Hide" : "Show"}
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
                      type={display ? "text" : "password"}
                      name="password"
                      value={profile.password}
                      onChange={handleChange}
                      onBlur={(e) => {
                        const pattern =
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
                        if (e.target.value !== "" && !pattern.test(e.target.value)) {
                          setAlert(true);
                        } else {
                          setAlert(false);
                        }
                      }}
                      className="block w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition duration-200 outline-none text-base"
                      placeholder="Create password"
                    />
                    <button
                      type="button"
                      onClick={() => setDisplay(!display)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <img
                        src={display ? Showpassword : Hidepassword}
                        alt={display ? "Hide password" : "Show password"}
                        className="w-5 h-5 opacity-60 hover:opacity-100 transition duration-200"
                      />
                    </button>
                  </div>
                  {msgalert && (
                    <div className="mt-1 p-2 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-xs text-red-600 leading-tight">
                        Password must have: Upper & lowercase, number, special char, 8+ chars.
                      </p>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-base font-medium text-gray-700">
                      Confirm Password
                      <span className="text-red-500 ml-1">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowing(!showing)}
                      className="text-xs text-black hover:text-gray-700 font-medium transition duration-200"
                    >
                      {showing ? "Hide" : "Show"}
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
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <input
                      type={showing ? "text" : "password"}
                      name="confirmpassword"
                      value={profile.confirmpassword}
                      onChange={handleChange}
                      onBlur={(e) => {
                        if (e.target.value !== "" && profile.password !== e.target.value) {
                          alert("Password does not match");
                        }
                      }}
                      className="block w-full pl-9 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-black transition duration-200 outline-none text-base"
                      placeholder="Confirm password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowing(!showing)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      <img
                        src={showing ? Showpassword : Hidepassword}
                        alt={showing ? "Hide password" : "Show password"}
                        className="w-5 h-5 opacity-60 hover:opacity-100 transition duration-200"
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 text-center">
                <button
                  type="submit"
                  className="w-1/2 bg-green-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 transition duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg text-base"
                >
                  Create Account
                </button>
              </div>
            </form>

            {/* Footer Note */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setIsloggedin(false)}
                  className="text-blue-600 ms-6 text-[20px] hover:text-red-900 font-bold transition duration-200"
                >
                  Sign in here
                </button>
              </p>
              <p className="text-center text-xs text-gray-500 mt-2">
                By creating an account, you agree to our Terms of Service and
                Privacy Policy
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements - Grayscale or Black/White
        {/* <div className="mt-6 text-center">
          <div className="flex items-center justify-center space-x-2 text-gray-500">
            <div className="w-2 h-2 bg-green-700 rounded-full"></div>
            <div className="w-2 h-2 bg-green-700 rounded-full"></div>
            <div className="w-2 h-2 bg-green-700 rounded-full"></div>
            <div className="w-2 h-2 bg-green-700 rounded-full"></div>
          </div> 
        </div> */}
    </div>
    
    </div>
  );
}

export default Signuppage;
