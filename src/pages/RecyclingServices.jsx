import React from 'react';

const RecyclingServices = () => {
  const services = [
    {
      title: "Plastic Recycling",
      description:
        "We process and convert plastic waste into reusable materials. Help us reduce plastic pollution!",
      icon: "♻️",
    },
    {
      title: "Metal Recycling",
      description:
        "Efficient recycling of aluminum, steel, and other metals to conserve resources.",
      icon: "🔩",
    },
    {
      title: "Paper Recycling",
      description:
        "Recycle newspapers, office paper, and cardboard to save trees and reduce landfill waste.",
      icon: "📄",
    },
    {
      title: "E-Waste Recycling",
      description:
        "Dispose of electronic waste safely to recover precious metals and avoid toxic pollution.",
      icon: "💻",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-green-600 text-center mb-8">
          Recycling Services
        </h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          Our recycling services help you manage waste responsibly and contribute to a cleaner environment.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition duration-300"
            >
              <div className="text-5xl text-green-600 mb-4 text-center">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">
                {service.title}
              </h3>
              <p className="text-gray-600 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecyclingServices;
