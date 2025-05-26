import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../api/axios";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "/auth/login",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      // Store tokens and user data
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Login successful! Redirecting...");

      // Role-based redirect
      const role = data.role;
      setTimeout(() => {
        if (role === "user") {
          navigate("/dashboard");
        } else if (role === "team-admin") {
          navigate("/team-dashboard");
        } else if (role === "super-admin") {
          navigate("/super-admin-dashboard");
        } else {
          navigate("/dashboard"); // fallback
        }
      }, 1500);
    } catch (error) {
      if (error.response) {
        // API returned an error with JSON response
        const errorMessage = error.response.data?.error || "Login failed";
        console.error("API error:", error.response.data);
        toast.error(errorMessage);
      } else if (error.request) {
        // Request was made but no response received
        console.error("No response received:", error.request);
        toast.error("No response from server. Please check your backend.");
      } else {
        // Error setting up request
        console.error("Error:", error.message);
        toast.error("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-blue-100 to-purple-100">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl backdrop-blur-sm border border-white/30"
      >
        <div
          className="flex items-center mb-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FiArrowLeft className="text-green-600 mr-2" />
          <span className="text-green-600 font-medium">Back to Home</span>
        </div>

        <h2 className="text-3xl font-bold text-center text-green-700 mb-8">
          Welcome to <span className="text-blue-600">EarthCycle</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative group">
            <div className="relative z-10">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 
                         focus:border-green-500 focus:ring-2 focus:ring-green-200 
                         outline-none transition-all bg-white/90 shadow-sm
                         placeholder-transparent peer"
                placeholder="Email"
              />
              <label
                className="absolute left-10 -top-2.5 px-1 bg-white text-sm 
                              text-gray-500 transition-all duration-300
                              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                              peer-placeholder-shown:top-3 peer-focus:-top-2.5 
                              peer-focus:text-sm peer-focus:text-green-600"
              >
                Email Address
              </label>
            </div>
            <div
              className="absolute inset-0 bg-green-50 rounded-lg scale-95 
                          group-hover:scale-100 transition-transform -z-10"
            />
          </motion.div>

          {/* Password Input */}
          <motion.div whileHover={{ scale: 1.02 }} className="relative group">
            <div className="relative z-10">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 
                         focus:border-green-500 focus:ring-2 focus:ring-green-200 
                         outline-none transition-all bg-white/90 shadow-sm
                         placeholder-transparent peer"
                placeholder="Password"
              />
              <label
                className="absolute left-10 -top-2.5 px-1 bg-white text-sm 
                              text-gray-500 transition-all duration-300
                              peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                              peer-placeholder-shown:top-3 peer-focus:-top-2.5 
                              peer-focus:text-sm peer-focus:text-green-600"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                         hover:text-green-600 transition-colors"
              >
                {showPassword ? (
                  <FiEyeOff className="w-5 h-5" />
                ) : (
                  <FiEye className="w-5 h-5" />
                )}
              </button>
            </div>
            <div
              className="absolute inset-0 bg-green-50 rounded-lg scale-95 
                          group-hover:scale-100 transition-transform -z-10"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold
                    flex items-center justify-center gap-2 transition-transform
                    hover:bg-green-700 disabled:opacity-70"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Logging in...
              </>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="flex justify-between mt-6 text-sm text-gray-600"
        >
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-green-600 font-medium hover:underline"
          >
            Forgot Password?
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-blue-600 font-medium hover:underline"
          >
            Create New Account
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
