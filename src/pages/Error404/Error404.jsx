import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Error404() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page Not Found</p>
        <p className="mt-2 text-gray-500">Sorry, the page you are looking for does not exist.</p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 px-6 py-3 bg-black text-white text-sm font-semibold rounded-lg shadow-sm hover:bg-gray-800 transition-all duration-200 ease-in-out"
        >
          Go to Home Page
        </button>
      </div>
    </div>
  );
}
