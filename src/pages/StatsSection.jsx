"use client";
import React, { useEffect } from 'react';
import { MapPinIcon, EnvelopeIcon, PhoneIcon, HomeIcon } from '@heroicons/react/24/solid';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-toastify';
import image from '../../src/assets/baground_img/images_2.png'

// Truck icon configuration
const truckIcon = new L.Icon({
  iconUrl: image,
  iconSize: [40, 40], // Increased size for better mobile visibility
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'truck-icon'
});

// Truck locations data
const truckLocations = [
   { lat: 26.8467, lng: 80.9462, label: 'Hazratganj - Truck 1' },
  { lat: 26.8881, lng: 80.9650, label: 'Indira Nagar - Truck 2' },
  { lat: 26.8124, lng: 80.9020, label: 'Alambagh - Truck 3' },
  { lat: 26.8322, lng: 80.9873, label: 'Chinhat - Truck 4' },
  { lat: 26.8586, lng: 80.9065, label: 'Aminabad - Truck 5' },
  { lat: 26.8900, lng: 80.9250, label: 'Jankipuram - Truck 6' },
  { lat: 26.8200, lng: 80.9655, label: 'Ashiyana - Truck 7' },
  { lat: 26.8700, lng: 80.9850, label: 'Faizabad Road - Truck 8' },
  { lat: 26.8500, lng: 80.9865, label: 'Vikas Nagar - Truck 9' },
  { lat: 26.8000, lng: 80.9400, label: 'Krishna Nagar - Truck 10' },
  { lat: 26.8600, lng: 80.9650, label: 'Telibagh - Truck 11' },
  { lat: 26.8450, lng: 80.9260, label: 'Rajajipuram - Truck 12' },
  { lat: 26.8300, lng: 80.9960, label: 'Gomti Nagar - Truck 13' },
  { lat: 26.8700, lng: 80.9430, label: 'Chowk - Truck 14' },
  { lat: 26.8150, lng: 80.9870, label: 'Cantonment - Truck 15' },
  { lat: 26.8500, lng: 80.9150, label: 'Naka Hindola - Truck 16' },
  { lat: 26.8700, lng: 80.9130, label: 'Aliganj - Truck 17' },
  { lat: 26.8100, lng: 80.9280, label: 'Charbagh - Truck 18' },
  { lat: 26.8950, lng: 80.9500, label: 'Sitapur Road - Truck 19' },
  { lat: 26.8350, lng: 80.9750, label: 'Kapoor Thala - Truck 20' },
];

// Animated Marker Component
const AnimatedMarker = ({ position, label }) => {
  const markerRef = React.useRef();
  const map = useMap();

  useEffect(() => {
    if (markerRef.current) {
      markerRef.current._icon.classList.add('leaflet-marker-bounce');
      // Auto-close popup on mobile
      markerRef.current.on('click', () => {
        if (window.innerWidth < 768) {
          setTimeout(() => markerRef.current.closePopup(), 3000);
        }
      });
    }
  }, [map]);

  return (
    <Marker position={position} icon={truckIcon} ref={markerRef}>
      <Popup className="text-sm md:text-base">{label}</Popup>
    </Marker>
  );
};

// Main Component
const ContactMapSection = () => {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Request submitted successfully!');
    e.target.reset();
  };

  return (
    <div className="relative w-full h-[80vh] md:h-screen">
      
      {/* Leaflet Map Container */}
      <MapContainer 
        center={[26.8467, 80.9462]} 
        zoom={12}
        className="w-full h-full grayscale-[80%] brightness-90 contrast-125 z-0  "
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {truckLocations.map((truck, i) => (
          <AnimatedMarker key={i} position={[truck.lat, truck.lng]} label={truck.label} />
        ))}
      </MapContainer>

      {/* Mobile View Components */}
      <div className="md:hidden">
        {/* Mobile Contact Form */}
        <div className="absolute top-0 left-0 right-0 bg-white/95 p-4 shadow-lg z-20">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Schedule Pickup</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid gap-3">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-2 border rounded-lg focus:ring-2 ring-green-500 outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full p-2 border rounded-lg focus:ring-2 ring-green-500 outline-none"
                required
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-2 border rounded-lg focus:ring-2 ring-green-500 outline-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Request Pickup
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Contact Info */}
        <div className="absolute bottom-0 left-0 right-0 bg-green-700/95 text-white p-4 z-20">
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex items-center gap-2">
              <HomeIcon className="w-5 h-5 text-yellow-300" />
              <span>Hazratganj, Lucknow, UP</span>
            </div>
            <a href="mailto:support@ecowaste.com" className="flex items-center gap-2">
              <EnvelopeIcon className="w-5 h-5 text-yellow-300" />
              <span>support@ecowaste.com</span>
            </a>
            <a href="tel:+919129787343" className="flex items-center gap-2">
              <PhoneIcon className="w-5 h-5 text-yellow-300" />
              <span>+91 912 978 7343</span>
            </a>
          </div>
        </div>
      </div>

      {/* Desktop View Components */}
      <div className="hidden md:block">
        {/* Desktop Contact Card */}
        <div className="absolute left-8 bottom-8 bg-white/90 p-6 rounded-xl shadow-xl max-w-md z-20 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Contact Us</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start gap-3">
              <MapPinIcon className="w-6 h-6 text-green-600 mt-1" />
              <div>
                <p className="font-semibold">Registered Office</p>
                <p>Hazratganj, Lucknow</p>
                <p>Uttar Pradesh, India</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <EnvelopeIcon className="w-6 h-6 text-green-600" />
              <a href="mailto:support@ecowaste.com" className="hover:text-green-700">
                support@ecowaste.com
              </a>
            </div>
            <div className="flex items-center gap-3">
              <PhoneIcon className="w-6 h-6 text-green-600" />
              <a href="tel:+919129787343" className="hover:text-green-700">
                +91 912 978 7343
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Contact Form */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/90 p-8 rounded-xl shadow-2xl w-[420px] z-20 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Request Service</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder='Enter your full name'
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder='Enter your email address'
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-green-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder='Enter your phone number'
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-green-500 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Schedule Pickup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactMapSection;