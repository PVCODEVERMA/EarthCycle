
import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
      <FiArrowLeftCircle
        className="text-red-600 text-5xl mb-4 cursor-pointer"
        onClick={() => navigate("/")}
      />
      <h1 className="text-4xl font-bold text-red-700 mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-6">You do not have permission to view this page.</p>
      <button
        onClick={() => navigate("/login")}
        className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      >
        Back to Login
      </button>
    </div>
  );
};

export default Unauthorized;
