// LiveTracking.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Truck } from 'lucide-react';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom truck icon
const truckIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/2838/2838694.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
});

const LiveTracking = () => {
  const [truckPosition, setTruckPosition] = useState([26.8608, 80.9123]);
  const [driverInfo] = useState({
    name: 'Rajesh Kumar',
    phone: '+91 9000012345',
    eta: '15 minutes'
  });

  // Simulate truck movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTruckPosition(prev => [
        prev[0] + (Math.random() * 0.001 - 0.0005),
        prev[1] + (Math.random() * 0.001 - 0.0005)
      ]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-green-50 p-4 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
        <Truck className="text-blue-600" /> Live Tracking
      </h2>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="bg-white p-3 rounded-lg shadow">
          <p className="font-medium">Driver</p>
          <p>{driverInfo.name}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow">
          <p className="font-medium">Contact</p>
          <p>{driverInfo.phone}</p>
        </div>
        <div className="bg-white p-3 rounded-lg shadow">
          <p className="font-medium">ETA</p>
          <p className="text-green-600 font-bold">{driverInfo.eta}</p>
        </div>
      </div>
      
      <div className="w-full h-80 rounded-md overflow-hidden relative">
        <MapContainer 
          center={[26.8608, 80.9123]} 
          zoom={15} 
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={truckPosition} icon={truckIcon}>
            <Popup>
              Waste Collection Truck <br />
              Driver: Rajesh Kumar
            </Popup>
          </Marker>
        </MapContainer>
        
        {/* 3D Animation Container */}
        <div className="absolute bottom-4 right-4 bg-white bg-opacity-80 p-3 rounded-lg shadow-lg">
          <div className="w-32 h-16 flex items-center justify-center">
            <div className="animate-bounce">
              <div className="relative">
                {/* Simple 3D truck visualization */}
                <div className="w-24 h-8 bg-blue-600 rounded"></div>
                <div className="w-10 h-6 bg-blue-700 absolute -top-6 left-2 rounded-t-lg"></div>
                <div className="w-4 h-4 bg-black rounded-full absolute -bottom-2 left-4"></div>
                <div className="w-4 h-4 bg-black rounded-full absolute -bottom-2 left-16"></div>
              </div>
            </div>
          </div>
          <p className="text-xs text-center mt-1">Live Movement</p>
        </div>
      </div>
      
      <div className="mt-4 bg-yellow-50 p-3 rounded-lg border border-yellow-200">
        <p className="text-sm flex items-center gap-2">
          <span className="text-yellow-600 font-medium">Note:</span> 
          Your waste collection truck is currently near Lekhraj Market. Please keep your e-waste ready.
        </p>
      </div>
    </div>
  );
};

export default LiveTracking;