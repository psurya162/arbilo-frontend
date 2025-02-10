import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import config from '@/config.js/config';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    const loadingToast = toast.loading('Sending reset link...');

    try {
      const response = await axios.post(`${config.API_URL}/api/auth/forgot-password`, { email });
      if (response.status === 200) {
        console.log('Password reset link sent to:', email);
        setSubmitted(true);
        toast.success(`Password reset link sent to: ${email}`);
        toast.dismiss(loadingToast);
      }
    } catch (err) {
      console.error('Error:', err);
      setErrorMessage(err.response?.data?.message || 'Internal server error. Please try again later.');
      toast.error(err.response?.data?.message || 'Internal server error. Please try again later.');
      toast.dismiss(loadingToast);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen  flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="w-full max-w-md space-y-8 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="mt-4">
          <button
            onClick={() => navigate(-1)} // Navigate back to the previous page
            className="text-sm font-semibold text-gray-700 hover:text-black transition-colors"
          >
            &larr; Back
          </button>
        </div>
        <div className="space-y-6">
          <div className="flex justify-center">
            <img
              alt="Arbilo"
              src="/assets/images/logo2.png"
              className="h-12 w-auto sm:h-16 object-contain"
            />
          </div>
          
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Forgot Password
            </h2>
            <p className="text-sm text-gray-600 sm:text-base">
              Enter your email address to receive a password reset link.
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="space-y-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm sm:text-base text-gray-700">
                A password reset link has been sent to{' '}
                <span className="font-semibold text-green-700">{email}</span>
              </p>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="text-sm font-semibold text-black hover:text-gray-600 transition-colors"
            >
              Reset another email
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-lg px-4 py-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-black sm:text-sm sm:leading-6 transition-all duration-200 ease-in-out"
                placeholder="Enter your email"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-black px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-200 ease-in-out sm:text-base"
            >
              Send reset link
            </button>
          </form>
        )}

        {/* Back Button */}
        
      </div>
    </div>
  );
}
