import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { FiArrowLeft, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const { role, token } = res.data;

      // Store role and token in localStorage
      localStorage.setItem("role", role);
      localStorage.setItem("token", token);

      // Navigate based on role
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "team-admin") navigate("/team/dashboard");
      else navigate("/user/DashboardTab");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-200 via-sky-200 to-purple-200 animate-gradient-x">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-white/30 backdrop-blur-sm"
      >
        <div
          className="flex items-center mb-6 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FiArrowLeft className="text-purple-600 mr-2" />
          <span className="text-purple-600 font-medium">Back to Home</span>
        </div>

        <h2 className="text-3xl font-bold text-center text-[#5b21b6] mb-8">
          Welcome Back to <span className="text-lime-600">EarthCycle</span>
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email Input */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <div className="relative z-10">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                <FiMail className="w-5 h-5" />
              </div>
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-3 py-3 rounded-lg border-2 border-gray-200 
                  focus:border-lime-500 focus:ring-2 focus:ring-lime-200 
                  outline-none transition-all bg-white/90 shadow-sm
                  placeholder-transparent peer"
                placeholder="Email"
              />
              <label
                className="absolute left-10 -top-2.5 px-1 bg-white text-sm 
                  text-gray-500 transition-all duration-300
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                  peer-placeholder-shown:top-3 peer-focus:-top-2.5 
                  peer-focus:text-sm peer-focus:text-lime-600"
              >
                Email
              </label>

            </div>
            <div
              className="absolute inset-0 bg-lime-50 rounded-lg scale-95 
                group-hover:scale-100 group-focus-within:scale-100 
                transition-transform duration-300 -z-10"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="relative group"
          >
            <div className="relative z-10">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600">
                <FiLock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-10 py-3 rounded-lg border-2 border-gray-200 
                  focus:border-lime-500 focus:ring-2 focus:ring-lime-200 
                  outline-none transition-all bg-white/90 shadow-sm
                  placeholder-transparent peer"
                placeholder="Password"
              />
              <label
                className="absolute left-10 -top-2.5 px-1 bg-white text-sm 
                  text-gray-500 transition-all duration-300
                  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                  peer-placeholder-shown:top-3 peer-focus:-top-2.5 
                  peer-focus:text-sm peer-focus:text-lime-600"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                  hover:text-lime-600 transition-colors"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
            <div
              className="absolute inset-0 bg-lime-50 rounded-lg scale-95 
                group-hover:scale-100 group-focus-within:scale-100 
                transition-transform duration-300 -z-10"
            />
          </motion.div>

          {/* Error message */}
          {error && (
            <p className="text-red-600 text-center font-semibold">{error}</p>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-lime-600 hover:bg-[#e4a400] text-white py-3 rounded-lg font-semibold
              flex items-center justify-center gap-2 transition-all"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-purple-600 font-semibold cursor-pointer hover:underline"
          >
            Register
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
