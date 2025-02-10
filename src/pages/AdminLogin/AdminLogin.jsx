import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaArrowLeft } from 'react-icons/fa';
import Loader from '../../components/Loader/Loader';
import { AdminAuthContext } from '../../context/AdminAuthContext'; // Import AdminAuthContext
import config from '@/config.js/config';

export default function AdminLogin() {
  const navigate = useNavigate();
  const { setAdmin } = useContext(AdminAuthContext); // Use AdminAuthContext
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');
    if (rememberedEmail && rememberedPassword) {
      setForm({ email: rememberedEmail, password: rememberedPassword });
      setRememberMe(true);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission

    try {
      setLoading(true);
      const response = await axios.post(`${config.API_URL}/api/admin/login`, {
        email: form.email,
        password: form.password,
      });

      if (response.data && response.data.token && response.data.admin) {
        const { token, admin } = response.data;

        // Update the AdminAuthContext and store in localStorage
        setAdmin({ user: admin, token });

        // Store the admin token and user in localStorage for persistence
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', form.email);
          localStorage.setItem('rememberedPassword', form.password);
        } else {
          localStorage.removeItem('rememberedEmail');
          localStorage.removeItem('rememberedPassword');
        }

        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(admin));

        toast.success('Admin login successful');
        setTimeout(() => navigate('/admin-dashboard'), 2000); // Redirect to Admin Dashboard
      } else {
        toast.error(response.data.message || 'Invalid login credentials');
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Error during login');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-50 bg-opacity-50 z-50">
          <Loader />
        </div>
      )}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="fixed top-4 left-4 z-10">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <FaArrowLeft className="w-4 h-4" /> Back
        </button>
      </div>

      <div className="flex min-h-screen">
        <div className="hidden lg:flex w-1/2 flex-col justify-center items-center bg-gray-50 p-8">
          <img alt="Logo" src="/assets/images/logo2.png" className="w-40 mb-8" />
          <h1 className="text-4xl font-bold text-gray-900 mb-6 text-center max-w-lg">
            Admin Login
          </h1>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="lg:hidden flex justify-center mb-8 mt-16">
            <img alt="Logo" src="/assets/images/logo2.png" className="w-32" />
          </div>

          <div className="max-w-md w-full mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-900">
                Sign in to your admin account
              </h2>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 mt-8">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={form.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-transparent transition duration-200"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                />
                <label htmlFor="remember-me" className="ml-2 text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 rounded-lg bg-black text-white font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
