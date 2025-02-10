import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import config from "@/config.js/config";

const CreateCredential = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subscription, setSubscription] = useState("monthly"); // Default to monthly subscription
  const [startDate, setStartDate] = useState(""); // New state for the start date
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    // Validation
    if (!name.trim() || !email.trim() || !startDate) {
      toast.error("Please fill in all required fields.");
      return; // Prevent form submission if validation fails
    }

    setLoading(true);

    const subscriptionDetails = {
      email,
      name,
      subscription_type: subscription,
      start_date: startDate, // Send selected start date
    };

    await toast.promise(
      axios.post(`${config.API_URL}/api/auth/create-user`, subscriptionDetails),
      {
        loading: "Sending credentials...",
        success: (response) => {
          setEmail("");
          setName("");
          setSubscription("monthly");
          setStartDate(""); // Reset date
          return response.data.message || "User created and credentials sent successfully";
        },
        error: (error) => error.response?.data?.message || "Failed to send credentials",
      }
    );

    setLoading(false);
  };

  return (
    <div className="  mx-auto space-y-6">
      <Toaster />
      <h2 className="text-2xl font-bold text-center text-gray-800">Create Credential</h2>

      <form onSubmit={handleCreateUser} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="subscription">
            Subscription Plan <span className="text-red-500">*</span>
          </label>
          <select
            id="subscription"
            value={subscription}
            onChange={(e) => setSubscription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 "
            disabled={loading}
          >
            <option value="monthly">Monthly Subscription - $59</option>
            <option value="quarterly">Quarterly Subscription - $129</option>
          </select>
        </div>

        {/* New: Date Picker */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="start-date">
            Subscription Start Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="start-date"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 "
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 text-white bg-black rounded-lg transition-all duration-200"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Credentials"}
        </button>
      </form>
    </div>
  );
};

export default CreateCredential;
