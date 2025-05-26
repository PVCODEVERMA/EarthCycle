"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const WasteServices = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [activePlan, setActivePlan] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const containerRef = useRef(null);
  const planRefs = useRef([]);

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
    <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Smart Waste Management Solutions
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose Your Plan & Save up to 40%!
              <br />
              Get started with 10kg of free waste disposal on all plans!
            </p>
          </motion.div>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
            <motion.div whileHover={{ scale: 1.05 }}>
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-full w-full sm:w-auto transition-all ${
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
                className={`px-6 py-2 rounded-full w-full sm:w-auto transition-all ${
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
            className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 pt-10"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                ref={(el) => (planRefs.current[index] = el)}
                className="flex-shrink-0 w-[85vw] snap-center px-2"
                initial={{ scale: 0.9 }}
                animate={{ scale: activePlan === index ? 1 : 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`bg-white rounded-2xl p-6 shadow-xl relative ${
                    activePlan === index
                      ? "ring-2 ring-green-500"
                      : "ring-1 ring-gray-200"
                  }`}
                  onClick={() => handlePlanClick(index)}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2 text-center">
                    {plan.title}
                  </h3>
                  <div className="text-center mb-4">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹
                      {billingCycle === "yearly"
                        ? plan.price.yearly.toLocaleString()
                        : plan.price.monthly.toLocaleString()}
                    </span>
                    <span className="text-gray-500 ml-2">
                      /{billingCycle === "yearly" ? "year" : "mo"}
                    </span>
                    {billingCycle === "yearly" && plan.yearlySave && (
                      <div className="text-sm text-green-600 mt-1">
                        Save ₹{plan.yearlySave.toLocaleString()}
                      </div>
                    )}
                  </div>

                  <Link
                    to="/payment"
                    className={`w-full py-3 rounded-[1.75rem] text-center font-medium transition-all block ${
                      plan.color === "green"
                        ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        : plan.color === "yellow"
                        ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
                        : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <div className="mt-6 space-y-3">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <svg
                          className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span
                          className={`${
                            feature.startsWith("Everything")
                              ? "font-semibold text-gray-900"
                              : "text-gray-600"
                          }`}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-4">
            <button
              onClick={handlePrev}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <div className="flex items-center gap-2">
              {plans.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handlePlanClick(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    activePlan === index ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="p-2 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-xl p-8 relative ${
                plan.popular
                  ? "ring-2 ring-green-500 transform scale-[1.02]"
                  : ""
              } hover:shadow-2xl transition-shadow duration-300`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1 rounded-bl-xl text-sm font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {plan.title}
                </h3>
                <p className="text-gray-600 text-sm">{plan.description}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹
                    {billingCycle === "yearly"
                      ? plan.price.yearly.toLocaleString()
                      : plan.price.monthly.toLocaleString()}
                  </span>
                  <span className="text-gray-500">
                    /{billingCycle === "yearly" ? "year" : "mo"}
                  </span>
                </div>
                {billingCycle === "yearly" && plan.yearlySave && (
                  <div className="text-sm text-green-600">
                    Save ₹{plan.yearlySave.toLocaleString()}
                  </div>
                )}

               <motion.div whileHover={{ scale: 1.02 }}>
                <Link
                  to="/payment"
                  className={`w-full py-3 rounded-[1.75rem] font-medium transition-all block text-center ${
                    plan.color === "green"
                      ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      : plan.color === "yellow"
                      ? "bg-gradient-to-r from-amber-400 to-orange-400 text-white"
                      : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
                  }`}
                >
                  {plan.cta}
                </Link>
              </motion.div>
              </div>

              <div className="space-y-3">
                {plan.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 text-gray-600"
                  >
                    <svg
                      className="w-5 h-5 text-green-500 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span
                      className={`${
                        feature.startsWith("Everything")
                          ? "font-semibold text-gray-900"
                          : ""
                      }`}
                    >
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
  );
};

export default WasteServices;
