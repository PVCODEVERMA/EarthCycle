import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import client_img from '../assets/Clients_img.jpg';

import pv from "../assets/profile_pic/pv.jpg";
import deep from "../assets/profile_pic/deep.jpg";
import prav from "../assets/profile_pic/prav.jpg";
const images = [
  prav,
  deep,
  pv,
  deep,
];

const testimonials = [
  {
    name: "Kristine Abernathy",
    text: "Lorem ipsum dolor sit amet consectetur. Amet mauris varius adipiscing vel. Elementum dignissim sit sed odio.",
    position: "Legacy Mobility Officer"
  },
  {
    name: "Marcus D'Souza",
    text: "Exceptional service and support throughout our digital transformation journey.",
    position: "Chief Digital Officer"
  },
  {
    name: "Sophia Alvarez",
    text: "Revolutionized our customer engagement strategy.",
    position: "Customer Experience Director"
  },
  {
    name: "Oliver Chen",
    text: "Their innovative approach to data analytics helped us uncover hidden opportunities.",
    position: "Data Strategy Lead"
  },
  {
    name: "Priya Kapoor",
    text: "The platform's intuitive design and robust features have significantly improved efficiency.",
    position: "Operations Manager"
  },
  {
    name: "Ethan Blackwell",
    text: "A game-changer for our sustainability initiatives.",
    position: "Sustainability Coordinator"
  },
  {
    name: "Amina Farah",
    text: "Outstanding technical support and proactive maintenance.",
    position: "IT Infrastructure Manager"
  },
  {
    name: "Lucas Müller",
    text: "The training programs helped upskill our team remarkably.",
    position: "Learning & Development Head"
  },
  {
    name: "Isabella Rossi",
    text: "Streamlined our supply chain management beyond expectations.",
    position: "Logistics Supervisor"
  },
  {
    name: "Nathan Wright",
    text: "Their cybersecurity solutions provided the protection we needed.",
    position: "Information Security Analyst"
  }
].map((item, i) => ({
  ...item,
  image: images[i % images.length],
  stars: '★★★★'
}));

export default function TestimonialSlider() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState('right');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setDirection('right');
        setIndex((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered]);

  const nextSlide = () => {
    setDirection('right');
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection('left');
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const variants = {
    enter: (direction) => ({
      x: direction === 'right' ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: 'easeInOut' },
    },
    exit: (direction) => ({
      x: direction === 'right' ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.4, ease: 'easeInOut' },
    }),
  };

  return (
    <section
      className="relative text-white py-12 md:py-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${client_img})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-3 md:mb-4">
            Hear It From Our Clients
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Lorem ipsum dolor sit amet consectetur. Condimentum risus eu et lacus et eget.
          </p>
        </div>

        <div
          className="relative max-w-4xl mx-auto min-h-[400px] md:h-96"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full"
            >
              <div className="bg-white text-gray-900 p-6 md:p-8 rounded-lg shadow-lg h-full flex flex-col justify-center">
                <div className="mb-4 md:mb-6">
                  <img
                    src={testimonials[index].image}
                    alt={testimonials[index].name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto object-cover border-4 border-yellow-400"
                    loading="lazy"
                    onError={(e) => { e.target.src = '/fallback.jpg'; }}
                  />
                </div>
                <div className="text-yellow-400 text-xl md:text-2xl mb-3 md:mb-4">
                  {testimonials[index].stars}
                </div>
                <p className="text-gray-600 italic mb-4 md:mb-6 text-base md:text-lg">
                  “{testimonials[index].text}”
                </p>
                <h3 className="font-bold text-lg md:text-xl text-gray-800 mb-1 md:mb-2">
                  {testimonials[index].name}
                </h3>
                <p className="text-gray-500 font-medium text-sm md:text-base">
                  {testimonials[index].position}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 md:-left-12 -translate-y-1/2 bg-yellow-400 p-2 md:p-3 rounded-full shadow-lg hover:bg-yellow-500 transition"
            aria-label="Previous testimonial"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-black" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 md:-right-12 -translate-y-1/2 bg-yellow-400 p-2 md:p-3 rounded-full shadow-lg hover:bg-yellow-500 transition"
            aria-label="Next testimonial"
          >
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-black" />
          </button>
        </div>
      </div>
    </section>
  );
}
