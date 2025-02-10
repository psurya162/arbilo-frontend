import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash, FaArrowLeft } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../../components/Loader/Loader'
import config from "@/config.js/config";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if all fields are filled
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("Please fill in all the fields.");
      return;
    }
  
    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
  
    // Send signup request
    toast.promise(
      axios.post(`${config.API_URL}/api/auth/signup`, formData),
      {
        loading: "Signing up...",
        success: (response) => {
          navigate("/login"); // Redirect to login page on success
          return response.data.message; // Display success message
        },
        error: (error) => {
          // Handle specific error cases
          if (error.response?.status === 400) {
            if (error.response.data.message === "Email is already registered. Please log in.") {
              return "Email is already registered. Please log in.";
            } else if (error.response.data.errors) {
              // Handle validation errors
              return error.response.data.errors.map((err) => err.msg).join(", ");
            } else {
              return error.response.data.message || "An error occurred during signup.";
            }
          } else {
            return "An error occurred during signup.";
          }
        },
      }
    );
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
            Join us and explore the best arbitrage opportunities in the market.
          </h1>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
          <div className="lg:hidden flex justify-center mb-8 mt-16">
            <img alt="Logo" src="/assets/images/logo2.png" className="w-32" />
          </div>

          <div className="max-w-md w-full mx-auto space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-center text-gray-900">
                Create your account
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-8">
  <fieldset disabled={loading} className="space-y-6">
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">Name</label>
      <input
        name="name"
        type="text"
        value={formData.name}
        onChange={handleChange}
        autoComplete="name"
        className="w-full rounded-lg px-3 py-2 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-black"
        disabled={loading}
      />
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">Email address</label>
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full rounded-lg px-3 py-2 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-black"
        disabled={loading}
      />
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">Password</label>
      <div className="relative">
        <input
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={handleChange}
          autoComplete="new-password"
          className="w-full rounded-lg px-3 py-2 pr-10 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-black"
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
    </div>

    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-900">Confirm Password</label>
      <div className="relative">
        <input
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-lg px-3 py-2 pr-10 text-gray-900 ring-1 ring-gray-300 focus:ring-2 focus:ring-black"
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
        </button>
      </div>
    </div>

    <div className="pt-4">
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {loading ? "Signing up..." : "Sign up"}
      </button>
    </div>
  </fieldset>
</form>


            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-black hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}