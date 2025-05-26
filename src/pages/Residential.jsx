"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaRecycle,
  FaTrashAlt,
  FaCalendarCheck,
  FaTruck,
  FaCheck,
} from "react-icons/fa";
import  track_img from '../assets/baground_img/track_img.avif';

const Residential = () => {
  // Pricing Plans State
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [activePlan, setActivePlan] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const containerRef = useRef(null);
  const planRefs = useRef([]);

  // Pricing Plans Data
  const plans = [
    {
      title: " Fast Free Plan",
      price: { monthly: 0, yearly: 0 },
      features: [
        "2 bin pickups/week",
        "Basic waste segregation", 
        "Monthly analytics report",
        "Email support",
        "Free waste disposal up to 120kg/year",
      ],
      cta: "Get Started",
      description: "Ideal for light, personal use",
      color: "green",
    },
    {
      title: " Professional Plan",
      price: { monthly: 8499, yearly: 4999 },
      features: [
        "Everything in Free Plan, plus:",
        "Daily waste collection",
        "Advanced recycling options",
        "Commercial usage support",
        "Priority phone support",
        "Free waste disposal up to 120kg/year",
      ],
      cta: "Subscribe Now",
      popular: true,
      description: "Best for small businesses & commercial users",
      color: "yellow",
      yearlySave: 989,
    },
    {
      title: " Business Plan",
      price: { monthly: 12999, yearly: 12999 },
      features: [
        "Everything in Professional Plan, plus:",
        "Unlimited waste tracking",
        "Team management tools",
        "Reseller license",
        "24/7 dedicated support",
        "Free waste disposal up to 120kg/year",
      ],
      cta: "Contact Sales",
      description: "For enterprises & bulk waste management",
      color: "blue",
      yearlySave: 2589,
    },
  ];

  // Features Data
  const features = [
    {
      icon: <FaCalendarCheck className="w-8 h-8" />,
      title: "Flexible Scheduling",
      desc: "Choose daily/weekly pickups as per your convenience",
    },
    {
      icon: <FaRecycle className="w-8 h-8" />,
      title: "Smart Recycling",
      desc: "Automated waste segregation and recycling processing",
    },
    {
      icon: <FaTrashAlt className="w-8 h-8" />,
      title: "Eco Disposal",
      desc: "Environment-friendly disposal methods for all waste types",
    },
    {
      icon: <FaTruck className="w-8 h-8" />,
      title: "Instant Service",
      desc: "Same-day emergency pickup available",
    },
  ];

  // Auto-scroll logic for mobile
  useEffect(() => {
    let interval;
    const isMobile = window.innerWidth < 768;
    if (isMobile && autoScroll) {
      interval = setInterval(() => {
        setActivePlan((prev) => (prev + 1) % plans.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [autoScroll, plans.length]);

  // Scroll handler
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      planRefs.current[activePlan]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [activePlan]);

  const handlePlanClick = (index) => {
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setAutoScroll(false);
      setActivePlan(index);
      setTimeout(() => setAutoScroll(true), 10000);
    }
  };

  const handlePrev = () => {
    const newIndex = activePlan === 0 ? plans.length - 1 : activePlan - 1;
    handlePlanClick(newIndex);
  };

  const handleNext = () => {
    const newIndex = (activePlan + 1) % plans.length;
    handlePlanClick(newIndex);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={track_img}
            className="w-full h-full object-cover object-bottom"
            alt="Waste Management Services"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-emerald-900/80" />
        </div>

        <div className="container mx-auto px-4 py-24 text-center relative z-10">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-6 drop-shadow-lg"
          >
            Comprehensive Waste Management Solutions
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Professional waste management services for both residential and
            commercial needs
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
              <div className="text-green-600 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Pricing Plans Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Affordable Pricing Plans
            </h2>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
              <motion.div whileHover={{ scale: 1.05 }}>
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-2 rounded-full transition-all ${
                    billingCycle === "monthly"
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Monthly Billing
                </button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }}>
                <button
                  onClick={() => setBillingCycle("yearly")}
                  className={`px-6 py-2 rounded-full transition-all ${
                    billingCycle === "yearly"
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  Annual Billing <span className="ml-2 text-sm">(Save 20%)</span>
                </button>
              </motion.div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="md:hidden relative">
            <div
              ref={containerRef}
              className="flex overflow-x-auto snap-x snap-mandatory pb-4 pt-10"
            >
              {plans.map((plan, index) => (
                <motion.div
                  key={index}
                  ref={(el) => (planRefs.current[index] = el)}
                  className="flex-shrink-0 w-[85vw] snap-center px-2"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: activePlan === index ? 1 : 0.9 }}
                >
                  <div className={`bg-white rounded-2xl p-6 shadow-xl relative ${
                    activePlan === index ? "ring-2 ring-green-500" : "ring-1 ring-gray-200"
                  }`}>
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-xs font-medium">
                        Most Popular
                      </div>
                    )}
                    <h3 className="text-xl font-bold mb-2 text-center">{plan.title}</h3>
                    <div className="text-center mb-4">
                      <span className="text-4xl font-bold text-gray-900">
                        ₹{plan.price[billingCycle].toLocaleString()}
                      </span>
                      <span className="text-gray-500 ml-2">/{billingCycle === "yearly" ? "year" : "mo"}</span>
                      {billingCycle === "yearly" && plan.yearlySave && (
                        <div className="text-sm text-green-600 mt-1">
                          Save ₹{plan.yearlySave.toLocaleString()}
                        </div>
                      )}
                    </div>
                    <Link
                      to="/payment"
                      className={`w-full py-3 rounded-[1.75rem] font-medium block text-center ${
                        plan.color === "green" ? "bg-gray-100 text-gray-900 hover:bg-gray-200" :
                        plan.color === "yellow" ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white" :
                        "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                      }`}
                    >
                      {plan.cta}
                    </Link>
                    <div className="mt-6 space-y-3">
                      {plan.features.map((feature, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <FaCheck className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className={`${feature.startsWith("Everything") ? "font-semibold" : ""}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Desktop View */}
          <div className="hidden md:grid grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-white rounded-2xl p-8 shadow-xl relative ${
                  plan.popular ? "ring-2 ring-green-500 scale-[1.02]" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1 rounded-bl-xl text-sm">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ₹{plan.price[billingCycle].toLocaleString()}
                  </span>
                  <span className="text-gray-500 ml-2">/{billingCycle === "yearly" ? "year" : "mo"}</span>
                  {billingCycle === "yearly" && plan.yearlySave && (
                    <div className="text-sm text-green-600 mt-2">
                      Save ₹{plan.yearlySave.toLocaleString()}
                    </div>
                  )}
                </div>
                <Link
                  to="/payment"
                  className={`w-full py-3 rounded-[1.75rem] font-medium text-center block ${
                    plan.color === "green" ? "bg-gray-100 text-gray-900 hover:bg-gray-200" :
                    plan.color === "yellow" ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white" :
                    "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
                <div className="mt-8 space-y-4">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <FaCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className={`${feature.startsWith("Everything") ? "font-semibold" : ""}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="flex justify-center mx-auto mt-16 mb-24 max-w-3xl bg-[#042b1f] py-8 px-6 text-center rounded-lg">
        <p className="text-white text-lg font-medium">
          Our experts can help you estimate your service cost based on your needs{" "}
          <span className="whitespace-nowrap">
            and provide large dumpster rental.
          </span>
          <a
            href="/requestQuote"
            className="text-[#e4a400] font-semibold underline-offset-4 hover:underline inline-flex items-center ml-2 group"
          >
            Request A Quote
            <span className="ml-1 transition-transform duration-300 group-hover:rotate-45">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </span>
          </a>
        </p>
      </section>
    </div>
  );
};

export default Residential;