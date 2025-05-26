import React, { useState } from 'react';

const PickupScheduling = () => {
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [wasteAmount, setWasteAmount] = useState('');
  const [userDetails, setUserDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission (e.g., sending the data to the server or storing it)
    console.log({
      pickupDate,
      pickupTime,
      wasteType,
      wasteAmount,
      userDetails,
    });
    alert('Pickup scheduled successfully!');
  };

  return (
    <div className="bg-green-50 min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-green-600 mb-6">Schedule a Pickup</h1>

        <form onSubmit={handleSubmit}>
          {/* Pickup Date */}
          <div className="mb-4">
            <label
              htmlFor="pickupDate"
              className="block text-lg font-medium text-gray-700"
            >
              Pickup Date
            </label>
            <input
              type="date"
              id="pickupDate"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Pickup Time */}
          <div className="mb-4">
            <label
              htmlFor="pickupTime"
              className="block text-lg font-medium text-gray-700"
            >
              Pickup Time
            </label>
            <input
              type="time"
              id="pickupTime"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Type of Waste */}
          <div className="mb-4">
            <label
              htmlFor="wasteType"
              className="block text-lg font-medium text-gray-700"
            >
              Type of Waste
            </label>
            <select
              id="wasteType"
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Waste Type</option>
              <option value="Plastic">Plastic</option>
              <option value="Paper">Paper</option>
              <option value="E-Waste">E-Waste</option>
              <option value="Organic">Organic</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Amount of Waste */}
          <div className="mb-4">
            <label
              htmlFor="wasteAmount"
              className="block text-lg font-medium text-gray-700"
            >
              Amount of Waste (in kg)
            </label>
            <input
              type="number"
              id="wasteAmount"
              value={wasteAmount}
              onChange={(e) => setWasteAmount(e.target.value)}
              required
              min="1"
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* User Details */}
          <div className="mb-4">
            <label
              htmlFor="userDetails"
              className="block text-lg font-medium text-gray-700"
            >
              Your Name / Contact Information
            </label>
            <input
              type="text"
              id="userDetails"
              value={userDetails}
              onChange={(e) => setUserDetails(e.target.value)}
              required
              className="mt-2 p-2 border border-gray-300 rounded w-full"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-700 transition"
            >
              Schedule Pickup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PickupScheduling;
