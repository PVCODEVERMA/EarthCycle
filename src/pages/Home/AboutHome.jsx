import { motion } from "framer-motion";
import deep from "../../../src/assets/profile_pic/deep.jpg";
import prav from "../../../src/assets/profile_pic/prav.jpg";
import pv from "../../../src/assets/profile_pic/pv.jpg";
import About from "../../components/common/About";
import CountUp from "../../components/ui/CountUp";
import { Link } from "react-router-dom";
import bgImage from "../../../src/assets/blog/blog-breadcrumb.webp";
export default function AboutPage() {
  const stats = [
    { number: 10000, suffix: "+", label: "Happy Customers" },
    { number: 500, suffix: "+", label: "Cities Covered" },
    { number: 95, suffix: "%", label: "Satisfaction Rate" },
    { number: "24/7", label: "Support Available" },
  ];

  const team = [
    { name: "Pravesh Bind", role: "CEO & Founder", img: prav },
    { name: "Deepak Maurya", role: "Operations Head", img: deep },
    { name: "Pankaj Verma", role: "Tech Lead", img: pv },
  ];

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-sm mb-4">
            <Link to="/" className="text-gray-600 hover:underline">
              Home
            </Link>
            <span className="font-semibold text-gray-500"> &gt; </span>
            <Link
              to="/about"
              className="text-[#e4a400] font-semibold hover:underline"
            >
              About
            </Link>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center min-h-[300px] w-full rounded-lg mb-12">
            <motion.div
              className="bg-green-500 text-white md:w-1/2 h-60 w-full py-12 px-8 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl text-[#e4a400] font-bold mb-3">About</h1>
              <p className="text-sm font-bold mb-3">
                Committed to transforming waste management through innovation
                and technology since 2025
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

        {/* Stats Grid */}
        <div className="container  grid grid-cols-1 md:grid-cols-4 gap-8 mx-auto px-4 py-16">
          {stats.map(({ number, suffix = "", label }, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 },
              }}
              className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl font-bold text-[#e4a400] mb-2">
                {typeof number === "number" ? (
                  <CountUp
                    from={0}
                    to={number}
                    duration={1}
                    separator=","
                    suffix={suffix}
                  />
                ) : (
                  number
                )}
              </div>
              <div className="text-gray-600 font-medium">{label}</div>
            </motion.div>
          ))}
        </div>
        {/* Our Story Section */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                className="text-3xl font-bold text-gray-800 mb-8 text-center"
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
              >
                Our Journey Towards Greener Future
              </motion.h2>

              <motion.div
                className="grid md:grid-cols-2 gap-12 items-center"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.3 } },
                }}
              >
                <motion.img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSyRLk9Z_9dtbmFJuFvxVk6fqhM8EnBIRpQ&s"
                  alt="Our Team"
                  className="rounded-xl shadow-xl w-full h-64 object-cover"
                  variants={{ hidden: { x: -50 }, visible: { x: 0 } }}
                />

                <motion.div
                  className="space-y-4 text-gray-600"
                  variants={{ hidden: { x: 50 }, visible: { x: 0 } }}
                >
                  <p>
                    Founded in 2015 with a mission to revolutionize waste
                    management, we've grown from a small startup to a national
                    leader in eco-friendly disposal solutions.
                  </p>
                  <p>
                    Our team of environmental experts and tech innovators work
                    tirelessly to develop smart waste management systems that
                    benefit both businesses and communities.
                  </p>
                  <p>
                    Through cutting-edge technology and community partnerships,
                    we've diverted over 1 million tons of waste from landfills
                    to recycling centers.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-green-50 py-16">
          <div className="container mx-auto px-4">
            <motion.h2
              className="text-3xl font-bold text-center mb-12 text-gray-800"
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
            >
              Our Core Values
            </motion.h2>

            <div className="grid md:grid-cols-3 gap-8">
              {["Sustainability", "Innovation", "Community"].map(
                (value, index) => (
                  <motion.div
                    key={value}
                    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-6">
                      <span className="text-3xl">
                        {["🌱", "💡", "🤝"][index]}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      {value}
                    </h3>
                    <p className="text-gray-600">
                      {value === "Sustainability" &&
                        "Commitment to environmental preservation through circular economy practices"}
                      {value === "Innovation" &&
                        "Continuous development of smart waste management technologies"}
                      {value === "Community" &&
                        "Empowering local communities through education and partnerships"}
                    </p>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="container mx-auto px-4 py-16">
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
    </>
  );
}
