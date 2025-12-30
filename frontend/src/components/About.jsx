import { useNavigate } from "react-router-dom";
import Firstpageimage from "../assets/family-creating-digital-content.jpg";
import { useOutletContext } from "react-router-dom";


function About() {
  const navigate = useNavigate();
  const {getstarted,setIsloggedin}=useOutletContext()
  
  //signup button handle to move to signup 
  const handlesignup = () => {
    setIsloggedin(true);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left Side - Image */}
        <div className="relative h-[600px] lg:h-screen overflow-hidden order-2 lg:order-1">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 z-10"></div>
          <img
            src={Firstpageimage}
            alt="landingpageimage"
            className="w-full h-full object-cover object-center transform scale-105 hover:scale-100 transition-transform duration-700"
          />
          {/* Overlay Text */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8 z-20">
            <h3 className="text-white text-2xl font-bold mb-2">
              Join Our Community
            </h3>
            <p className="text-blue-100">Connect, share, and grow together</p>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex flex-col order-1 lg:order-2">
          {/* Navigation */}
          <div className="flex justify-end p-6 lg:p-8">
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2.5 border-2 border-green-800 text-black font-medium rounded-full hover:bg-blue-50 hover:border-blue-600 transition-all duration-300 hover:scale-105 active:scale-95">
                About Us
              </button>
              <button className="px-5 py-2.5 border-2 border-green-800 text-black font-medium rounded-full hover:bg-emerald-50 hover:border-emerald-600 transition-all duration-300 hover:scale-105 active:scale-95">
                Learn More
              </button>
              <button
                onClick={() =>{ navigate("/login"),setIsloggedin(false)}}
                className="px-5 py-2.5 bg-gradient-to-r from-gray-500 to-gray-800 text-white font-medium rounded-full transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Login
              </button>
              <button
                onClick={() => handlesignup()}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-medium rounded-full hover:from-emerald-600 hover:to-green-700 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Sign Up
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col justify-center items-center px-6 lg:px-12 py-8 lg:py-0">
            {/* Decorative Elements */}
            <div className="flex space-x-2 mb-8">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse delay-150"></div>
            </div>

            {/* Main Heading */}
            <div className="text-center mb-10">
              <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-800  to-emerald-600 bg-clip-text text-transparent mb-6 animate-fade-in">
                Welcome to Ayudar
              </h1>
              <p className="text-gray-600 text-lg lg:text-xl max-w-2xl mb-8">
                Happy Family! Happy life !<br />
                Join with us & Keep everything for your family in one place
              </p>
            </div>

            {/* Features Grid
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-4xl">
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">Connect</h3>
                                <p className="text-gray-600 text-sm">Join a community of like-minded individuals</p>
                            </div>
                            
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">Share</h3>
                                <p className="text-gray-600 text-sm">Exchange ideas and resources effortlessly</p>
                            </div>
                            
                            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="font-bold text-gray-800 mb-2">Grow</h3>
                                <p className="text-gray-600 text-sm">Achieve your goals with community support</p>
                            </div>
                        </div> */}

            {/*get started button to move to login page */}
            <div className="text-center">
              <button
                onClick={() => {
                  (getstarted ? navigate("/home") : navigate("/login"),
                    setIsloggedin(false));
                }}
                className="group relative px-12 py-4 bg-gradient-to-r from-gray-500 to-gray-700 text-white font-bold text-xl rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-2xl hover:shadow-3xl overflow-hidden"
              >
                <span className="relative z-10">Get Started</span>
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-800 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-300"></div>
              </button>
              <p className="text-gray-500 mt-4 text-sm">
                Join thousands of happy members today
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 py-4 px-6 text-center">
        <p className="text-gray-600 text-sm">
          © 2024 Ayudar. All rights reserved. |
          <a href="#" className="text-blue-600 hover:text-blue-800 ml-2">
            Privacy Policy
          </a>{" "}
          |
          <a href="#" className="text-blue-600 hover:text-blue-800 ml-2">
            Terms of Service
          </a>
        </p>
      </div>
    </div>
  );
}

export default About;
