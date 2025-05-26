import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import bgImage from "../../../src/assets/blog/blog-breadcrumb.webp";
import About from "../../components/common/About";

const Mission = () => (

  <div className="">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-sm mb-4">
        <Link to="/" className="text-gray-600 hover:underline">
          Home
        </Link>
        <span className="font-semibold text-gray-500"> &gt; </span>
        <Link
          to="/mission"
          className="text-[#e4a400] font-semibold hover:underline"
        >
          Middion
        </Link>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center min-h-[300px] w-full rounded-lg mb-12">
        <motion.div
          className="bg-green-500 text-white md:w-1/2 h-60 w-full py-12 px-8 relative"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl text-[#e4a400] font-bold mb-3">Mission</h1>
          <p className="text-sm font-bold mb-3">
            Committed to transforming waste management through innovation and
            technology since 2025
          </p>

          <div className="absolute bottom-6 right-6 opacity-10 text-[120px]">
            ♻️
          </div>
        </motion.div>

        <motion.div
          className="hidden md:block md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={bgImage}
            alt="Recycling"
            className="w-full h-60 object-cover"
          />
        </motion.div>
      </div>
    </div>

    <About />

    {/* CTA Section */}
    <div className="relative bg-green-600 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-3xl md:text-4xl font-bold text-white mb-8"
        >
          Join Our Green Revolution
        </motion.h2>
        <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
          <Link
            to="/contact"
            className="bg-white text-green-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all"
          >
            Get Involved Now
          </Link>
        </motion.div>
      </div>
    </div>
  </div>
  
);

export default Mission;
