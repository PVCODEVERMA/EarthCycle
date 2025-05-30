
import { FaStar, FaTimes } from 'react-icons/fa';

const FeedbackModal = ({ 
  rating, 
  setRating, 
  feedback, 
  setFeedback, 
  submitFeedback 
}) => (
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
            submitFeedback();
            document.getElementById('feedback-modal').classList.add('hidden');
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  </div>
);

export default FeedbackModal;