"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaEnvelope, FaTrash, FaWeightHanging } from "react-icons/fa";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import bg_img from "../assets/baground_img/garbage-background.avif";

const RequestQuote = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    serviceType: "general",
    wasteType: "household",
    quantity: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show toast on submit
    toast.success("Your request has been submitted successfully!", {
      position: "top-center",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      serviceType: "general",
      wasteType: "household",
      quantity: "",
      message: "",
    });
  };

  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative bg-cover bg-center"
      style={{ backgroundImage: `url(${bg_img})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-white  hover:text-[#e4a400]">
            Request a Free Quote
          </h2>
          <p className="mt-4 text-lg text-green-200 hover:text-[#e4a400]">
            Get personalized pricing for your waste management needs
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/90 backdrop-blur-sm shadow-2xl rounded-xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-[#e4a400]" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="relative">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-3 text-[#e4a400]" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            {/* Service Type */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Service Type
              </label>
              <div className="relative">
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 appearance-none"
                >
                  <option value="general">General Waste</option>
                  <option value="recycling">Recycling</option>
                  <option value="hazardous">Hazardous Waste</option>
                  <option value="construction">Construction Waste</option>
                </select>
                <FaTrash className="absolute right-3 top-3 text-[#e4a400]" />
              </div>
            </div>

            {/* Waste Type */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Waste Type
              </label>
              <div className="relative">
                <select
                  name="wasteType"
                  value={formData.wasteType}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 appearance-none"
                >
                  <option value="household">Household Waste</option>
                  <option value="commercial">Commercial Waste</option>
                  <option value="industrial">Industrial Waste</option>
                  <option value="medical">Medical Waste</option>
                </select>
                <FaWeightHanging className="absolute right-3 top-3 text-[#e4a400]" />
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Estimated Quantity (kg/month)
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="e.g., 500"
                className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                min="0"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div className="mt-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Additional Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 h-32"
              placeholder="Describe your specific requirements (e.g., special handling, frequency)"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg"
            >
              Request Quote
            </motion.button>
          </div>
        </form>

        {/* Toast Container */}
        <ToastContainer />
      </motion.div>
    </div>
  );
};

export default RequestQuote;
