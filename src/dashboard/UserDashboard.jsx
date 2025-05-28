import React, { useState, useEffect } from 'react';
import { 
  FaUser, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, 
  FaTrash, FaClock, FaTruck, FaCheck, FaHistory, FaStar,
  FaRecycle, FaLeaf, FaExclamationTriangle, FaMap, FaCog,
  FaTimes, FaUsers  // Added missing icons
} from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom truck icon
const truckIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/167/167755.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40]
});

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState({
    id: 'U101',
    name: 'Rajesh Kumar',
    address: '123 Hazratganj, Lucknow',
    phone: '9876543210',
    email: 'rajesh@example.com',
    preferredTimes: ['10:00 AM - 12:00 PM', '3:00 PM - 5:00 PM'],
    bookings: [
      {
        id: 'B001',
        date: '2023-06-15',
        time: '10:00 AM',
        wasteType: 'E-Waste',
        items: [
          { name: 'Laptops', quantity: 3 },
          { name: 'Mobile Phones', quantity: 8 }
        ],
        status: 'Completed',
        team: 'Lucknow Central Unit',
        driver: 'Arjun Patel',
        rating: 4.5,
        feedback: 'Team arrived on time and was very professional'
      },
      {
        id: 'B002',
        date: '2023-06-22',
        time: '11:00 AM',
        wasteType: 'Organic',
        items: [
          { name: 'Food Waste', quantity: 15 },
          { name: 'Garden Waste', quantity: 8 }
        ],
        status: 'Completed',
        team: 'Gomti Nagar Team',
        driver: 'Sunil Kumar',
        rating: 4.0,
        feedback: 'Good service but a bit late'
      },
      {
        id: 'B003',
        date: '2023-06-30',
        time: '3:30 PM',
        wasteType: 'Hazardous',
        items: [
          { name: 'Batteries', quantity: 12 },
          { name: 'Paint Cans', quantity: 5 }
        ],
        status: 'In Progress',
        team: 'Lucknow Central Unit',
        driver: 'Arjun Patel',
        estimatedArrival: '15 minutes',
        liveLocation: [26.8409, 80.9462]
      }
    ]
  });
  
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    preferredTimes: []
  });
  
  const [activeBooking, setActiveBooking] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Set active booking
  useEffect(() => {
    const currentBooking = user.bookings.find(booking => 
      booking.status === 'In Progress' || booking.status === 'Accepted'
    );
    setActiveBooking(currentBooking);
  }, [user.bookings]);
  
  // Initialize form data with user data
  useEffect(() => {
    setFormData({
      name: user.name,
      address: user.address,
      phone: user.phone,
      email: user.email,
      preferredTimes: [...user.preferredTimes]
    });
  }, [user]);
  
  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Add preferred time
  const addPreferredTime = () => {
    if (formData.newTime) {
      setFormData({
        ...formData,
        preferredTimes: [...formData.preferredTimes, formData.newTime],
        newTime: ''
      });
    }
  };
  
  // Remove preferred time
  const removePreferredTime = (index) => {
    const updatedTimes = [...formData.preferredTimes];
    updatedTimes.splice(index, 1);
    setFormData({ ...formData, preferredTimes: updatedTimes });
  };
  
  // Save account settings
  const saveAccountSettings = () => {
    setUser({
      ...user,
      name: formData.name,
      address: formData.address,
      phone: formData.phone,
      email: formData.email,
      preferredTimes: formData.preferredTimes
    });
    setIsEditing(false);
  };
  
  // Submit feedback
  const submitFeedback = (bookingId) => {
    const updatedBookings = user.bookings.map(booking => {
      if (booking.id === bookingId) {
        return {
          ...booking,
          rating,
          feedback
        };
      }
      return booking;
    });
    
    setUser({ ...user, bookings: updatedBookings });
    setRating(0);
    setFeedback('');
  };
  
  // Get waste icon
  const getWasteIcon = (type) => {
    switch(type) {
      case 'E-Waste': return <FaRecycle className="text-blue-500" />;
      case 'Organic': return <FaLeaf className="text-green-500" />;
      case 'Hazardous': return <FaExclamationTriangle className="text-red-500" />;
      default: return <FaTrash className="text-gray-500" />;
    }
  };
  
  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'In Progress': 
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">In Progress</span>;
      case 'Completed': 
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Completed</span>;
      case 'Accepted': 
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Accepted</span>;
      default: 
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Pending</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-white p-3 rounded-full mr-4">
                <FaRecycle className="text-green-600 text-2xl" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">WasteWise Dashboard</h1>
                <p className="text-green-100">Manage your waste pickups efficiently</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right hidden md:block">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-green-100">{user.email}</div>
              </div>
              <div className="bg-white text-green-600 p-2 rounded-full">
                <FaUser className="text-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="bg-white shadow">
        <div className="max-w-6xl mx-auto">
          <div className="flex overflow-x-auto">
            <button
              className={`px-6 py-4 font-medium text-sm ${activeTab === 'dashboard' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <div className="flex items-center gap-2">
                <FaTruck /> Dashboard
              </div>
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm ${activeTab === 'history' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('history')}
            >
              <div className="flex items-center gap-2">
                <FaHistory /> Booking History
              </div>
            </button>
            <button
              className={`px-6 py-4 font-medium text-sm ${activeTab === 'settings' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-gray-900'}`}
              onClick={() => setActiveTab('settings')}
            >
              <div className="flex items-center gap-2">
                <FaCog /> Account Settings
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 md:p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {/* Welcome Card */}
            <div className="bg-white rounded-2xl shadow p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Welcome, {user.name}!</h2>
                  <p className="text-gray-600 mt-2">
                    Manage your waste pickups, track current collections, and view your history.
                  </p>
                </div>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 self-start">
                  <FaTrash /> Schedule New Pickup
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 flex items-center">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <FaCheck className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Completed Pickups</p>
                    <p className="text-xl font-bold">
                      {user.bookings.filter(b => b.status === 'Completed').length}
                    </p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 flex items-center">
                  <div className="bg-blue-100 p-3 rounded-full mr-4">
                    <FaRecycle className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Total Waste Recycled</p>
                    <p className="text-xl font-bold">86 kg</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4 flex items-center">
                  <div className="bg-yellow-100 p-3 rounded-full mr-4">
                    <FaStar className="text-yellow-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Average Rating</p>
                    <p className="text-xl font-bold">4.3</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Current Booking */}
            {activeBooking ? (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <FaTruck className="text-green-600" /> Current Pickup
                    </h2>
                    {getStatusBadge(activeBooking.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium text-gray-700 mb-3">Booking Details</h3>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <FaCalendarAlt className="text-gray-500 mr-3" />
                              <span>{activeBooking.date} at {activeBooking.time}</span>
                            </div>
                            <div className="flex items-center">
                              {getWasteIcon(activeBooking.wasteType)}
                              <span className="ml-3">{activeBooking.wasteType}</span>
                            </div>
                            <div className="flex items-center">
                              <FaUser className="text-gray-500 mr-3" />
                              <span>Driver: {activeBooking.driver}</span>
                            </div>
                            <div className="flex items-center">
                              <FaUsers className="text-gray-500 mr-3" />
                              <span>Team: {activeBooking.team}</span>
                            </div>
                          </div>
                          
                          <div className="mt-4">
                            <h4 className="font-medium text-gray-700 mb-2">Items to Collect:</h4>
                            <ul className="space-y-1">
                              {activeBooking.items.map((item, index) => (
                                <li key={index} className="flex justify-between text-sm">
                                  <span>{item.name}</span>
                                  <span>{item.quantity} units</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4">
                          <h3 className="font-medium text-gray-700 mb-3">Pickup Status</h3>
                          <div className="flex items-center justify-center mb-4">
                            <div className="relative w-full">
                              <div className="flex justify-between text-xs text-gray-500 mb-1">
                                <span>Scheduled</span>
                                <span>On the Way</span>
                                <span>Arriving</span>
                                <span>Completed</span>
                              </div>
                              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-500" 
                                  style={{ 
                                    width: activeBooking.status === 'In Progress' ? '75%' : 
                                          activeBooking.status === 'Completed' ? '100%' : '30%'
                                  }}
                                ></div>
                              </div>
                              <div className="flex justify-between mt-1">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <div className={`w-3 h-3 rounded-full ${
                                  activeBooking.status === 'In Progress' || 
                                  activeBooking.status === 'Completed' ? 'bg-green-500' : 'bg-gray-300'
                                }`}></div>
                                <div className={`w-3 h-3 rounded-full ${
                                  activeBooking.status === 'Completed' ? 'bg-green-500' : 'bg-gray-300'
                                }`}></div>
                              </div>
                            </div>
                          </div>
                          
                          {activeBooking.status === 'In Progress' && (
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                              <div className="flex items-center">
                                <FaClock className="text-yellow-500 mr-2" />
                                <span className="font-medium">Estimated Arrival:</span>
                                <span className="ml-2">{activeBooking.estimatedArrival}</span>
                              </div>
                              <p className="text-sm text-gray-600 mt-2">
                                Your waste collection team is on the way to your location.
                              </p>
                            </div>
                          )}
                          
                          <div className="mt-4">
                            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg flex items-center justify-center gap-2">
                              <FaPhone /> Contact Driver
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white border rounded-xl p-4">
                      <h3 className="font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-green-600" /> Live Tracking
                      </h3>
                      
                      {activeBooking.liveLocation ? (
                        <div className="h-64 rounded-lg overflow-hidden">
                          <MapContainer 
                            center={activeBooking.liveLocation} 
                            zoom={15} 
                            style={{ height: '100%', width: '100%' }}
                          >
                            <TileLayer
                              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <Marker position={activeBooking.liveLocation} icon={truckIcon}>
                              <Popup>
                                <div className="font-bold">Waste Collection Team</div>
                                <div>Driver: {activeBooking.driver}</div>
                                <div>Status: {activeBooking.status}</div>
                              </Popup>
                            </Marker>
                            <Marker position={[26.8467, 80.9462]}>
                              <Popup>
                                <div className="font-bold">Your Location</div>
                                <div>{user.address}</div>
                              </Popup>
                            </Marker>
                          </MapContainer>
                        </div>
                      ) : (
                        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center">
                            <FaMap className="text-gray-400 text-3xl mx-auto" />
                            <p className="mt-2 text-gray-600">Live tracking will begin when team starts journey</p>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-4 flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">Your Location</span>
                      </div>
                      <div className="mt-2 flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                        <span className="text-sm">Collection Team</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Next Pickup Reminder */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-3 rounded-full mr-4">
                      <FaCalendarAlt className="text-blue-600 text-xl" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Your Next Pickup</h3>
                      <p className="text-gray-600">
                        You have a scheduled pickup for <span className="font-semibold">Plastic Waste</span> on 
                        <span className="font-semibold"> July 8, 2023 at 2:00 PM</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow p-8 text-center">
                <div className="max-w-md mx-auto">
                  <div className="bg-green-100 p-4 rounded-full inline-block">
                    <FaCheck className="text-green-600 text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mt-4">No Active Pickups</h3>
                  <p className="text-gray-600 mt-2">
                    You don't have any scheduled waste pickups at the moment. 
                    Schedule a new pickup to get started!
                  </p>
                  <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 mx-auto">
                    <FaTrash /> Schedule New Pickup
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'history' && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Booking History</h2>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {user.bookings
                    .filter(booking => booking.status === 'Completed')
                    .map((booking) => (
                      <tr key={booking.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{booking.date}</div>
                          <div className="text-gray-400">{booking.time}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            {getWasteIcon(booking.wasteType)}
                            <span className="ml-2">{booking.wasteType}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(booking.status)}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{booking.team}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {booking.rating ? (
                            <div>
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <FaStar 
                                    key={star} 
                                    className={`text-sm ${
                                      star <= Math.round(booking.rating) 
                                        ? 'text-yellow-500' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                              <p className="text-xs text-gray-600 mt-1">{booking.feedback}</p>
                            </div>
                          ) : (
                            <button 
                              className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded"
                              onClick={() => {
                                setRating(booking.rating || 0);
                                setFeedback(booking.feedback || '');
                                document.getElementById('feedback-modal').classList.remove('hidden');
                              }}
                            >
                              Add Feedback
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Account Settings</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full border rounded-lg p-3 disabled:bg-gray-100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full border rounded-lg p-3 disabled:bg-gray-100"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="w-full border rounded-lg p-3 disabled:bg-gray-100"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm text-gray-600 mb-1">Address</label>
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          rows="3"
                          className="w-full border rounded-lg p-3 disabled:bg-gray-100"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">Pickup Preferences</h3>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Preferred Pickup Times</label>
                      <div className="flex gap-2 mb-2">
                        <input
                          type="text"
                          name="newTime"
                          value={formData.newTime || ''}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          placeholder="Add new time slot (e.g. 10:00 AM - 12:00 PM)"
                          className="flex-grow border rounded-lg p-3 disabled:bg-gray-100"
                        />
                        <button 
                          onClick={addPreferredTime}
                          disabled={!isEditing}
                          className={`px-4 py-3 rounded-lg ${
                            isEditing 
                              ? 'bg-green-600 text-white hover:bg-green-700' 
                              : 'bg-gray-200 text-gray-500'
                          }`}
                        >
                          Add
                        </button>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {formData.preferredTimes.map((time, index) => (
                          <div 
                            key={index} 
                            className="bg-gray-100 px-3 py-2 rounded-lg flex items-center"
                          >
                            <span>{time}</span>
                            {isEditing && (
                              <button 
                                onClick={() => removePreferredTime(index)}
                                className="ml-2 text-gray-500 hover:text-red-500"
                              >
                                <FaTimes />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 flex gap-3">
                  {isEditing ? (
                    <>
                      <button 
                        onClick={() => {
                          setIsEditing(false);
                          // Reset form to original user data
                          setFormData({
                            name: user.name,
                            address: user.address,
                            phone: user.phone,
                            email: user.email,
                            preferredTimes: [...user.preferredTimes]
                          });
                        }}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={saveAccountSettings}
                        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
                      >
                        Save Changes
                      </button>
                    </>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
                    >
                      Edit Information
                    </button>
                  )}
                </div>
              </div>
              
              <div>
                <div className="border rounded-xl p-5">
                  <div className="text-center">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 mx-auto"></div>
                    <h3 className="font-bold text-lg mt-3">{user.name}</h3>
                    <p className="text-gray-600">WasteWise User</p>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center">
                      <FaEnvelope className="text-gray-500 mr-3" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center">
                      <FaPhone className="text-gray-500 mr-3" />
                      <span>{user.phone}</span>
                    </div>
                    <div className="flex items-start">
                      <FaMapMarkerAlt className="text-gray-500 mr-3 mt-1" />
                      <span>{user.address}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-700 mb-2">Account Security</h4>
                    <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg">
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Feedback Modal */}
      <div id="feedback-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center hidden z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-md">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-bold">Submit Feedback</h3>
            <button 
              onClick={() => document.getElementById('feedback-modal').classList.add('hidden')}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="p-6">
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Your Rating</label>
              <div className="flex justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button 
                    key={star}
                    onClick={() => setRating(star)}
                    className="text-2xl mx-1 focus:outline-none"
                  >
                    <FaStar className={star <= rating ? 'text-yellow-500' : 'text-gray-300'} />
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-2">Your Feedback</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your experience..."
                rows="4"
                className="w-full border rounded-lg p-3"
              ></textarea>
            </div>
            
            <button 
              onClick={() => {
                submitFeedback(user.bookings[0].id);
                document.getElementById('feedback-modal').classList.add('hidden');
              }}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
            >
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white p-6 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p>© 2023 WasteWise. All rights reserved.</p>
          <p className="text-gray-400 text-sm mt-2">Making waste management simple and efficient</p>
        </div>
      </footer>
    </div>
  );
};

export default UserDashboard;