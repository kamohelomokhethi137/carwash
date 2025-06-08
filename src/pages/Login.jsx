import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaFacebook, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import {Link} from "react-router-dom";
import loginSvg from "../assets/login.svg"; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans text-black px-4">
      {/* Container: not full screen on laptops, centered, with shadow */}
      <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full md:flex md:h-[600px] overflow-hidden">
        
        {/* Image Side: hidden on small devices */}
        <div 
          className="hidden md:block md:w-1/2 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${loginSvg})` }}
        >
          {/* Divider with shadow between SVG and form */}
          <div className="absolute right-0 top-0 h-full w-1 bg-gray-300 shadow-lg"></div>
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <FaLock className="text-blue-500 text-2xl" />
              </div>
              <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
              {/* <p className="text-gray-700">Simplify your workflow and boost productivity.</p> */}
            </div>

            <form className="space-y-4">
              {/* Email Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-500" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent text-black"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-transparent text-black"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <motion.div whileTap={{ scale: 0.95 }} className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={toggleRememberMe}
                    className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-300"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm">
                    Remember me
                  </label>
                </motion.div>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot password?
                </a>
              </div>

              {/* Login Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
              >
                Login
              </motion.button>

              {/* Divider */}
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* Social Login */}
              <div className="flex justify-center space-x-4">
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <FaGoogle className="text-red-500 text-xl" />
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-all"
                >
                  <FaFacebook className="text-blue-600 text-xl" />
                </motion.button>
              </div>

              {/* Register Link */}
              <div className="text-center text-sm text-gray-700 mt-6">
                Don’t have an account?{" "}
                <Link to="/signup" className="text-blue-500 hover:underline font-medium">
                  Register here
                </Link>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Login;
