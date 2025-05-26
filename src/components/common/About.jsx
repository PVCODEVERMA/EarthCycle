"use client";
import { motion } from "framer-motion";
import React from "react";
import { ImagesSlider } from "../ui/images-slider";
import { FaBullseye, FaEye, FaHandHoldingHeart } from "react-icons/fa";
import image_1 from '../../assets/about/image_1.avif';
import image_2 from '../../assets/about/image_2.avif';
import image_3 from '../../assets/about/image_3.avif';
const About = () => {
  const images = [
    image_1,
    image_2,
    image_3,
  ];

  const coreValues = [
    {
      title: "Mission",
      content: "To create a sustainable environment by promoting efficient waste collection and recycling processes.",
      icon: <FaBullseye className="w-8 h-8" />,
    },
    {
      title: "Vision",
      content: "To become a global leader in waste management, ensuring a cleaner planet for future generations.",
      icon: <FaEye className="w-8 h-8" />,
    },
    {
      title: "Impact",
      content: "Reducing landfill waste and empowering communities to adopt eco-friendly practices.",
      icon: <FaHandHoldingHeart className="w-8 h-8" />,
    },
  ];

  return (
    <div className=" bg-slate-100">
      <ImagesSlider className="" images={images}>
        <motion.div
          initial={{ opacity: 0, y: -80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="z-50 flex flex-col justify-center items-center"
        >
         

          <section className="py-16 w-full">
            <div className="container mx-auto px-6">
              <h2 className="text-3xl text-white font-bold text-center mb-12">
                Our Core Values
              </h2>

              <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {coreValues.map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="group bg-white/90 p-8 rounded-lg shadow-lg hover:bg-[#e4a400] backdrop-blur-sm transition-all duration-300"
                  >
                    <div className="flex flex-col items-center">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        className="text-green-600 group-hover:text-white p-4 rounded-full bg-white/20 mb-4"
                      >
                        {item.icon}
                      </motion.div>
                      <h3 className="text-xl font-semibold text-green-600 group-hover:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 group-hover:text-white text-center">
                        {item.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </motion.div>
      </ImagesSlider>
    </div>
  );
};

export default About;