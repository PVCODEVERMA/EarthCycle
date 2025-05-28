import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaRecycle, FaPlus, FaCheck } from 'react-icons/fa';

const NewService = () => {
  const [serviceName, setServiceName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [serviceType, setServiceType] = useState('pickup');
  const [wasteCategories, setWasteCategories] = useState([]);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const wasteTypes = [
    { id: 'electronics', name: 'Electronics', icon: <FaTrash className="text-blue-500" /> },
    { id: 'plastic', name: 'Plastic', icon: <FaRecycle className="text-green-500" /> },
    { id: 'metal', name: 'Metal', icon: <FaTrash className="text-gray-500" /> },
    { id: 'paper', name: 'Paper', icon: <FaRecycle className="text-yellow-500" /> },
    { id: 'hazardous', name: 'Hazardous', icon: <FaTrash className="text-red-500" /> },
    { id: 'organic', name: 'Organic', icon: <FaRecycle className="text-brown-500" /> },
  ];

  const toggleCategory = (id) => {
    if (wasteCategories.includes(id)) {
      setWasteCategories(wasteCategories.filter(cat => cat !== id));
    } else {
      setWasteCategories([...wasteCategories, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccess(true);
      setServiceName('');
      setDescription('');
      setPrice('');
      setServiceType('pickup');
      setWasteCategories([]);
      
      // Reset success message after 4 seconds
      setTimeout(() => setSuccess(false), 4000);
    } catch (error) {
      console.error("Error creating service:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-cyan-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
            <h1 className="text-3xl font-bold flex items-center">
              <FaRecycle className="mr-3" /> Create New Service
            </h1>
            <p className="opacity-90 mt-2">
              Add a new eWaste collection service to your offerings
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center"
              >
                <FaCheck className="mr-2 text-green-600" />
                <span>Service created successfully!</span>
              </motion.div>
            )}

            {/* Service Type */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Type</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { id: 'pickup', label: 'Pickup Service', desc: 'Schedule waste collection at customer location' },
                  { id: 'dropoff', label: 'Drop-off Point', desc: 'Establish a collection point for waste drop-off' },
                  { id: 'event', label: 'Collection Event', desc: 'Organize a special eWaste collection event' },
                ].map(type => (
                  <div
                    key={type.id}
                    onClick={() => setServiceType(type.id)}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      serviceType === type.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex items-start">
                      <div
                        className={`w-5 h-5 rounded-full border mr-3 mt-0.5 flex items-center justify-center ${
                          serviceType === type.id
                            ? 'border-green-500 bg-green-500'
                            : 'border-gray-400'
                        }`}
                      >
                        {serviceType === type.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{type.label}</h4>
                        <p className="text-sm text-gray-600 mt-1">{type.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Service Name</label>
                <input
                  type="text"
                  value={serviceName}
                  onChange={e => setServiceName(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                  placeholder="e.g., Premium E-Waste Collection"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-medium">
                  Price (₹)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    required
                    min="0"
                    step="0.01"
                    className="w-full pl-8 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <label className="block text-gray-700 mb-2 font-medium">Description</label>
              <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                required
                rows="4"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                placeholder="Describe the service in detail..."
              ></textarea>
            </div>

            {/* Waste Categories */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Waste Categories</h3>
              <p className="text-gray-600 mb-4">Select the types of waste this service collects:</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {wasteTypes.map(type => (
                  <div
                    key={type.id}
                    onClick={() => toggleCategory(type.id)}
                    className={`border rounded-lg p-3 text-center cursor-pointer transition-all ${
                      wasteCategories.includes(type.id)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="flex justify-center text-xl mb-2">
                      {type.icon}
                    </div>
                    <span className={`text-sm ${
                      wasteCategories.includes(type.id)
                        ? 'text-green-700 font-medium'
                        : 'text-gray-700'
                    }`}>
                      {type.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Options */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Service Options</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Collection Frequency</label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-white">
                    <option>One-time collection</option>
                    <option>Weekly</option>
                    <option>Bi-weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Minimum Weight (kg)</label>
                  <input
                    type="number"
                    min="0"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className={`flex items-center px-8 py-4 rounded-lg text-white font-medium ${
                  loading ? 'bg-gray-400' : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Service...
                  </>
                ) : (
                  <>
                    <FaPlus className="mr-2" /> Create Service
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Info Panel */}
        <div className="mt-8 bg-white rounded-xl shadow-xl p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaRecycle className="mr-2 text-green-500" /> Service Creation Guidelines
          </h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 mr-3">1</div>
              <span>Clearly define what types of eWaste your service collects</span>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 mr-3">2</div>
              <span>Set competitive pricing based on your operational costs</span>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 mr-3">3</div>
              <span>Include detailed descriptions of the collection process</span>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 mr-3">4</div>
              <span>Specify any geographic limitations for your service</span>
            </li>
            <li className="flex items-start">
              <div className="bg-green-100 text-green-800 rounded-full w-5 h-5 flex items-center justify-center text-xs mt-0.5 mr-3">5</div>
              <span>Mention any certifications or compliance information</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NewService;