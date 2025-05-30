

import BookingDetails from '../userPages/BookingDetails';
import LiveTracking from '../userPages/LiveTracking';



const DashboardTab = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Personal Waste Management Dashboard</h1>
      <BookingDetails />
      <LiveTracking />
      
      
    </div>
  );
};

export default DashboardTab;