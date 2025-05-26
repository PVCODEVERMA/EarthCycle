// In LearnMorePage.js
import React from "react";

const LearnMorePage = () => {
  return (
    <div className=" bg-white">
        <div className=" max-w-screen-xl mx-auto px-4 py-8">
      <h2 className="text-center text-3xl font-semibold text-blue-600 mb-6">
        Learn More About Waste Management
      </h2>

      {/* Cards Section */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-lg transition-colors duration-300 hover:bg-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">What is Waste Management?</h3>
          <p className="text-gray-600">
            Waste management involves the collection, transportation, and disposal of garbage, sewage, and other waste products. It is essential for maintaining public health and a sustainable environment.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg transition-colors duration-300 hover:bg-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Importance of Recycling</h3>
          <p className="text-gray-600">
            Recycling reduces the need for raw materials, conserves energy, and reduces pollution. By recycling, we can help protect the environment and reduce landfill waste.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg transition-colors duration-300 hover:bg-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-4">How Does Our Platform Help?</h3>
          <p className="text-gray-600">
            Our platform makes waste disposal easy by allowing users to schedule waste pickups for recyclables, organic waste, and other categories. It ensures timely collection and promotes eco-friendly practices.
          </p>
        </div>
      </div>

      {/* Tips Section */}
      <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Tips for Proper Waste Disposal</h3>
      <ul className="list-disc pl-5 space-y-2 text-gray-600">
        <li className="">Separate recyclables like paper, glass, and plastic from other waste.</li>
        <li>Compost organic waste such as food scraps and yard waste.</li>
        <li>Avoid dumping hazardous materials such as batteries or chemicals in trash bins.</li>
        <li>Check local recycling programs for guidelines on specific items.</li>
      </ul>
    </div>
    </div>
  );
};

export default LearnMorePage;
