"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Boxes } from "../components/ui/background-boxes";
import { Link } from "react-router-dom";
import Join from "../assets/baground_img/images_1.jpg";

const ServicesSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className={cn("px-4 py-12 md:px-8 lg:py-20 relative overflow-hidden")}>
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <Boxes />
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-2 sm:p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl lg:max-w-4xl bg-transparent rounded-xl overflow-hidden"
          >
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute top-2 right-2 md:-top-2 md:-right-2 z-50 p-2 md:p-3 text-white hover:text-[#e4a400] transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-8 md:w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/ewQPyQ-HP5A?autoplay=1&mute=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        <section className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              Trusted Local Experts
            </h1>
            <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#e4a400] mb-6">
              Waste & Recycling Solutions
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-base md:text-lg">
              Eco-friendly waste management with 24/7 availability and real-time
              tracking.
            </p>

            <CTAButton onClick={() => setIsVideoOpen(true)}>
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="p-2 bg-green-500 rounded-full backdrop-blur-sm"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
                <span className="text-sm md:text-base">Watch Demo</span>
              </div>
            </CTAButton>
          </motion.div>
        </section>

        {/* Trust Section */}
        <section className="bg-green-50 p-6 md:p-8 rounded-2xl mb-12 md:mb-16">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8">
            98% Customer Satisfaction
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              "Zero Landfill Policy",
              "ISO Certified",
              "Real-Time Tracking",
            ].map((item, index) => (
              <TrustItem key={index} title={item} />
            ))}
          </div>
        </section>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          <ServiceCard
            title="Commercial Waste Management"
            description="Complete waste solutions for businesses with automated scheduling and reporting."
          />
          <ServiceCard
            title="Dumpster Rentals"
            description="Various sizes available with flexible rental periods and instant booking."
          />
        </div>

        {/* CTA Section */}
        <section className="relative overflow-hidden rounded-2xl text-center bg-cover bg-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${Join})` }}
            aria-hidden="true"
          />
          <div className="relative z-20 p-8 md:p-12 bg-black/40">
            <p className="text-white mb-6 md:mb-8 max-w-3xl mx-auto text-base md:text-lg lg:text-xl">
              Join 500+ businesses using our smart waste management solutions.
              Start your eco-journey today!
            </p>
            <CTAButton>Get Started</CTAButton>
          </div>
        </section>
      </div>
    </div>
  );
};

// Components
const TrustItem = ({ title }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    className="bg-white p-4 md:p-6 rounded-xl flex items-center hover:shadow-md transition-shadow"
  >
    <CheckIcon className="w-6 h-6 text-[#e4a400] mr-4" />
    <span className="text-gray-700 text-base md:text-lg">{title}</span>
  </motion.div>
);

const ServiceCard = ({ title, description }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="bg-white p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all"
  >
    <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
      {title}
    </h3>
    <p className="text-gray-600 mb-6 text-base md:text-lg">{description}</p>
    <CTAButton variant="outline">
      <Link to="/learn-more" className="flex items-center">
        Learn More
      </Link>
    </CTAButton>
  </motion.div>
);

const CTAButton = ({ children, variant = "primary", onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`group ${
      variant === "primary"
        ? "bg-[#e4a400] text-white hover:bg-[#cc9200]"
        : "text-[#e4a400] border-2 border-[#e4a400] hover:bg-[#e4a400] hover:text-white"
    } px-6 py-3 md:px-8 md:py-4 rounded-lg font-medium transition-colors flex items-center mx-auto text-base md:text-lg`}
  >
    {children}
    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 md:w-6 md:h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </span>
  </motion.button>
);

// Icons
const CheckIcon = ({ className }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

export default ServicesSection;
