// src/pages/Industrial.jsx

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaIndustry,
  FaRadiation,
  FaHardHat,
  FaShieldAlt,
  FaBolt,
  FaCheck,
  FaCheckCircle,
  FaTimes,
} from "react-icons/fa";
import { toast } from "react-toastify";

const handleClick = () => {
  toast.success("Request Received! Our team will contact you within 24 hours");
};

export default function Industrial() {
  const [showAlert, setShowAlert] = useState(false);

  const features = [
    {
      icon: <FaHardHat className="w-8 h-8" />,
      title: "Hazardous Waste",
      desc: "Safe handling and disposal of toxic materials",
    },
    {
      icon: <FaShieldAlt className="w-8 h-8" />,
      title: "Safety Compliance",
      desc: "Full OSHA and regulatory compliance",
    },
    {
      icon: <FaBolt className="w-8 h-8" />,
      title: "Waste-to-Energy",
      desc: "Advanced energy recovery solutions",
    },
    {
      icon: <FaRadiation className="w-8 h-8" />,
      title: "Specialized Processing",
      desc: "Industrial-scale recycling facilities",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        {/* Hero Section */}
        <div className="relative text-white overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="https://media.gettyimages.com/id/1200963979/vector/vector-illustration-of-recycling-concept-flat-modern-design-for-web-page-banner-presentation.jpg?s=612x612&w=0&k=20&c=9X3N35JAOIJf3KgY9-rJHVYAMQLdBOLX0_ZSl5tnAI0="
              className="w-full h-full object-cover object-center"
              alt="Industrial Waste Management"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#e4a400] to-red-900/80" />
          </div>

          <div className="container mx-auto px-4 py-24 text-center relative z-10">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-5xl font-bold mb-6 drop-shadow-lg"
            >
              Heavy Industry Waste Solutions
            </motion.h1>
            <motion.p
              className="text-xl max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Advanced waste management for manufacturing and industrial sectors
            </motion.p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-16">
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
            }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { y: 30, opacity: 0 },
                  visible: { y: 0, opacity: 1 },
                }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="text-orange-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Industrial Process */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.div
                className="grid md:grid-cols-2 gap-12 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.3 } },
                }}
              >
                <motion.img
                  src="https://images.unsplash.com/photo-1582721478779-0ae163c05a60"
                  alt="Industrial Process"
                  className="rounded-xl shadow-2xl"
                  variants={{ hidden: { x: -50 }, visible: { x: 0 } }}
                />

                <motion.div
                  className="space-y-6"
                  variants={{ hidden: { x: 50 }, visible: { x: 0 } }}
                >
                  <h2 className="text-3xl font-bold text-gray-900">
                    Industrial Waste Cycle
                  </h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <FaIndustry className="text-orange-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Waste Generation</h4>
                        <p className="text-gray-600">
                          Material analysis and classification
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <FaShieldAlt className="text-[#e4a400]" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Safety Handling</h4>
                        <p className="text-gray-600">
                          Containment and transportation
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <FaBolt className="text-[#e4a400]" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Processing</h4>
                        <p className="text-gray-600">
                          Specialized treatment and recovery
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="bg-orange-100 p-3 rounded-lg">
                        <FaCheck className="text-[#e4a400]" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Certification</h4>
                        <p className="text-gray-600">
                          Compliance documentation
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        <div
          className="relative bg-cover bg-center bg-no-repeat py-16"
          style={{
            backgroundImage:
              "url('https://img.freepik.com/premium-photo/woman-hand-picking-up-garbage-plastic-cleaning-park_34152-1176.jpg')",
          }}
        >
          {/* Overlay to make text readable */}
          <div className="absolute inset-0  bg-opacity-60 z-0" />

          {/* Content Layer */}
          <div className="relative z-10 container mx-auto px-4">
            <motion.div
              className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden"
              initial={{ scale: 0.95 }}
              whileInView={{ scale: 1 }}
            >
              <div className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  Industrial Solutions
                </h3>
                <div className="text-4xl font-bold text-orange-600 mb-6">
                  Custom Plans
                </div>
                <ul className="space-y-3 mb-8">
                  {[
                    "Hazardous Waste",
                    "Bulk Processing",
                    "24/7 Monitoring",
                    "EPA Compliance",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-center justify-center space-x-2"
                    >
                      <FaCheck className="text-orange-500" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
                <motion.button
                  onClick={handleClick}
                  className="bg-green-500 text-white px-4 py-4 rounded-lg hover:bg-[#E4A400] transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95 animate-pulse-once focus:ring-4 focus:ring-green-200 focus:ring-opacity-50 relative overflow-hidden hover:after:absolute hover:after:inset-0 hover:after:bg-white hover:after:opacity-10 hover:after:animate-shine"
                >
                  Request Consultation
                </motion.button>
              </div>
            </motion.div>

            {/* Toast-like Alert */}
            <AnimatePresence>
              {showAlert && (
                <motion.div
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
                >
                  <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-xl flex items-center gap-4 shadow-lg">
                    <FaCheckCircle className="text-green-600 text-xl" />
                    <div>
                      <p className="font-semibold">Request Received!</p>
                      <p className="text-sm">
                        Our team will contact you within 24 hours
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAlert(false)}
                      className="text-green-700 hover:text-green-900 ml-4"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
}
