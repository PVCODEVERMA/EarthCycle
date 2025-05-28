import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiUser,
  FiShield,
  FiArrowLeft,
  FiMail,
  FiLock,
  FiSmartphone,
  FiEye,
  FiEyeOff
} from "react-icons/fi";
import { toast } from "react-toastify";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
  });
  console.log("formData:",formData);
  const [isSubmitting, setIsSubmitting] = useState(false);


  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);

  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }

    toast.success("Registration successful!");
    navigate("/login"); // Redirect to login after success
  } catch (error) {
    console.error("Registration error:", error);
    toast.error(error.message || "Something went wrong, please try again.");
  } finally {
    setIsSubmitting(false);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-200 via-blue-200 to-indigo-200 animate-gradient-x">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/30"
      >
        <div
          className="flex items-center mb-8 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <FiArrowLeft className="text-purple-600 mr-2" />
          <Link to='/' className="text-purple-600 font-medium">Back to Home</Link>
        </div>

        <h2 className="text-3xl font-bold text-center text-[#e4a400] mb-8">
          Join <span className="text-lime-600">EarthCycle</span>
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-4 justify-center mb-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`flex-1 p-2 rounded-lg cursor-pointer transition-colors
                ${
                  formData.role === "user"
                    ? "bg-lime-500 text-white"
                    : "bg-gray-100"
                }`}
              onClick={() => setFormData((prev) => ({ ...prev, role: "user" }))}
            >
              <FiUser className="mx-auto mb-2" />
              <span className="text-center block">User</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`flex-1 p-2 rounded-lg cursor-pointer transition-colors
                ${
                  formData.role === "team-admin"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-100"
                }`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: "team-admin" }))
              }
            >
              <FiShield className="mx-auto mb-2" />
              <span className="text-center block">Admin</span>
            </motion.div>
          </div>

          {["name", "email", "password", "phone"].map((field) => (
            <motion.div
              key={field}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="relative group"
            >
              <div className="relative z-10">
                {/* Input Icon */}
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-lime-600">
                  {field === "name" && <FiUser className="w-5 h-5" />}
                  {field === "email" && <FiMail className="w-5 h-5" />}
                  {field === "password" && <FiLock className="w-5 h-5" />}
                  {field === "phone" && <FiSmartphone className="w-5 h-5" />}
                </div>

                {/* Input Field */}
                <input
                  type={
                    field === "password"
                      ? showPassword
                        ? "text"
                        : "password"
                      : field === "email"
                      ? "email"
                      : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 
                 focus:border-lime-500 focus:ring-2 focus:ring-lime-200 
                 outline-none transition-all bg-white/90 shadow-sm
                 placeholder-transparent peer"
                  placeholder={field}
                />

                {/* Floating Label */}
                <label
                  className="absolute left-10 -top-2.5 px-1 bg-white text-sm 
                        text-gray-500 transition-all duration-300
                        peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
                        peer-placeholder-shown:top-3 peer-focus:-top-2.5 
                        peer-focus:text-sm peer-focus:text-lime-600"
                >
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                  {field === "phone" && " (with country code)"}
                </label>

                {/* Password Toggle */}
                {field === "password" && (
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                   hover:text-lime-600 transition-colors"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                )}

                {/* Phone Country Code */}
                {field === "phone" && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    +1
                  </span>
                )}
              </div>

              {/* Animated Background */}
              <div
                className="absolute inset-0 bg-lime-50 rounded-lg scale-95 
                  group-hover:scale-100 group-focus-within:scale-100 
                  transition-transform duration-300 -z-10"
              />
            </motion.div>
          ))}

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-lime-600 text-white py-3 rounded-lg font-semibold
              flex items-center justify-center gap-2 transition-transform"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Registering...
              </>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </form>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-center mt-6 text-gray-600"
        >
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-600 font-semibold cursor-pointer hover:underline"
          >
            Sign In
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;
