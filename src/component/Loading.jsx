import React from "react";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-sky-50">
      <style jsx>{`
        @keyframes drive {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        @keyframes road-move {
          0% { background-position: 0 0; }
          100% { background-position: 40px 0; }
        }
        @keyframes trash-collect {
          0%, 30% { transform: scale(1); opacity: 1; }
          40%, 60% { transform: scale(0.5) translateY(-20px); opacity: 0.5; }
          70%, 100% { transform: scale(1); opacity: 1; }
        }
        @keyframes wheel-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      <div className="relative w-full h-40 overflow-hidden">
        {/* Background elements */}
        <div className="absolute bottom-10 left-0 w-8 h-8 bg-gray-400 rounded-sm animate-[trash-collect_3s_infinite]"></div>
        <div className="absolute bottom-10 left-20 w-8 h-8 bg-gray-400 rounded-sm animate-[trash-collect_3s_infinite_0.5s]"></div>
        <div className="absolute bottom-10 left-40 w-8 h-8 bg-gray-400 rounded-sm animate-[trash-collect_3s_infinite_1s]"></div>
        
        {/* Sun */}
        <div className="absolute top-4 right-8 w-12 h-12 bg-yellow-300 rounded-full"></div>
        
        {/* Moving truck */}
        <div className="absolute bottom-10 left-0 animate-[drive_3s_linear_infinite]">
          <div className="relative animate-[bounce_1s_ease-in-out_infinite]">
            {/* Truck cabin */}
            <div className="w-16 h-10 bg-red-600 rounded-tl-md rounded-tr-sm relative z-10">
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full"></div>
              <div className="absolute top-2 left-1 w-3 h-3 bg-sky-200 rounded-sm"></div>
            </div>
            
            {/* Trash container */}
            <div className="absolute left-12 top-0 w-20 h-12 bg-green-600 rounded-tr-md rounded-br-md">
              <div className="absolute top-1 left-1 w-16 h-8 bg-green-700 rounded-sm"></div>
              <div className="absolute top-3 -left-1 w-1 h-6 bg-gray-800"></div>
            </div>
            
            {/* Wheels */}
            <div className="absolute -bottom-2 left-2 w-5 h-5 bg-gray-900 rounded-full border-2 border-gray-700 animate-[wheel-rotate_1s_linear_infinite]">
              <div className="absolute inset-0.5 w-3 h-3 bg-gray-700 rounded-full"></div>
            </div>
            <div className="absolute -bottom-2 left-14 w-5 h-5 bg-gray-900 rounded-full border-2 border-gray-700 animate-[wheel-rotate_1s_linear_infinite]">
              <div className="absolute inset-0.5 w-3 h-3 bg-gray-700 rounded-full"></div>
            </div>
          </div>
        </div>
        
        {/* Road */}
        <div 
          className="absolute bottom-8 w-full h-1 bg-gray-500"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, 
              transparent, 
              transparent 15px, 
              white 15px, 
              white 20px)`,
            animation: 'road-move 0.5s linear infinite'
          }}
        ></div>
        
        {/* Ground */}
        <div className="absolute bottom-0 w-full h-8 bg-amber-900"></div>
        
        {/* Text animation */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-center">
          <div className="text-lg font-bold text-gray-700 animate-pulse">
            कूड़े वाला घर से आया...
          </div>
          <div className="text-sm text-gray-600 mt-1">
            West Management System
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;