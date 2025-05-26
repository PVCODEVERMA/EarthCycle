import React from 'react';

const WasteAnalytics = () => {
  const analyticsData = [
    {
      category: "Plastic",
      volume: "2,500 kg",
      percentage: "40%",
    },
    {
      category: "Metal",
      volume: "1,200 kg",
      percentage: "20%",
    },
    {
      category: "Paper",
      volume: "1,800 kg",
      percentage: "30%",
    },
    {
      category: "E-Waste",
      volume: "500 kg",
      percentage: "10%",
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-green-600 text-center mb-8">
          Waste Analytics
        </h1>
        <p className="text-lg text-gray-700 text-center mb-12">
          Analyze waste collection trends to improve efficiency and reduce environmental impact.
        </p>

        {/* Analytics Chart Placeholder */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Waste Composition Overview
          </h2>
          <div className="flex justify-center">
            <div className="w-full lg:w-1/2 flex justify-around items-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-300 rounded-full flex justify-center items-center">
                  <span className="text-lg font-bold text-green-800">40%</span>
                </div>
                <p className="mt-2 text-gray-600">Plastic</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-400 rounded-full flex justify-center items-center">
                  <span className="text-lg font-bold text-green-800">30%</span>
                </div>
                <p className="mt-2 text-gray-600">Paper</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex justify-center items-center">
                  <span className="text-lg font-bold text-green-800">20%</span>
                </div>
                <p className="mt-2 text-gray-600">Metal</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex justify-center items-center">
                  <span className="text-lg font-bold text-green-800">10%</span>
                </div>
                <p className="mt-2 text-gray-600">E-Waste</p>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Table */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Waste Collection Details
          </h2>
          <table className="table-auto w-full text-left text-gray-700">
            <thead>
              <tr className="bg-green-600 text-white">
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Volume</th>
                <th className="px-4 py-2">Percentage</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.map((data, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2">{data.category}</td>
                  <td className="px-4 py-2">{data.volume}</td>
                  <td className="px-4 py-2">{data.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WasteAnalytics;
