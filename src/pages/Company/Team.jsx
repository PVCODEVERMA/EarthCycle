import { motion } from "framer-motion";
import deep from "../../../src/assets/profile_pic/deep.jpg";
import prav from "../../../src/assets/profile_pic/prav.jpg";
import pv from "../../../src/assets/profile_pic/pv.jpg";
import { Link } from "react-router-dom";
import bgImage from "../../../src/assets/blog/blog-breadcrumb.webp";
import WhyChooseUs from "../WhyChooseUs";
const team = [
  { name: "Pravesh Bind", role: "CEO & Founder", img: prav },
  { name: "Deepak Maurya", role: "Operations Head", img: deep },
  { name: "Pankaj Verma", role: "Tech Lead", img: pv },
];

const Team = () => (
  <>
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-sm mb-4">
          <Link to="/" className="text-gray-600 hover:underline">
            Home
          </Link>
          <span className="font-semibold text-gray-500"> &gt; </span>
          <Link
            to="/team"
            className="text-[#e4a400] font-semibold hover:underline"
          >
            Teams
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center min-h-[300px] w-full rounded-lg mb-12">
          <motion.div
            className="bg-green-500 text-white md:w-1/2 h-60 w-full py-12 px-8 relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl text-[#e4a400] font-bold mb-3">Teams</h1>
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

      {/* Team Section */}
      <div className="container mx-auto px-4 py-2">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Meet Our Leaders
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="relative group">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-64 h-64 rounded-full object-cover mx-auto shadow-xl 
                         group-hover:scale-105 transition-transform"
                />
                <div
                  className="absolute inset-0 rounded-full border-4 border-white/30 
                             group-hover:border-[#e4a400] transition-colors"
                />
              </div>
              <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">
                {member.name}
              </h3>
              <p className="text-gray-600">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    <WhyChooseUs />
  </>
);

export default Team;
