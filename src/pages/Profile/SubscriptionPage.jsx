import React, { useEffect, useState } from 'react';
import axios from 'axios';
import config from '@/config.js/config';

const SubscriptionPage = () => {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        // Get the JWT token from localStorage or wherever it's stored
        const token = localStorage.getItem('authToken');

        if (!token) {
          setError('No authentication token found.');
          setLoading(false);
          return;
        }

        const response = await axios.get(`${config.API_URL}/api/auth/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSubscriptionData(response.data.userData);
      } catch (err) {
        setError('Failed to fetch subscription data');
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <svg
          className="animate-spin h-12 w-12 text-green-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    
      <>
      
   
        
        <div className="p-6">
          {/* Grid layout for subscription info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded shadow-sm">
              <p className="font-medium text-gray-700">Name:</p>
              <p className="text-gray-600 uppercase">{subscriptionData.name}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow-sm">
              <p className="font-medium text-gray-700">Email:</p>
              <p className="text-gray-600 uppercase">{subscriptionData.email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow-sm">
              <p className="font-medium text-gray-700">Subscription Type:</p>
              <p className="text-gray-600 uppercase">
                {subscriptionData.subscription_type || 'Not Subscribed'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow-sm">
              <p className="font-medium text-gray-700">Subscription Status:</p>
              <p className="text-gray-600 uppercase">
                {subscriptionData.subscription_status || 'Inactive'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow-sm">
              <p className="font-medium text-gray-700">Start Date:</p>
              <p className="text-gray-600">
                {subscriptionData.subscription_start_date
                  ? new Date(subscriptionData.subscription_start_date).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded shadow-sm">
              <p className="font-medium text-gray-700">End Date:</p>
              <p className="text-gray-600 uppercase">
                {subscriptionData.subscription_end_date
                  ? new Date(subscriptionData.subscription_end_date).toLocaleDateString()
                  : 'N/A'}
              </p>
            </div>
          </div>
          
        </div>
      
        </>
  );
};

export default SubscriptionPage;
