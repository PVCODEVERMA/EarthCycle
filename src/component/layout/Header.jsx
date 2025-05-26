import { useState, useEffect } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slide_1 from '../../assets/crouser/slide_1.avif'
import Slide_2 from '../../assets/crouser/slide_2.jpg'
import Slide_3 from '../../assets/crouser/slide_3.jpg'
const Header = () => {
  const slides = [
    {
      image:
        Slide_1,
      title: "Reliable Waste & Recycling Services",
      text: "We are a progressive business continually improving our services.",
    },
    {
      image:
        Slide_2,
      title: "Eco-Friendly Solutions",
      text: "Sustainable waste management for a greener future.",
    },
    {
      image:
        Slide_3,
      title: "24/7 Support",
      text: "Round-the-clock service for your convenience.",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToPrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
     <div className="relative h-[80vh] md:h-screen overflow-hidden">
      {/* Slides Container (same as before) */}
      <div
        className="absolute inset-0 z-0 transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="absolute h-full w-full inset-0"
            style={{ left: `${index * 100}%` }}
          >
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons with responsive sizing */}
      <button
        onClick={goToPrev}
        className="absolute left-2 md:left-4 top-1/2 z-20 -translate-y-1/2 p-2 md:p-4 rounded-full bg-black/30 hover:bg-[#e4a400] transition-all duration-300 group"
      >
        <span className="text-white text-xl md:text-2xl transform transition-transform group-hover:-translate-x-1">
          <FaChevronRight />
        </span>
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 md:right-4 top-1/2 z-20 -translate-y-1/2 p-2 md:p-4 rounded-full bg-black/30 hover:bg-[#e4a400] transition-all duration-300 group"
      >
        <span className="text-white text-xl md:text-2xl transform transition-transform group-hover:translate-x-1">
          <FaChevronLeft />
        </span>
      </button>

      {/* Content Overlay with responsive adjustments */}
      <div className="relative z-10 flex h-full items-center justify-center ">
        <div className="max-w-lg md:max-w-2xl px-4 text-center text-white">
          <h1 className="mb-4 md:mb-6 text-3xl md:text-4xl lg:text-6xl font-bold hover:text-[#e4a400] transition-colors duration-300">
            {slides[currentSlide].title}
          </h1>
          <p className="mb-6 md:mb-8 text-base md:text-lg lg:text-xl hover:text-gray-200 transition-colors duration-300">
            {slides[currentSlide].text}
          </p>

          <div className="group flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link
              to="/booking"
              className="relative px-6 py-2 md:px-8 md:py-3 font-semibold text-sm md:text-base text-white bg-[#e4a400] rounded-lg hover:bg-green-500 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/30 transform hover:-translate-y-1"
            >
              <span className="relative z-10 flex items-center justify-center">
                Request Pickup
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">
                  <svg
                    className="icon-arrow-right-up w-4 h-4 transform transition-transform duration-300 group-hover:rotate-45"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
              </span>
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-0 group-hover:w-full" />
            </Link>

           
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
