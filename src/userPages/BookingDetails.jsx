// BookingDetails.jsx
import React from 'react';
import { 
  MapPin, User, Phone, Clock, Trash2, CheckCircle, 
  Calendar, Package, Hash, Info 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const dummyData = {
  bookingId: 'WM-2025-0628',
  name: 'Amit Kumar',
  address: 'Gomti Nagar, Lucknow',
  phoneNumber: '+91 9876543210',
  bookingStatus: 'In Progress',
  wasteType: 'Electronic',
  bookingDate: '2025-06-01',
  bookingTime: '10:30 AM',
  quantity: '15 kg',
  specialInstructions: 'Handle with care - contains lithium batteries'
};

const BookingDetails = () => (
  <Card className="border-l-4 border-green-500">
    <CardContent className="p-4 space-y-3">
      <h2 className="text-xl font-semibold flex items-center gap-2 mb-3">
        <Package className="text-green-600" /> Booking Details
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex items-center gap-2"><Hash className="text-gray-600" /> <span>ID: {dummyData.bookingId}</span></div>
        <div className="flex items-center gap-2"><CheckCircle className="text-green-500" /> <span>Status: {dummyData.bookingStatus}</span></div>
        <div className="flex items-center gap-2"><User className="text-green-600" /> <span>{dummyData.name}</span></div>
        <div className="flex items-center gap-2"><Phone className="text-yellow-600" /> <span>{dummyData.phoneNumber}</span></div>
        <div className="flex items-center gap-2"><MapPin className="text-blue-600" /> <span>{dummyData.address}</span></div>
        <div className="flex items-center gap-2"><Trash2 className="text-red-600" /> <span>Waste Type: {dummyData.wasteType}</span></div>
        <div className="flex items-center gap-2"><Calendar className="text-purple-600" /> <span>Date: {dummyData.bookingDate}</span></div>
        <div className="flex items-center gap-2"><Clock className="text-purple-600" /> <span>Time: {dummyData.bookingTime}</span></div>
        <div className="flex items-center gap-2"><Package className="text-orange-600" /> <span>Quantity: {dummyData.quantity}</span></div>
      </div>
      
      <div className="mt-4 pt-3 border-t">
        <div className="flex items-start gap-2"><Info className="text-blue-600 mt-1" /> 
          <span>Special Instructions: {dummyData.specialInstructions}</span>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default BookingDetails;