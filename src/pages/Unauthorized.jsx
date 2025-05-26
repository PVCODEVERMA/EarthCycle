import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
        <p className="text-gray-700 mb-6">You do not have permission to view this page.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
