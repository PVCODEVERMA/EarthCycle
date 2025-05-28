import React, { useState, useEffect, useRef } from 'react';
import { 
  FaTruck, FaMapMarkerAlt, FaCheck, FaClock, FaUsers, 
  FaRecycle, FaExclamationTriangle, FaLeaf, FaTrash, 
  FaSync, FaMapMarkedAlt, FaClipboardList, FaComment, FaPhone
} from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const truckIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/167/167755.png',
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

const wasteIcons = {
  'E-Waste': new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/2972/2972035.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  }),
  'Organic': new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1883/1883630.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  }),
  'Hazardous': new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1883/1883602.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  }),
  'General': new L.Icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/1883/1883677.png',
    iconSize: [30, 30],
    iconAnchor: [15, 30]
  })
};

const TeamDashboard = () => {
  // Sample data for Lucknow
  const [assignedTasks, setAssignedTasks] = useState([
    {
      id: 'T001',
      userId: 'U101',
      userName: 'Rajesh Kumar',
      pickupAddress: '123 Hazratganj, Lucknow',
      wasteCategory: 'E-Waste',
      pickupTime: '10:00 AM - 12:00 PM',
      status: 'En Route',
      notes: 'Customer requested morning pickup',
      wasteItems: [
        { name: 'Laptops', quantity: 3 },
        { name: 'Mobile Phones', quantity: 8 }
      ],
      position: [26.8409, 80.9462]
    },
    {
      id: 'T002',
      userId: 'U102',
      userName: 'Priya Sharma',
      pickupAddress: '45 Gomti Nagar, Lucknow',
      wasteCategory: 'Organic',
      pickupTime: '1:00 PM - 3:00 PM',
      status: 'Pending',
      notes: 'Backyard entrance',
      wasteItems: [
        { name: 'Food Waste', quantity: 15 },
        { name: 'Garden Waste', quantity: 8 }
      ],
      position: [26.8559, 81.0073]
    },
    {
      id: 'T003',
      userId: 'U103',
      userName: 'Vikram Singh',
      pickupAddress: '78 Alambagh, Lucknow',
      wasteCategory: 'Hazardous',
      pickupTime: '3:30 PM - 4:30 PM',
      status: 'Pending',
      notes: 'Use back gate - main gate under repair',
      wasteItems: [
        { name: 'Batteries', quantity: 12 },
        { name: 'Paint Cans', quantity: 5 }
      ],
      position: [26.7991, 80.8991]
    },
    {
      id: 'T004',
      userId: 'U104',
      userName: 'Amit Patel',
      pickupAddress: '22 Indira Nagar, Lucknow',
      wasteCategory: 'General',
      pickupTime: '9:00 AM - 10:00 AM',
      status: 'Completed',
      notes: 'Already packed near gate',
      wasteItems: [
        { name: 'Plastic', quantity: 20 },
        { name: 'Paper', quantity: 15 }
      ],
      position: [26.8738, 81.0049]
    },
    {
      id: 'T005',
      userId: 'U105',
      userName: 'Sunita Devi',
      pickupAddress: '56 Chinhat, Lucknow',
      wasteCategory: 'Organic',
      pickupTime: '11:00 AM - 1:00 PM',
      status: 'En Route',
      notes: 'Call before arrival',
      wasteItems: [
        { name: 'Food Waste', quantity: 10 },
        { name: 'Garden Waste', quantity: 5 }
      ],
      position: [26.8975, 81.0022]
    }
  ]);

  const [teamMembers] = useState([
    { id: 'TM01', name: 'Arjun Patel', role: 'Driver', contact: '9876543210' },
    { id: 'TM02', name: 'Sunil Kumar', role: 'Collector', contact: '9876543211' },
    { id: 'TM03', name: 'Meena Sharma', role: 'Operator', contact: '9876543212' }
  ]);

  const [currentLocation, setCurrentLocation] = useState({
    lat: 26.8467,
    lng: 80.9462,
    address: 'Central Warehouse, Lucknow'
  });

  const [selectedTask, setSelectedTask] = useState(null);
  const [notes, setNotes] = useState('');
  const [isSharingLocation, setIsSharingLocation] = useState(false);
  const [chatActive, setChatActive] = useState(false);
  const [activeChatMember, setActiveChatMember] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [trafficView, setTrafficView] = useState(false);
  const mapRef = useRef(null);

  // Update task status
  const updateStatus = (taskId, newStatus) => {
    const updatedTasks = assignedTasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setAssignedTasks(updatedTasks);
    
    const task = assignedTasks.find(t => t.id === taskId);
    toast.success(`Status updated to "${newStatus}" for ${task.userName}'s pickup`);
  };

  // Add notes to a task
  const addNotes = (taskId) => {
    if (!notes.trim()) return;
    
    const updatedTasks = assignedTasks.map(task => 
      task.id === taskId ? { ...task, notes } : task
    );
    setAssignedTasks(updatedTasks);
    setNotes('');
    toast.info(`Notes added to task ${taskId}`);
  };

  // Share location
  const shareLocation = () => {
    const newStatus = !isSharingLocation;
    setIsSharingLocation(newStatus);
    toast.info(newStatus 
      ? 'Sharing real-time location with admin and customers' 
      : 'Location sharing stopped');
  };

  // Get waste category icon
  const getWasteIcon = (category) => {
    switch(category) {
      case 'E-Waste': return <FaRecycle className="text-blue-500" />;
      case 'Organic': return <FaLeaf className="text-green-500" />;
      case 'Hazardous': return <FaExclamationTriangle className="text-red-500" />;
      default: return <FaTrash className="text-gray-500" />;
    }
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch(status) {
      case 'En Route': 
        return <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">En Route</span>;
      case 'Collected': 
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Collected</span>;
      case 'Completed': 
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">Completed</span>;
      default: 
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">Pending</span>;
    }
  };

  // Get waste category badge
  const getWasteBadge = (category) => {
    switch(category) {
      case 'E-Waste': 
        return <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <FaRecycle /> E-Waste
        </span>;
      case 'Organic': 
        return <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <FaLeaf /> Organic
        </span>;
      case 'Hazardous': 
        return <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <FaExclamationTriangle /> Hazardous
        </span>;
      default: 
        return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <FaTrash /> General
        </span>;
    }
  };

  // Center map on task
  const centerMapOnTask = (task) => {
    if (mapRef.current && task.position) {
      mapRef.current.flyTo(task.position, 15);
    }
  };

  // Open chat with team member
  const openChat = (member) => {
    setActiveChatMember(member);
    setChatActive(true);
    setMessages([
      { id: 1, sender: member.id, text: `Hi, this is ${member.name}. How can I help?` },
      { id: 2, sender: 'me', text: 'Please check the route for the next pickup' }
    ]);
  };

  // Send message
  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const message = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
  };

  // Initialize with first task selected
  useEffect(() => {
    if (assignedTasks.length > 0 && !selectedTask) {
      setSelectedTask(assignedTasks[0]);
    }
  }, [assignedTasks, selectedTask]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                <FaTruck className="text-green-600" /> Field Operations Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Team ID: FT-2023-LKO | Team Name: Lucknow Central Unit</p>
            </div>
            <button 
              onClick={shareLocation}
              className={`${
                isSharingLocation 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}
            >
              <FaMapMarkerAlt /> 
              {isSharingLocation ? 'Stop Sharing' : 'Share Live Location'}
            </button>
          </div>
          
          <div className="mt-4 p-4 bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 text-gray-600">
              <FaMapMarkedAlt className="text-green-500" />
              <span>Current Location: {currentLocation.address}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map and Team Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Section */}
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-red-500" /> Navigation Map
                </h2>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setTrafficView(false)}
                    className={`text-xs px-3 py-1 rounded-lg ${
                      !trafficView 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Optimal Route
                  </button>
                  <button 
                    onClick={() => setTrafficView(true)}
                    className={`text-xs px-3 py-1 rounded-lg ${
                      trafficView 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    Traffic View
                  </button>
                </div>
              </div>
              
              {/* Map */}
              <div className="relative h-80 bg-gray-100 rounded-xl overflow-hidden">
                <MapContainer 
                  center={[26.8467, 80.9462]} 
                  zoom={13} 
                  style={{ height: '100%', width: '100%' }}
                  whenCreated={map => mapRef.current = map}
                >
                  <TileLayer
                    url={trafficView 
                      ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" 
                      : "https://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey=YOUR_API_KEY"
                    }
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  
                  {/* Current Location Marker */}
                  <Marker 
                    position={[currentLocation.lat, currentLocation.lng]} 
                    icon={truckIcon}
                  >
                    <Popup>
                      <div className="font-bold">Your Truck</div>
                      <div>Status: {isSharingLocation ? 'Live Sharing' : 'Online'}</div>
                    </Popup>
                  </Marker>
                  
                  {/* Task Markers */}
                  {assignedTasks.map(task => (
                    <Marker 
                      key={task.id} 
                      position={task.position} 
                      icon={wasteIcons[task.wasteCategory] || wasteIcons.General}
                      eventHandlers={{
                        click: () => {
                          setSelectedTask(task);
                          centerMapOnTask(task);
                        }
                      }}
                    >
                      <Popup>
                        <div className="font-bold">{task.userName}</div>
                        <div>{task.pickupAddress}</div>
                        <div className="text-sm mt-1">{task.wasteCategory}</div>
                        <button 
                          className="mt-2 text-xs bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded"
                          onClick={() => centerMapOnTask(task)}
                        >
                          Center Map
                        </button>
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
                
                <div className="absolute bottom-4 left-4 bg-white p-2 rounded-lg shadow-md z-[1000]">
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Current Position</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Pending Pickups</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member Info */}
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <FaUsers className="text-blue-500" /> Team Members
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {teamMembers.map(member => (
                  <div key={member.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                      <div  />
                      <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZR6Gs7vDfFNNMsCAc2pNG0LaG3xAgnZDapQ&s" className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" alt="" />
                      <div>
                        <h3 className="font-semibold text-gray-800">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                        <p className="text-sm text-blue-600 mt-1">{member.contact}</p>
                        <div className="mt-2 flex gap-2">
                          <button 
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
                            onClick={() => toast.info(`Calling ${member.name}...`)}
                          >
                            <FaPhone /> Call
                          </button>
                          <button 
                            className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded flex items-center gap-1"
                            onClick={() => openChat(member)}
                          >
                            <FaComment /> Chat
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Assigned Tasks */}
          <div className="space-y-6">
            {/* Task Summary Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FaClipboardList className="text-blue-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Assigned</p>
                    <p className="text-xl font-bold">{assignedTasks.length}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FaCheck className="text-green-600 text-xl" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Completed</p>
                    <p className="text-xl font-bold">
                      {assignedTasks.filter(t => t.status === 'Completed').length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Task List */}
            <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <FaTruck className="text-green-500" /> Assigned Pickups
                </h2>
                <span className="text-sm text-gray-500">
                  Today: {new Date().toLocaleDateString()}
                </span>
              </div>
              
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {assignedTasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedTask?.id === task.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                    onClick={() => {
                      setSelectedTask(task);
                      centerMapOnTask(task);
                    }}
                  >
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">{task.userName}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(task.status)}
                          {getWasteBadge(task.wasteCategory)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                          <FaClock className="text-yellow-500" /> {task.pickupTime}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Task #{task.id}</div>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-sm text-gray-600">
                      <div className="flex items-start">
                        <FaMapMarkerAlt className="text-red-400 mt-1 mr-2 flex-shrink-0" />
                        <span className="line-clamp-2">{task.pickupAddress}</span>
                      </div>
                      
                      {task.notes && (
                        <div className="mt-2 flex">
                          <FaClipboardList className="text-blue-400 mt-1 mr-2 flex-shrink-0" />
                          <span className="italic">"{task.notes}"</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Task Details */}
            {selectedTask && (
              <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">
                  Task Details: #{selectedTask.id}
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm text-gray-500">Customer Information</h3>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <div className="font-medium">{selectedTask.userName}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        <FaMapMarkerAlt className="inline mr-2 text-red-400" />
                        {selectedTask.pickupAddress}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Waste Details</h3>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        {getWasteBadge(selectedTask.wasteCategory)}
                      </div>
                      
                      <div className="mt-2">
                        <div className="text-sm font-medium text-gray-700">Items to Collect:</div>
                        <ul className="mt-1 space-y-1">
                          {selectedTask.wasteItems.map((item, index) => (
                            <li key={index} className="flex justify-between text-sm">
                              <span>{item.name}</span>
                              <span className="font-medium">{item.quantity} units</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Update Status</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <button 
                        onClick={() => updateStatus(selectedTask.id, 'En Route')}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          selectedTask.status === 'En Route' 
                            ? 'bg-yellow-500 text-white' 
                            : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                        }`}
                      >
                        On the Way
                      </button>
                      <button 
                        onClick={() => updateStatus(selectedTask.id, 'Collected')}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          selectedTask.status === 'Collected' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-green-100 text-green-800 hover:bg-green-200'
                        }`}
                      >
                        Collected
                      </button>
                      <button 
                        onClick={() => updateStatus(selectedTask.id, 'Completed')}
                        className={`px-3 py-2 rounded-lg text-sm ${
                          selectedTask.status === 'Completed' 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                      >
                        Completed
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm text-gray-500">Notes/Remarks</h3>
                    <div className="mt-1">
                      <textarea 
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add notes about this pickup..."
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        rows="3"
                      ></textarea>
                      <div className="mt-2 flex justify-end">
                        <button 
                          onClick={() => addNotes(selectedTask.id)}
                          className="bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-lg text-sm"
                        >
                          Add Notes
                        </button>
                      </div>
                      
                      {selectedTask.notes && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg text-sm">
                          <div className="font-medium">Existing Notes:</div>
                          <p className="mt-1 italic">"{selectedTask.notes}"</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Chat Modal */}
      {chatActive && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="p-4 border-b flex justify-between items-center">
              <div className="font-bold">
                Chat with {activeChatMember?.name}
              </div>
              <button 
                onClick={() => setChatActive(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4 h-80 overflow-y-auto">
              {messages.map(msg => (
                <div 
                  key={msg.id} 
                  className={`mb-4 ${msg.sender === 'me' ? 'text-right' : ''}`}
                >
                  <div className={`inline-block p-3 rounded-2xl max-w-xs ${
                    msg.sender === 'me' 
                      ? 'bg-blue-100 text-gray-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {msg.text}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {msg.sender === 'me' ? 'You' : activeChatMember?.name}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t flex">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-grow p-2 border rounded-l-lg focus:outline-none"
                onKeyPress={e => e.key === 'Enter' && sendMessage()}
              />
              <button 
                onClick={sendMessage}
                className="bg-green-600 text-white px-4 py-2 rounded-r-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
      
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  );
};

export default TeamDashboard;