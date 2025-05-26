import React from "react";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="relative flex flex-col items-center justify-end w-[200px] h-[100px] overflow-x-hidden">
        {/* Truck upper body */}
        <div className="w-[130px] mb-1.5 animate-[motion_1s_linear_infinite]">
          <div className="bg-blue-600 w-full h-8 rounded-t-md"></div>
          <div className="bg-gray-800 w-8 h-5 rounded-sm mt-1 ml-2"></div>
        </div>

        {/* Tires */}
        <div className="w-[130px] absolute bottom-0 px-2.5 flex justify-between items-center">
          <div className="w-6 h-6 rounded-full bg-black"></div>
          <div className="w-6 h-6 rounded-full bg-black"></div>
        </div>

        {/* Road */}
        <div className="w-full h-[1.5px] bg-[#282828] rounded-sm relative self-end overflow-hidden">
          <div className="absolute w-5 h-full bg-[#282828] right-[-50%] rounded-sm border-l-[10px] border-white animate-[roadAnimation_1.4s_linear_infinite]"></div>
          <div className="absolute w-2.5 h-full bg-[#282828] right-[-65%] rounded-sm border-l-[4px] border-white animate-[roadAnimation_1.4s_linear_infinite]"></div>
        </div>

        {/* Lamp post */}
        <div className="absolute bottom-0 right-[-90%] h-[90px] w-1 bg-yellow-400 animate-[roadAnimation_1.4s_linear_infinite]"></div>
      </div>
    </div>
  );
};

export default Loading;
