
const ProgressBar = ({ status }) => (
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
            width: status === 'In Progress' ? '75%' : 
                  status === 'Completed' ? '100%' : '30%'
          }}
        ></div>
      </div>
      <div className="flex justify-between mt-1">
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className={`w-3 h-3 rounded-full ${
          status === 'In Progress' || 
          status === 'Completed' ? 'bg-green-500' : 'bg-gray-300'
        }`}></div>
        <div className={`w-3 h-3 rounded-full ${
          status === 'Completed' ? 'bg-green-500' : 'bg-gray-300'
        }`}></div>
      </div>
    </div>
  </div>
);

export default ProgressBar;