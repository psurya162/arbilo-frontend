import React, { useState } from 'react';
import axios from 'axios';
import { toast, Toaster } from 'react-hot-toast'; // Importing React Hot Toast
import config from '@/config.js/config';

const CTA = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send POST request to the backend with form data
      const response = await axios.post(`${config.API_URL}/api/auth/contact-us`, formData);
      
      // Clear the form fields after successful submission
      setFormData({ name: '', email: '', message: '' });

      // Show success toast using backend message
      toast.success(response.data.message || 'Message sent successfully!');
    } catch (error) {
      // Show error toast using backend message if available
      toast.error(error.response?.data?.message || 'Failed to send the message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="dark:bg-gray-900">
        <Toaster/>
        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
          <h2 className="mb-4 text-[30px] font-semibold leading-tight text-2xl md:text-4xl text-black text-center">
            Contact Us
          </h2>
          <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Have a question? We're here to help! Simply fill out the form below or send us an email, and we'll get back to you as soon as possible.
          </p>
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Your name"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                placeholder="Your Email"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                id="message"
                rows={6}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Leave a message.."
                required
              />
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-black sm:w-fit hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
              disabled={loading}
            >
              {loading ? 'Sending message...' : 'Send message'}
            </button>

            <p className="text-center mt-4">
              You can also reach us directly at{' '}
              <span className="text-black hover:underline cursor-pointer">hello@arbilo.com</span>
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default CTA;
