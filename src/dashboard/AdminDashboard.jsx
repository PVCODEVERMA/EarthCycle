import React, { useState, useEffect } from 'react';
import { 
  FaTachometerAlt, FaUsers, FaUserFriends, FaMapMarkedAlt, 
  FaClipboardList, FaChartBar, FaCog, FaSearch, 
  FaFilter, FaDownload, FaTrash, FaEdit, FaTimes, 
  FaCheck, FaPlus, FaBell, FaUserCircle, FaRegChartBar,
  FaMapMarkerAlt, FaPhone, FaEnvelope, FaHistory,
  FaMoneyBillWave, FaStar, FaRegClock
} from 'react-icons/fa';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    area: '',
    wasteType: '',
    status: '',
    date: ''
  });
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newTeam, setNewTeam] = useState({
    name: '',
    members: [],
    area: '',
    vehicle: ''
  });
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user'
  });
  const [showAddTeam, setShowAddTeam] = useState(false);
  const [showAddUser, setShowAddUser] = useState(false);
  const [activeChats, setActiveChats] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');

  // Sample data initialization
  useEffect(() => {
    // Mock users data
    const mockUsers = [
      { id: 1, name: 'Rajesh Kumar', email: 'rajesh@example.com', phone: '9876543210', role: 'user', status: 'active', joined: '2023-01-15' },
      { id: 2, name: 'Priya Sharma', email: 'priya@example.com', phone: '9876543211', role: 'user', status: 'active', joined: '2023-02-20' },
      { id: 3, name: 'Vikram Singh', email: 'vikram@example.com', phone: '9876543212', role: 'user', status: 'inactive', joined: '2023-03-10' },
      { id: 4, name: 'Arjun Patel', email: 'arjun@example.com', phone: '9876543213', role: 'admin', status: 'active', joined: '2022-11-05' },
      { id: 5, name: 'Sunil Kumar', email: 'sunil@example.com', phone: '9876543214', role: 'driver', status: 'active', joined: '2023-04-18' },
      { id: 6, name: 'Meena Sharma', email: 'meena@example.com', phone: '9876543215', role: 'operator', status: 'active', joined: '2023-05-22' },
    ];
    setUsers(mockUsers);

    // Mock teams data
    const mockTeams = [
      { id: 'T001', name: 'Lucknow Central Unit', members: ['Arjun Patel', 'Sunil Kumar'], area: 'Central Lucknow', vehicle: 'Truck-UP32-1234', status: 'active', tasksCompleted: 128 },
      { id: 'T002', name: 'Gomti Nagar Team', members: ['Rahul Verma', 'Suresh Yadav'], area: 'Gomti Nagar', vehicle: 'Van-UP32-5678', status: 'active', tasksCompleted: 95 },
      { id: 'T003', name: 'Alambagh Unit', members: ['Vikram Singh', 'Anil Sharma'], area: 'Alambagh', vehicle: 'Truck-UP32-9012', status: 'inactive', tasksCompleted: 72 },
    ];
    setTeams(mockTeams);

    // Mock bookings data
    const mockBookings = [
      { id: 'B001', userId: 1, userName: 'Rajesh Kumar', address: '123 Hazratganj, Lucknow', wasteType: 'E-Waste', quantity: '15 kg', date: '2023-06-15', time: '10:00 AM', status: 'Completed', team: 'T001', payment: 'Paid ₹300', rating: 4.5 },
      { id: 'B002', userId: 2, userName: 'Priya Sharma', address: '45 Gomti Nagar, Lucknow', wasteType: 'Organic', quantity: '20 kg', date: '2023-06-16', time: '11:00 AM', status: 'In Progress', team: 'T002', payment: 'Paid ₹150', rating: 4.2 },
      { id: 'B003', userId: 3, userName: 'Vikram Singh', address: '78 Alambagh, Lucknow', wasteType: 'Hazardous', quantity: '8 kg', date: '2023-06-17', time: '2:00 PM', status: 'Pending', team: null, payment: 'Pending', rating: null },
      { id: 'B004', userId: 1, userName: 'Rajesh Kumar', address: '89 Indira Nagar, Lucknow', wasteType: 'Plastic', quantity: '25 kg', date: '2023-06-18', time: '9:00 AM', status: 'Completed', team: 'T001', payment: 'Paid ₹200', rating: 4.8 },
      { id: 'B005', userId: 4, userName: 'Amit Patel', address: '22 Chinhat, Lucknow', wasteType: 'E-Waste', quantity: '12 kg', date: '2023-06-19', time: '3:00 PM', status: 'Completed', team: 'T003', payment: 'Paid ₹250', rating: 4.0 },
    ];
    setBookings(mockBookings);
    setFilteredBookings(mockBookings);
  }, []);

  // Filter bookings based on search and filters
  useEffect(() => {
    let result = bookings;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(booking => 
        booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply other filters
    if (filters.area) {
      result = result.filter(booking => booking.address.includes(filters.area));
    }
    if (filters.wasteType) {
      result = result.filter(booking => booking.wasteType === filters.wasteType);
    }
    if (filters.status) {
      result = result.filter(booking => booking.status === filters.status);
    }
    if (filters.date) {
      result = result.filter(booking => booking.date === filters.date);
    }
    
    setFilteredBookings(result);
  }, [searchTerm, filters, bookings]);

  // Data for charts
  const wasteData = [
    { name: 'E-Waste', quantity: 120 },
    { name: 'Organic', quantity: 85 },
    { name: 'Plastic', quantity: 75 },
    { name: 'Paper', quantity: 60 },
    { name: 'Hazardous', quantity: 45 },
    { name: 'Glass', quantity: 30 },
  ];
  
  const areaData = [
    { name: 'Hazratganj', pickups: 65 },
    { name: 'Gomti Nagar', pickups: 58 },
    { name: 'Alambagh', pickups: 42 },
    { name: 'Indira Nagar', pickups: 38 },
    { name: 'Chinhat', pickups: 25 },
  ];
  
  const teamPerformance = [
    { name: 'Lucknow Central', onTime: 92, rating: 4.5 },
    { name: 'Gomti Nagar Team', onTime: 87, rating: 4.2 },
    { name: 'Alambagh Unit', onTime: 78, rating: 4.0 },
  ];
  
  const revenueData = [
    { month: 'Jan', revenue: 125000 },
    { month: 'Feb', revenue: 142000 },
    { month: 'Mar', revenue: 138000 },
    { month: 'Apr', revenue: 156000 },
    { month: 'May', revenue: 162000 },
    { month: 'Jun', revenue: 148000 },
  ];

  // COLORS for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];

  // Toggle user status
  const toggleUserStatus = (userId) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } : user
    ));
  };

  // Add new team
  const handleAddTeam = () => {
    const newTeamObj = {
      id: `T00${teams.length + 1}`,
      name: newTeam.name,
      members: newTeam.members,
      area: newTeam.area,
      vehicle: newTeam.vehicle,
      status: 'active',
      tasksCompleted: 0
    };
    setTeams([...teams, newTeamObj]);
    setShowAddTeam(false);
    setNewTeam({ name: '', members: [], area: '', vehicle: '' });
  };

  // Add new user
  const handleAddUser = () => {
    const newUserObj = {
      id: users.length + 1,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      role: newUser.role,
      status: 'active',
      joined: new Date().toISOString().split('T')[0]
    };
    setUsers([...users, newUserObj]);
    setShowAddUser(false);
    setNewUser({ name: '', email: '', phone: '', role: 'user' });
  };

  // Assign team to booking
  const assignTeamToBooking = (bookingId, teamId) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId ? { ...booking, team: teamId, status: 'Assigned' } : booking
    ));
  };

  // Start chat
  const startChat = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!activeChats.some(chat => chat.userId === userId)) {
      setActiveChats([...activeChats, { userId, userName: user.name, messages: [] }]);
    }
    setSelectedChat(userId);
  };

  // Send message
  const sendMessage = () => {
    if (!message.trim() || !selectedChat) return;
    
    const updatedChats = activeChats.map(chat => {
      if (chat.userId === selectedChat) {
        return {
          ...chat,
          messages: [
            ...chat.messages,
            { id: chat.messages.length + 1, text: message, sender: 'admin', time: new Date().toLocaleTimeString() }
          ]
        };
      }
      return chat;
    });
    
    setActiveChats(updatedChats);
    setMessage('');
  };

  // Render the appropriate section based on active tab
  const renderActiveSection = () => {
    switch (activeTab) {
      case 'users':
        return <UserManagementSection />;
      case 'teams':
        return <TeamManagementSection />;
      case 'live':
        return <LiveMonitoringSection />;
      case 'bookings':
        return <BookingOverviewSection />;
      case 'reports':
        return <ReportsAnalyticsSection />;
      default:
        return <DashboardHome />;
    }
  };

  // Dashboard Home Component
  const DashboardHome = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="p-3 bg-blue-100 rounded-lg mr-4">
            <FaUsers className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Users</h3>
            <p className="text-2xl font-bold">1,248</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="p-3 bg-green-100 rounded-lg mr-4">
            <FaClipboardList className="text-green-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Total Bookings</h3>
            <p className="text-2xl font-bold">568</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="p-3 bg-purple-100 rounded-lg mr-4">
            <FaCheck className="text-purple-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Completed Tasks</h3>
            <p className="text-2xl font-bold">432</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow p-6 flex items-center">
          <div className="p-3 bg-yellow-100 rounded-lg mr-4">
            <FaUserFriends className="text-yellow-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-gray-500 text-sm">Active Teams</h3>
            <p className="text-2xl font-bold">12</p>
          </div>
        </div>
      </div>
      
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Waste Types Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Waste Types Distribution</h3>
          <div className="h-80">
            <PieChart width={400} height={400}>
              <Pie
                data={wasteData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="quantity"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {wasteData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>
        
        {/* Area-wise Pickups Chart */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Area-wise Pickups</h3>
          <div className="h-80">
            <BarChart
              width={500}
              height={300}
              data={areaData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="pickups" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-lg">Recent Activity</h3>
          <button className="text-sm text-blue-600 hover:underline">View All</button>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-start p-3 border-b">
            <div className="bg-green-100 p-2 rounded-full mr-3">
              <FaCheck className="text-green-600" />
            </div>
            <div>
              <p>Team <span className="font-semibold">Lucknow Central</span> completed pickup at <span className="font-semibold">Rajesh Kumar's</span> location</p>
              <p className="text-sm text-gray-500 mt-1">Today, 11:30 AM</p>
            </div>
          </div>
          
          <div className="flex items-start p-3 border-b">
            <div className="bg-blue-100 p-2 rounded-full mr-3">
              <FaPlus className="text-blue-600" />
            </div>
            <div>
              <p>New booking from <span className="font-semibold">Vikram Singh</span> for E-Waste pickup</p>
              <p className="text-sm text-gray-500 mt-1">Today, 10:15 AM</p>
            </div>
          </div>
          
          <div className="flex items-start p-3 border-b">
            <div className="bg-yellow-100 p-2 rounded-full mr-3">
              <FaRegClock className="text-yellow-600" />
            </div>
            <div>
              <p>Team <span className="font-semibold">Gomti Nagar</span> is running late for pickup at <span className="font-semibold">Priya Sharma's</span> location</p>
              <p className="text-sm text-gray-500 mt-1">Today, 9:45 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // User Management Section
  const UserManagementSection = () => (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">User Management</h2>
        <button 
          onClick={() => setShowAddUser(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <FaPlus /> Add New User
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map(user => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <FaUserCircle className="text-gray-400 text-xl" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 
                    user.role === 'driver' ? 'bg-blue-100 text-blue-800' : 
                    user.role === 'operator' ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-green-100 text-green-800'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => toggleUserStatus(user.id)}
                      className={`${
                        user.status === 'active' 
                          ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                          : 'bg-green-100 hover:bg-green-200 text-green-600'
                      } px-3 py-1 rounded-md text-sm`}
                    >
                      {user.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      onClick={() => startChat(user.id)}
                      className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-md text-sm flex items-center"
                    >
                      <FaEnvelope className="mr-1" /> Chat
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-3 py-1 rounded-md text-sm">
                      <FaEdit />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Team Management Section
  const TeamManagementSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Team Management</h2>
          <button 
            onClick={() => setShowAddTeam(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <FaPlus /> Add New Team
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <div 
              key={team.id} 
              className="border rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-lg">{team.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  team.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {team.status}
                </span>
              </div>
              
              <div className="mt-4 space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <FaUsers className="mr-2 text-gray-500" />
                  <span>{team.members.join(', ')}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <FaMapMarkerAlt className="mr-2 text-gray-500" />
                  <span>{team.area}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <FaTachometerAlt className="mr-2 text-gray-500" />
                  <span>{team.vehicle}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <FaCheck className="mr-2 text-gray-500" />
                  <span>Completed: {team.tasksCompleted} tasks</span>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <button 
                  onClick={() => setSelectedTeam(team)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  View Details
                </button>
                <div className="flex space-x-2">
                  <button className="text-gray-500 hover:text-gray-700">
                    <FaEdit />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Team Performance */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Team Performance</h3>
        <div className="h-80">
          <BarChart
            width={800}
            height={400}
            data={teamPerformance}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" domain={[0, 100]} />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="onTime" name="On Time %" fill="#8884d8" />
            <Bar yAxisId="right" dataKey="rating" name="Rating" fill="#82ca9d" />
          </BarChart>
        </div>
      </div>
    </div>
  );

  // Live Monitoring Section
  const LiveMonitoringSection = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">Live Team Monitoring</h2>
        
        <div className="h-96 rounded-xl overflow-hidden">
          <MapContainer center={[26.8467, 80.9462]} zoom={12} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {/* Team Markers */}
            <Marker position={[26.8409, 80.9462]}>
              <Popup>
                <div className="font-bold">Lucknow Central Unit</div>
                <div>Status: Active</div>
                <div>Current Task: Pickup at Rajesh Kumar</div>
                <div className="mt-2 text-sm">
                  <button className="bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded text-sm">
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
            
            <Marker position={[26.8559, 81.0073]}>
              <Popup>
                <div className="font-bold">Gomti Nagar Team</div>
                <div>Status: Active</div>
                <div>Current Task: Pickup at Priya Sharma</div>
                <div className="mt-2 text-sm">
                  <button className="bg-blue-100 hover:bg-blue-200 px-2 py-1 rounded text-sm">
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
            
            <Marker position={[26.8738, 81.0049]}>
              <Popup>
                <div className="font-bold">Indira Nagar Unit</div>
                <div>Status: Inactive</div>
                <div>Last Task: Completed 2 hours ago</div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Active Team</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm">Moving Vehicle</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-500 rounded-full mr-2"></div>
            <span className="text-sm">Inactive Team</span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Tasks */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Active Tasks</h3>
          
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Rajesh Kumar - E-Waste Pickup</h4>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">In Progress</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">123 Hazratganj, Lucknow</p>
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <FaUserFriends className="mr-2" />
                <span>Team: Lucknow Central Unit</span>
              </div>
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '65%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Estimated completion: 15 min</div>
              </div>
            </div>
            
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">Priya Sharma - Organic Waste Pickup</h4>
                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">In Progress</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">45 Gomti Nagar, Lucknow</p>
              <div className="flex items-center text-sm text-gray-600 mt-2">
                <FaUserFriends className="mr-2" />
                <span>Team: Gomti Nagar Team</span>
              </div>
              <div className="mt-3">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: '40%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Estimated completion: 30 min</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Team Status */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Team Status</h3>
          
          <div className="space-y-3">
            {teams.map(team => (
              <div key={team.id} className="flex items-center justify-between p-3 border-b">
                <div>
                  <h4 className="font-medium">{team.name}</h4>
                  <p className="text-sm text-gray-600">{team.area}</p>
                </div>
                <div className="flex items-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${
                    team.status === 'active' ? 'bg-green-500' : 'bg-gray-400'
                  }`}></span>
                  <span className="text-sm">{team.status === 'active' ? 'Active' : 'Inactive'}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <h4 className="font-medium mb-3">Send Broadcast Message</h4>
            <div className="flex">
              <input 
                type="text" 
                placeholder="Type message for all teams..."
                className="flex-grow border rounded-l-lg p-2 focus:outline-none"
              />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-lg">Send</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Booking Overview Section
  const BookingOverviewSection = () => (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <h2 className="text-xl font-bold">Booking Management</h2>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search bookings..."
              className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <FaDownload /> Export
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
          <select 
            className="w-full border rounded-lg p-2"
            value={filters.area}
            onChange={(e) => setFilters({...filters, area: e.target.value})}
          >
            <option value="">All Areas</option>
            <option>Hazratganj</option>
            <option>Gomti Nagar</option>
            <option>Alambagh</option>
            <option>Indira Nagar</option>
            <option>Chinhat</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
          <select 
            className="w-full border rounded-lg p-2"
            value={filters.wasteType}
            onChange={(e) => setFilters({...filters, wasteType: e.target.value})}
          >
            <option value="">All Types</option>
            <option>E-Waste</option>
            <option>Organic</option>
            <option>Plastic</option>
            <option>Paper</option>
            <option>Hazardous</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select 
            className="w-full border rounded-lg p-2"
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="">All Status</option>
            <option>Pending</option>
            <option>Assigned</option>
            <option>In Progress</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="date"
            className="w-full border rounded-lg p-2"
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
          />
        </div>
        
        <div className="flex items-end">
          <button 
            onClick={() => setFilters({ area: '', wasteType: '', status: '', date: '' })}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
          >
            Clear Filters
          </button>
        </div>
      </div>
      
      {/* Bookings Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waste Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.map(booking => (
              <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.userName}</td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">{booking.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.wasteType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{booking.date}</div>
                  <div className="text-gray-400">{booking.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    booking.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    booking.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                    booking.status === 'Pending' ? 'bg-gray-100 text-gray-800' : 
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {booking.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.status === 'Pending' ? (
                    <div className="flex space-x-2">
                      <select 
                        className="border rounded p-1 text-xs"
                        onChange={(e) => assignTeamToBooking(booking.id, e.target.value)}
                      >
                        <option value="">Assign Team</option>
                        {teams.map(team => (
                          <option key={team.id} value={team.id}>{team.name}</option>
                        ))}
                      </select>
                      <button className="text-red-500 hover:text-red-700">
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-600 px-2 py-1 rounded text-xs">
                      View Details
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Reports & Analytics Section
  const ReportsAnalyticsSection = () => (
    <div className="space-y-6">
      {/* Revenue Report */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Revenue Report (Last 6 Months)</h3>
        <div className="h-80">
          <BarChart
            width={800}
            height={400}
            data={revenueData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, 'Revenue']} />
            <Legend />
            <Bar dataKey="revenue" name="Revenue" fill="#8884d8" />
          </BarChart>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Waste Volume Trends */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Waste Volume Trends</h3>
          <div className="h-80">
            <BarChart
              width={400}
              height={300}
              data={wasteData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="quantity" name="Quantity (kg)" fill="#8884d8" />
            </BarChart>
          </div>
        </div>
        
        {/* Customer Feedback */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg mb-4">Customer Feedback</h3>
          
          <div className="flex items-center justify-center mb-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-yellow-500">4.3</div>
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar 
                    key={star} 
                    className={`text-xl ${star <= 4 ? 'text-yellow-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <div className="text-gray-600 mt-1">Average Rating</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span>5 stars</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span>4 stars</span>
                <span>20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span>3 stars</span>
                <span>10%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span>2 stars</span>
                <span>3%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '3%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span>1 star</span>
                <span>2%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '2%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Export Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold text-lg mb-4">Data Export</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4 text-center">
            <div className="bg-blue-100 p-3 rounded-full inline-block mb-3">
              <FaClipboardList className="text-blue-600 text-2xl" />
            </div>
            <h4 className="font-medium mb-1">Export Bookings</h4>
            <p className="text-sm text-gray-600 mb-3">Download all booking data in Excel or PDF format</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center">
              <FaDownload /> Export Data
            </button>
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <div className="bg-green-100 p-3 rounded-full inline-block mb-3">
              <FaUsers className="text-green-600 text-2xl" />
            </div>
            <h4 className="font-medium mb-1">Export Users</h4>
            <p className="text-sm text-gray-600 mb-3">Download user information and activity reports</p>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center">
              <FaDownload /> Export Data
            </button>
          </div>
          
          <div className="border rounded-lg p-4 text-center">
            <div className="bg-purple-100 p-3 rounded-full inline-block mb-3">
              <FaChartBar className="text-purple-600 text-2xl" />
            </div>
            <h4 className="font-medium mb-1">Financial Reports</h4>
            <p className="text-sm text-gray-600 mb-3">Download revenue and financial statements</p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 justify-center">
              <FaDownload /> Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Chat Support Modal
  const ChatSupportModal = () => {
    if (!selectedChat) return null;
    
    const chat = activeChats.find(c => c.userId === selectedChat);
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl w-full max-w-md">
          <div className="p-4 border-b flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gray-200 w-10 h-10 rounded-full mr-3"></div>
              <div>
                <div className="font-bold">{chat.userName}</div>
                <div className="text-xs text-gray-500">Online</div>
              </div>
            </div>
            <button 
              onClick={() => setSelectedChat(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="p-4 h-80 overflow-y-auto">
            {chat.messages.map(msg => (
              <div 
                key={msg.id} 
                className={`mb-4 ${msg.sender === 'admin' ? 'text-right' : ''}`}
              >
                <div className={`inline-block p-3 rounded-2xl max-w-xs ${
                  msg.sender === 'admin' 
                    ? 'bg-blue-100 text-gray-800' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {msg.sender === 'admin' ? 'You' : chat.userName} • {msg.time}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow p-2 border rounded-l-lg focus:outline-none"
              onKeyPress={e => e.key === 'Enter' && sendMessage()}
            />
            <button 
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Add Team Modal
  const AddTeamModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold">Add New Team</h3>
          <button 
            onClick={() => setShowAddTeam(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Team Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={newTeam.name}
              onChange={(e) => setNewTeam({...newTeam, name: e.target.value})}
              placeholder="Enter team name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Members</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={newTeam.members.join(', ')}
              onChange={(e) => setNewTeam({...newTeam, members: e.target.value.split(', ')})}
              placeholder="Enter member names separated by commas"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={newTeam.area}
              onChange={(e) => setNewTeam({...newTeam, area: e.target.value})}
              placeholder="Enter service area"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={newTeam.vehicle}
              onChange={(e) => setNewTeam({...newTeam, vehicle: e.target.value})}
              placeholder="Enter vehicle details"
            />
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end">
          <button 
            onClick={() => setShowAddTeam(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button 
            onClick={handleAddTeam}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Add Team
          </button>
        </div>
      </div>
    </div>
  );

  // Add User Modal
  const AddUserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-bold">Add New User</h3>
          <button 
            onClick={() => setShowAddUser(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={newUser.name}
              onChange={(e) => setNewUser({...newUser, name: e.target.value})}
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-lg p-2"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              placeholder="Enter email address"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              className="w-full border rounded-lg p-2"
              value={newUser.phone}
              onChange={(e) => setNewUser({...newUser, phone: e.target.value})}
              placeholder="Enter phone number"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select 
              className="w-full border rounded-lg p-2"
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="driver">Driver</option>
              <option value="operator">Operator</option>
            </select>
          </div>
        </div>
        
        <div className="p-4 border-t flex justify-end">
          <button 
            onClick={() => setShowAddUser(false)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2"
          >
            Cancel
          </button>
          <button 
            onClick={handleAddUser}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Add User
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="bg-green-600 text-white p-2 rounded-lg">
                <FaTachometerAlt className="text-xl" />
              </div>
              <span className="ml-3 text-xl font-bold">Admin</span>
            </div>
            
            <div className="flex items-center">
              <div className="relative mr-4">
                <button className="bg-gray-100 p-2 rounded-full relative">
                  <FaBell className="text-gray-600" />
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </button>
              </div>
              <div className="flex items-center">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-10 h-10" />
                <div className="ml-3">
                  <div className="text-sm font-medium text-gray-800">Admin User</div>
                  <div className="text-xs text-gray-500">admin@wastewise.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow p-4">
              <nav className="space-y-1">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: FaTachometerAlt },
                  { id: 'users', label: 'User Management', icon: FaUsers },
                  { id: 'teams', label: 'Team Management', icon: FaUserFriends },
                  { id: 'live', label: 'Live Monitoring', icon: FaMapMarkedAlt },
                  { id: 'bookings', label: 'Booking Overview', icon: FaClipboardList },
                  { id: 'reports', label: 'Reports & Analytics', icon: FaChartBar },
                  { id: 'settings', label: 'Settings', icon: FaCog }
                ].map((item) => (
                  <button
                    key={item.id}
                    className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <item.icon className="mr-3 text-lg" />
                    {item.label}
                  </button>
                ))}
              </nav>
              
              {/* Active Chats */}
              <div className="mt-8">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-4 mb-2">
                  Active Chats
                </h3>
                <div className="space-y-2">
                  {activeChats.map(chat => (
                    <button
                      key={chat.userId}
                      className={`w-full flex items-center px-4 py-2 text-sm rounded-lg ${
                        selectedChat === chat.userId
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                      onClick={() => setSelectedChat(chat.userId)}
                    >
                      <div className="bg-gray-200 border-2 border-dashed rounded-full w-6 h-6 mr-3"></div>
                      <span className="truncate">{chat.userName}</span>
                      {chat.messages.length > 0 && (
                        <span className="ml-auto bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {chat.messages.length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            {renderActiveSection()}
          </div>
        </div>
      </div>
      
      {/* Modals */}
      {showAddTeam && <AddTeamModal />}
      {showAddUser && <AddUserModal />}
      {selectedChat && <ChatSupportModal />}
    </div>
  );
};

export default AdminDashboard;