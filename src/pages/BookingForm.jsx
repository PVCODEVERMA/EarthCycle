import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";

export default function BookingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [address, setAddress] = useState("");

  const services = [
    { name: "Residential Waste", icon: "🏡" },
    { name: "Commercial Waste", icon: "🏢" },
    { name: "Industrial Waste", icon: "🏭" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address.trim()) {
      toast.error("Please enter a valid address");
      return;
    }

    setIsSubmitted(true);
    toast.success("Appointment Scheduled Successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 relative overflow-hidden">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white/80 backdrop-blur-sm shadow-sm z-10 relative"
      >
        <div className="container mx-auto px-4 py-3">
          <p className="text-sm text-gray-600">
            Home &gt; <span className="font-semibold">Booking</span>
          </p>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative text-white py-16 overflow-hidden rounded-lg"
      >
        <div className="absolute inset-0 z-0">
          <img
            src="https://www.shutterstock.com/image-vector/street-cleaners-service-workers-team-260nw-1990268573.jpg"
            alt="Waste management background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-emerald-900/80 backdrop-blur-sm" />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl font-bold mb-4 drop-shadow-lg"
          >
            Book a Pickup
          </motion.h1>
          <motion.p
            className="text-gray-200 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Schedule your waste pickup and help keep your community clean.
          </motion.p>
        </div>
      </motion.div>

      {/* Floating Circles Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-green-200 rounded-full opacity-10"
            style={{
              width: Math.random() * 50 + 20,
              height: Math.random() * 50 + 20,
              top: Math.random() * 100 + "%",
              left: Math.random() * 100 + "%",
            }}
            animate={{
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-3xl mx-auto bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl p-8 relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Get An Appointment{" "}
                  <span className="ml-2 animate-bounce">📅</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Selection */}
                  <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">
                      Select Service
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {services.map((service) => (
                        <motion.button
                          key={service.name}
                          type="button"
                          onClick={() => setSelectedService(service.name)}
                          className={`p-4 border-2 rounded-xl flex flex-col items-center transition-all ${
                            selectedService === service.name
                              ? "border-yellow-400 bg-green-50 scale-105 shadow-md"
                              : "border-gray-200 hover:border-green-300"
                          }`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <span className="text-2xl mb-2">{service.icon}</span>
                          <span className="text-sm font-medium">
                            {service.name}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Basic Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium">
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium">
                        Time
                      </label>
                      <input
                        type="time"
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Name"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                    <input
                      type="text"
                      placeholder="House Number"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Address Input */}
                  <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">
                      Full Address
                    </label>
                    <textarea
                      placeholder="Enter your complete address..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent min-h-[100px]"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>

                  {/* Payment Mode */}
                  <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">
                      Payment Method
                    </label>
                    <select
                      name="payment"
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option value="">Select Payment Mode</option>
                      <option value="Online">Online</option>
                      <option value="COD">Cash on Delivery</option>
                    </select>
                  </div>

                  {/* Submit Button */}
                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-4 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    Schedule Appointment
                    <motion.svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 1,
                        ease: "easeInOut",
                      }}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </motion.svg>
                  </motion.button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="text-green-500 text-6xl mb-4">✓</div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Booking Confirmed!
                </h2>
                <p className="text-gray-600 mb-6">
                  Thank you for scheduling with us. We'll send a confirmation to
                  your email shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  Book Another Service
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
