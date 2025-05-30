// BookingHistory.jsx
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { History, Star, FileText, ChevronDown, ChevronUp, X } from 'lucide-react';
import { toast } from 'react-toastify';

const bookingHistory = [
  { id: 'WM-2025-0528', date: '2025-05-28', status: 'Completed', type: 'Organic', quantity: '7 kg', rating: 5 },
  { id: 'WM-2025-0525', date: '2025-05-25', status: 'Completed', type: 'Plastic', quantity: '6 kg', rating: 4 },
  { id: 'WM-2025-0522', date: '2025-05-22', status: 'Cancelled', type: 'Medical', quantity: '4 kg', rating: null },
  { id: 'WM-2025-0520', date: '2025-05-20', status: 'Completed', type: 'Organic', quantity: '8 kg', rating: 4 },
  { id: 'WM-2025-0518', date: '2025-05-18', status: 'Completed', type: 'Paper', quantity: '3 kg', rating: 5 },
  { id: 'WM-2025-0515', date: '2025-05-15', status: 'Completed', type: 'Medical', quantity: '5 kg', rating: 5 },
  { id: 'WM-2025-0512', date: '2025-05-12', status: 'Cancelled', type: 'Plastic', quantity: '9 kg', rating: null },
  { id: 'WM-2025-0508', date: '2025-05-08', status: 'Cancelled', type: 'Plastic', quantity: '12 kg', rating: null },
  { id: 'WM-2025-0505', date: '2025-05-05', status: 'Completed', type: 'Organic', quantity: '6 kg', rating: 3 },
  { id: 'WM-2025-0501', date: '2025-05-01', status: 'Completed', type: 'Glass', quantity: '4 kg', rating: 4 },
];

const BookingHistory = () => {
  const [showAll, setShowAll] = useState(false);
  const [expandedId, setExpandedId] = useState(null);
  const [ratingPopup, setRatingPopup] = useState({
    open: false,
    bookingId: null,
    currentRating: 0,
    comment: '',
    tempRating: 0
  });

  const toggleDetails = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const openRatingPopup = (bookingId, currentRating) => {
    setRatingPopup({
      open: true,
      bookingId,
      currentRating,
      comment: '',
      tempRating: currentRating
    });
  };

  const handleRatingChange = (newRating) => {
    setRatingPopup(prev => ({ ...prev, tempRating: newRating }));
  };

  const handleCommentChange = (e) => {
    setRatingPopup(prev => ({ ...prev, comment: e.target.value }));
  };

  const submitRating = () => {
    // In a real app, you would send this to your backend
    toast.success(`Rating submitted for booking ${ratingPopup.bookingId}:`, {
      rating: ratingPopup.tempRating,
      comment: ratingPopup.comment
    });

    
    // Close the popup
    setRatingPopup({
      open: false,
      bookingId: null,
      currentRating: 0,
      comment: '',
      tempRating: 0
    });
  };

  const displayedHistory = showAll ? bookingHistory : bookingHistory.slice(0, 3);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
        <History className="text-blue-600" /> Booking History
      </h2>
      
      <div className="space-y-4">
        {displayedHistory.map((entry) => (
          <Card 
            key={entry.id} 
            className={entry.status === 'Cancelled' 
              ? 'bg-red-50 border-red-200' 
              : 'bg-green-50 border-green-200'
            }
          >
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{entry.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ID</p>
                  <p className="font-mono text-sm">{entry.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Type/Quantity</p>
                  <p>{entry.type} • {entry.quantity}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <p className={`font-bold ${entry.status === 'Completed' ? 'text-green-600' : 'text-red-600'}`}>
                    {entry.status}
                  </p>
                </div>
              </div>
              
              {/* Details section - shown when expanded */}
              {expandedId === entry.id && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h3 className="font-medium mb-2">Booking Details</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-500">Collection Time</p>
                      <p>10:00 AM - 12:00 PM</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Driver</p>
                      <p>John Doe (WM-1245)</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Collection Address</p>
                      <p>123 Green St, Eco City</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Payment Method</p>
                      <p>Credit Card (**** 1234)</p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Rating and View Details button */}
              <div className="flex justify-between items-center mt-3">
                <div>
                  {entry.rating !== null ? (
                    <div 
                      className="flex items-center gap-1 cursor-pointer group"
                      onClick={() => openRatingPopup(entry.id, entry.rating)}
                    >
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          fill={i < entry.rating ? "#FBBF24" : "none"} 
                          stroke="#FBBF24"
                          className="group-hover:opacity-80 transition-opacity"
                        />
                      ))}
                      <span className="text-sm text-gray-500 ml-1 group-hover:text-blue-600 transition-colors">
                        (Click to rate)
                      </span>
                    </div>
                  ) : (
                    <div className="text-sm text-gray-500 flex items-center">
                      <Star size={16} className="text-gray-300 mr-1" />
                      Not rated
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => toggleDetails(entry.id)}
                  className="text-blue-600 text-sm flex items-center gap-1 hover:text-blue-800 transition-colors"
                >
                  <FileText size={16} /> 
                  {expandedId === entry.id ? 'Hide Details' : 'View Details'}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <button 
          onClick={() => setShowAll(!showAll)}
          className="text-blue-600 font-medium flex items-center justify-center gap-2 w-full py-2 border border-dashed rounded-lg hover:bg-blue-50 transition-colors"
        >
          {showAll ? (
            <>
              <ChevronUp size={18} /> Show Less
            </>
          ) : (
            <>
              <ChevronDown size={18} /> View Full History
            </>
          )}
        </button>
      </div>
      
      {/* Rating Popup */}
      {ratingPopup.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">Rate Your Experience</h3>
                <button 
                  onClick={() => setRatingPopup({ ...ratingPopup, open: false })}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              
              <p className="text-gray-600 mb-2">
                How would you rate your waste collection service?
              </p>
              
              <div className="flex justify-center my-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={32}
                    fill={star <= ratingPopup.tempRating ? "#FBBF24" : "none"}
                    stroke="#FBBF24"
                    className="mx-1 cursor-pointer transition-transform hover:scale-110"
                    onClick={() => handleRatingChange(star)}
                  />
                ))}
              </div>
              
              <p className="text-center text-lg font-semibold mb-2">
                {ratingPopup.tempRating} {ratingPopup.tempRating === 1 ? 'Star' : 'Stars'}
              </p>
              
              <div className="mt-6">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Share your experience (optional)
                </label>
                <textarea
                  id="comment"
                  rows="3"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How was your experience with the waste collection service?"
                  value={ratingPopup.comment}
                  onChange={handleCommentChange}
                ></textarea>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setRatingPopup({ ...ratingPopup, open: false })}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={submitRating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Submit Rating
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;