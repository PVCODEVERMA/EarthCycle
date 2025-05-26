import React, { useEffect, useState } from "react";
import { PlayIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import AOS from "aos";
import "aos/dist/aos.css";
import "../App.css";
const WasteService = () => {
  const [animateBars, setAnimateBars] = useState(false);
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const stats = [
    { category: "Construction Waste", percentage: "95%" },
    { category: "Manufacturing Waste", percentage: "86%" },
    { category: "Retail Waste", percentage: "77%" },
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
    setAnimateBars(true);

    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Video Popup Modal */}
      {showVideoPopup && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowVideoPopup(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-3xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-8 right-0 text-white hover:text-gray-200 transition-colors"
              onClick={() => setShowVideoPopup(false)}
            >
              <XMarkIcon className="w-8 h-8" />
            </button>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/VQTtg3KgVv4?autoplay=1&mute=1&enablejsapi=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <header
          className="bg-green-600 text-white py-6 rounded-lg mt-6"
          data-aos="fade-down"
        >
          <div className="px-4">
            <h1 className="text-4xl font-bold mb-2">
              Number One Commercial Waste Collection Service Provider!
            </h1>
            <p className="text-xl">
              A leading Commercial Waste Service Provider For Almost 26 Years.
            </p>
          </div>
        </header>

        <main className="py-12">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column */}
            <div className="md:w-2/3">
              <section className="mb-8" data-aos="fade-right">
                <h2 className="text-2xl font-semibold mb-4">
                  Our Sustainability Journey
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  We have already made huge strides in our sustainability
                  journey by investing in plastic recycling and energy from
                  waste infrastructure, leading to reduction in national carbon
                  emissions since 2016.
                </p>
              </section>

              {/* Progress Bars */}
              <section className="mb-8">
                <h3 className="text-xl font-semibold mb-4" data-aos="fade-up">
                  Our Waste Collection Rates
                </h3>
                <div className="space-y-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      data-aos="zoom-in"
                      data-aos-delay={index * 200}
                    >
                      <div className="flex justify-between mb-1">
                        <span>{stat.category}</span>
                        <span>{stat.percentage}</span>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-full">
                        <div
                          className="h-4 bg-[#e4a400] rounded-full transition-all duration-1000 ease-out"
                          style={{
                            width: animateBars ? stat.percentage : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Video Section */}
            <div className="md:w-1/3" data-aos="fade-left" data-aos-delay="300">
              <div
                className="relative aspect-video rounded-lg overflow-hidden shadow-md hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => setShowVideoPopup(true)}
              >
                <img
                  src="https://img.youtube.com/vi/VQTtg3KgVv4/maxresdefault.jpg"
                  alt="Video Thumbnail"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <PlayIcon className="w-16 h-16 text-white hover:text-gray-300 animate-pulse" />
                </div>
              </div>
              <p className="text-center mt-2 font-semibold text-gray-600">
                Watch Out: Video!
              </p>
            </div>
          </div>

          {/* Services Section */}
          <section className="mt-12">
            <h3
              className="text-2xl text-center font-semibold mb-6"
              data-aos="fade-up"
            >
              Our Services
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                data-aos="flip-left"
              >
                <CheckIcon className="w-6 h-6 text-blue-900 mb-2 animate-bounce" />
                <h4 className="text-xl font-semibold mb-2">
                  General Waste Collections
                </h4>
                <p className="text-gray-600">
                  Reliable and cost-effective waste management solutions
                </p>
              </div>
              <div
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                data-aos="flip-right"
                data-aos-delay="200"
              >
                <CheckIcon className="w-6 h-6 text-blue-900 mb-2 animate-bounce" />
                <h4 className="text-xl font-semibold mb-2">
                  Recycling Services
                </h4>
                <p className="text-gray-600">
                  Sustainable recycling solutions for all business needs
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default WasteService;
