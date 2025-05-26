import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';


export default function BookingPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const services = [
    { name: 'Residential Waste', icon: '🏡' },
    { name: 'Commercial Waste', icon: '🏢' },
    { name: 'Industrial Waste', icon: '🏭' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast.success('Appointment Scheduled Successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50 relative overflow-hidden">

      {/* Animated Floating Circles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-green-200 rounded-full opacity-10"
            style={{
              width: Math.random() * 50 + 20,
              height: Math.random() * 50 + 20,
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100, 0],
              scale: [1, 1.5, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

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

      {/* Hero Section with Background Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative text-white py-16 overflow-hidden"
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
            Turning Waste Into New Possibilities
          </motion.h1>
          <motion.p
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-xl mb-8 font-light"
          >
            Smart Disposal For Cleaner World
          </motion.p>
          <motion.p
            className="text-gray-200 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Delivering smart waste solutions for homes, businesses & industries to keep 
            communities clean and protecting the environment every day.
          </motion.p>
        </div>
      </motion.div>

      {/* Form Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-3xl mx-auto bg-white/90 backdrop-blur-lg rounded-xl shadow-2xl p-8 relative overflow-hidden"
        >
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-green-100 rounded-full opacity-20" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-blue-100 rounded-full opacity-20" />

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Get An Appointment <span className="ml-2 animate-bounce">📅</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Tired of waste piling up? Let's make cleanup easy! Schedule your waste service today.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-gray-700 font-medium">Select Service</label>
                      <div className="grid grid-cols-3 gap-3">
                        {services.map((service) => (
                          <motion.button
                            key={service.name}
                            type="button"
                            onClick={() => setSelectedService(service.name)}
                            className={`p-4 border-2 rounded-xl flex flex-col items-center transition-all ${
                              selectedService === service.name
                                ? 'border-[#e4a400] bg-green-50 scale-105'
                                : 'border-gray-200 hover:border-green-300'
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            <span className="text-2xl mb-2">{service.icon}</span>
                            <span className="text-sm">{service.name}</span>
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Select Date</label>
                        <motion.input
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e4a400]"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">Select Time</label>
                        <motion.input
                          type="time"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e4a400]"
                          whileFocus={{ scale: 1.02 }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {['Name', 'Email', 'Phone'].map((label) => (
                      <div key={label} className="space-y-2">
                        <label className="block text-gray-700 font-medium">{label}</label>
                        <motion.input
                          type={label === 'Email' ? 'email' : label === 'Phone' ? 'tel' : 'text'}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#e4a400]"
                          whileHover={{ scale: 1.02 }}
                          placeholder={
                            label === 'Name'
                              ? 'Name...'
                              : label === 'Email'
                              ? 'Email@example.com'
                              : '+1 912 978 7343'
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-gray-700 font-medium">Message</label>
                    <motion.textarea
                      rows="4"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                      placeholder="Example: Need urgent pickup for electronic waste items"
                      whileFocus={{ scale: 1.01 }}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="w-full bg-[#e4a400] text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all font-semibold flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Send Appointment
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 animate-bounce"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.button>
                </form>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
