import { motion, AnimatePresence } from "framer-motion";
import {
  FaCreditCard,
  FaUser,
 
  FaCheck,
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function PaymentPage() {
  const [submitted, setSubmitted] = useState(false);
  const floatingShapes = Array(8).fill(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Payment processing...", {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
      onClose: () => setSubmitted(true),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 relative overflow-hidden">
      <ToastContainer />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingShapes.map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-64 h-64 rounded-full blur-2xl opacity-20"
            style={{
              background: `linear-gradient(45deg, ${
                index % 2 === 0 ? "#e4a400" : "#3b82f6"
              }, ${index % 3 === 0 ? "#f59e0b" : "#60a5fa"})`
            }}
            initial={{
              scale: 0,
              x: `${Math.random() * 100 - 50}%`,
              y: `${Math.random() * 100 - 50}%`
            }}
            animate={{
              scale: [0, 1, 0],
              x: [
                `${Math.random() * 100 - 50}%`,
                `${Math.random() * 100 - 50}%`,
                `${Math.random() * 100 - 50}%`
              ],
              y: [
                `${Math.random() * 100 - 50}%`,
                `${Math.random() * 100 - 50}%`,
                `${Math.random() * 100 - 50}%`
              ],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20 + Math.random() * 20,
              repeat: Infinity,
              ease: "anticipate"
            }}
          />
        ))}

        <motion.div
          className="absolute inset-0 bg-grid mask-gradient"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto px-4 relative z-10"
      >
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 backdrop-blur-lg">
                <h2 className="text-3xl font-bold text-[#e4a400] mb-8 text-center">
                  Payment Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Details */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      <FaUser className="inline-block mr-2" />
                      Personal Information
                    </h3>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="block text-gray-600 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-600 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="+91 98765 43210"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-600 mb-2">
                        Address
                      </label>
                      <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        rows="3"
                        placeholder="Enter full address"
                        required
                      />
                    </div>
                  </div>

                  {/* Payment Details */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      <FaCreditCard className="inline-block mr-2" />
                      Card Details
                    </h3>

                    <div>
                      <label className="block text-gray-600 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 border border-gray-300 rounded-lg"
                        placeholder="4242 4242 4242 4242"
                        pattern="[0-9\s]{13,19}"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-600 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="MM/YY"
                          pattern="(0[1-9]|1[0-2])\/[0-9]{2}"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">CVC</label>
                        <input
                          type="text"
                          className="w-full p-3 border border-gray-300 rounded-lg"
                          placeholder="123"
                          pattern="\d{3}"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium"
                  >
                    Pay ₹9,99 Now
                  </motion.button>

                  <div className="text-center text-gray-600">
                    <Link
                      to="/commercial"
                      className="text-blue-600 hover:underline"
                    >
                      ← Back to Plans
                    </Link>
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div className="relative overflow-hidden rounded-2xl shadow-xl">
              <div className="absolute inset-0 z-0">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/payment-successful-illustration-download-in-svg-png-gif-file-formats--success-money-transfer-business-plan-pack-people-illustrations-4475257.png"
                  alt="Success Background"
                  className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-white/70 backdrop-blur-sm rounded-2xl" />
              </div>

              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 p-8 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  className="inline-block mb-6"
                >
                  <div className="relative w-20 h-20">
                    <motion.div
                      className="absolute inset-0 bg-green-100 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    />
                    <FaCheck className="absolute inset-0 m-auto text-green-600 text-4xl" />
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold text-gray-800 mb-2"
                >
                  Payment Successful!
                </motion.h3>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-600 mb-6"
                >
                  Thank you for your purchase. Your order will be processed
                  shortly.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    to="/"
                    className="inline-block bg-[#e4a400] text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Return to{" "}
                    <span className="font-semibold text-white"> &gt; </span>{" "}
                    Home
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx global>{`
        .bg-grid {
          background-image: linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .mask-gradient {
          mask-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.1) 0%,
            rgba(0, 0, 0, 0) 50%,
            rgba(0, 0, 0, 0.1) 100%
          );
        }
      `}</style>
    </div>
  );
}