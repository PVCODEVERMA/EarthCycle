"use client";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedTooltip } from "../components/ui/animated-tooltip";
import pv from "../assets/profile_pic/pv.jpg";
import deep from "../assets/profile_pic/deep.jpg";
import prav from "../assets/profile_pic/prav.jpg";
const people = [
  {
    id: 1,
    name: "Pankaj Verma",
    designation: "Software Engineer",
    image: pv,
  },
  {
    id: 2,
    name: "Deepak Maurya",
    designation: "Product Manager",
    image: deep,
  },
  {
    id: 3,
    name: "Pravesh Bind",
    designation: "Data Scientist",
    image: prav,
  },
  
];

const BusinessSection = () => {
  return (
    <>
      <div>
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight"
                >
                  Competitive And Reliable Business Waste Collection Solutions
                </motion.h2>

                <p className="text-lg text-green-600 font-semibold">
                  Serving All Waste Management Needs And Recycling Services For
                  90,000 Customers Worldwide!
                </p>

                <p className="text-gray-600">
                  With strategically located operations across US, Wastia
                  provide customers with an extensive range of innovative
                  environmental services, all from one efficient company. Our
                  team believe that by providing safe and cost effective
                  solutions, our customers and the communities we serve will
                  make our planet green again.
                </p>

                <p className="text-gray-600">
                  We are here to help you manage your waste removal, regardless
                  of the size of your waste, we will work with you to treat your
                  trash in the best possible way for the environment and our
                  planet.
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="inline-block"
                >
                  <a
                    href="/about"
                    className="flex items-center gap-2 text-green-600 font-semibold hover:text-[#e4a400] transition-colors group"
                  >
                    More About Us
                    <span className="ml-1 transition-transform duration-300 group-hover:rotate-45">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </span>
                  </a>
                  <div className="mt-1 h-px bg-green-600 w-0 group-hover:w-full transition-all duration-300" />
                  <p className="text-sm text-gray-500 mt-1">
                    Pankaj Verma - The Founder
                  </p>
                  <div className="flex flex-row items-center justify-center mb-10 w-full">
                    <AnimatedTooltip items={people} />
                  </div>
                </motion.div>
              </div>

              {/* Right Content */}
              <div className="space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Why Choose Us?
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#e4a400] rounded-full flex items-center justify-center">
                        <span className="text-white">✓</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Experts in Commercial & Business Waste Management
                        </h4>
                        <p className="text-gray-600 mt-1 text-sm">
                          Comprehensive solutions tailored to your business
                          needs
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#e4a400] rounded-full flex items-center justify-center">
                        <span className="text-white">✓</span>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">
                          Regular, Reliable & Convenient Services
                        </h4>
                        <p className="text-gray-600 mt-1 text-sm">
                          Consistent scheduling and dependable waste collection
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <p className="text-sm text-green-800">
                    "We commit to environmentally responsible practices in every
                    aspect of our operations, ensuring sustainable waste
                    management solutions."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 md:py-24">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
              >
                Find the Right Solution for Your Needs!
              </motion.h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                A Wide Range Of Services For Your Home And Business!
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left Column */}
              <div className="space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-green-50 p-8 rounded-xl"
                >
                  <h3 className="text-2xl font-semibold text-green-600 mb-6">
                    How Does It Work?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We understand that we must lead by example and are committed
                    to further improving health, safety and wellbeing in our
                    sector.
                  </p>
                  <p className="text-gray-600">
                    Wastia has been awarded five star grading and made strong
                    progress in making sure the planet is safe through
                    sustainable practices.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-2 gap-4"
                >
                  <div className="bg-green-600 text-white p-6 rounded-lg text-center">
                    <p className="text-2xl font-bold mb-2">6000+</p>
                    <p className="text-sm">Dedicated Employees</p>
                  </div>
                  <div className="bg-green-100 p-6 rounded-lg text-center">
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      24/7
                    </p>
                    <p className="text-sm text-gray-600">Operations Support</p>
                  </div>
                </motion.div>
              </div>

              {/* Right Column */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <div className="flex items-start gap-4 p-6 hover:bg-green-50 rounded-xl transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#e4a400] rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">✓</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      Comprehensive Waste Management
                    </h4>
                    <p className="text-gray-600">
                      Daily essential operations including collection,
                      recycling, and treatment to support our economy and
                      environment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 hover:bg-green-50 rounded-xl transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#e4a400] rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">
                      <svg
                        className="w-12 h-12 text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
                        />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      Sustainable Recycling Solutions
                    </h4>
                    <p className="text-gray-600">
                      Innovative processing methods to maximize material
                      recovery and minimize environmental impact.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 hover:bg-green-50 rounded-xl transition-colors">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#e4a400] rounded-full flex items-center justify-center">
                    <span className="text-white text-xl">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">
                      Certified Excellence
                    </h4>
                    <p className="text-gray-600">
                      Five-star graded services with proven track record in
                      environmental safety and compliance.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BusinessSection;
