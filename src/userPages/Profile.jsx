// Profile.jsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User, Mail, Home, Phone, Camera } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: 'Amit Kumar',
    address: 'Gomti Nagar, Lucknow',
    phoneNumber: '+91 9876543210',
    email: 'amit@example.com',
    profilePic: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, profilePic: e.target.files[0] }));
  };

  const handleUpdateProfile = () => {
    // You can later replace this with an actual API call
    toast.success('Profile updated successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/3">
          <div className="flex flex-col items-center">
            <div className="relative mb-3">
              <div className="w-24 h-24 rounded-full bg-gray-200 border-2 border-dashed flex items-center justify-center overflow-hidden">
                {formData.profilePic ? (
                  <img 
                    src={URL.createObjectURL(formData.profilePic)} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={40} className="text-gray-400" />
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer">
                <Camera size={20} className="text-blue-600" />
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept="image/*"
                />
              </label>
            </div>
            <h3 className="text-lg font-medium">{formData.name}</h3>
            <p className="text-sm text-gray-500">{formData.email}</p>
          </div>
        </div>
        
        <div className="md:w-2/3">
          <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
            <User size={20} /> Personal Information
          </h3>
          <form className="grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 border p-3 rounded-lg">
              <User className="text-gray-400" />
              <input 
                type="text" 
                name="name"
                placeholder="Full Name" 
                value={formData.name}
                onChange={handleChange}
                className="flex-1 outline-none"
              />
            </div>
            
            <div className="flex items-center gap-3 border p-3 rounded-lg">
              <Mail className="text-gray-400" />
              <input 
                type="email" 
                name="email"
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange}
                className="flex-1 outline-none"
              />
            </div>
            
            <div className="flex items-center gap-3 border p-3 rounded-lg">
              <Home className="text-gray-400" />
              <input 
                type="text" 
                name="address"
                placeholder="Address" 
                value={formData.address}
                onChange={handleChange}
                className="flex-1 outline-none"
              />
            </div>
            
            <div className="flex items-center gap-3 border p-3 rounded-lg">
              <Phone className="text-gray-400" />
              <input 
                type="tel" 
                name="phoneNumber"
                placeholder="Phone" 
                value={formData.phoneNumber}
                onChange={handleChange}
                className="flex-1 outline-none"
              />
            </div>

            <Button 
              type="button" 
              onClick={handleUpdateProfile} 
              className="mt-4 bg-green-600 hover:bg-green-700"
            >
              Update Profile
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
