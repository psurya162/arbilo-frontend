import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import config from '@/config.js/config';

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [tokenExpired, setTokenExpired] = useState(false);
    const [isPasswordFieldsDisabled, setIsPasswordFieldsDisabled] = useState(false); // Disable password fields
    const navigate = useNavigate();
    const { token } = useParams();

    // Function to start the countdown timer
    useEffect(() => {
        if (timeLeft === 0) {
            setTokenExpired(true);
            setIsPasswordFieldsDisabled(true); // Disable password fields when time expires
            return;
        }
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

  // Function to handle the reset password form submission
const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (newPassword !== confirmPassword) {
        setError('Passwords do not match.');
        toast.error('Passwords do not match.');
        return;
    }
    
    try {
        const response = await axios.post(`${config.API_URL}/api/auth/reset-password`, {
            token,
            newPassword,
        });
        setSubmitted(true);
        toast.success(response.data.message);  // Use backend success message
    
        // Stop the timer and disable password fields upon success
        setTokenExpired(false); // Reset token expired state
        setIsPasswordFieldsDisabled(true); // Disable password fields after successful reset
        setTimeLeft(0); // Stop the timer (reset to 0)
    } catch (err) {
        console.error("Error:", err);
        if (err.response && err.response.data && err.response.data.message) {
            setError(err.response.data.message);  
            toast.error(err.response.data.message);  
        } else {
            setError('Failed to reset password. Please try again.');
            toast.error('Failed to reset password. Please try again.');
        }
    }
};

// Function to resend the reset password email
const resendEmail = async () => {
    try {
        const response = await axios.post(`${config.API_URL}/api/auth/forgot-password`, { email: 'user_email@example.com' });
        toast.success(response.data.message);  // Use backend message for success
        setTokenExpired(false);
        setTimeLeft(300); // Reset the timer to 5 minutes
        setIsPasswordFieldsDisabled(false); // Re-enable password fields
    } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message);  // Use backend error message in toast
        } else {
            toast.error('Failed to resend password reset email.');
        }
    }
};


    return (
        <div className="flex min-h-full flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8">
            <Toaster position="top-center" reverseOrder={false} />
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Arbilo"
                    src="https://res.cloudinary.com/dp50h8gbe/image/upload/v1738745363/gwkvk5vkbzvb5b7hosxj.png"
                    className="mb-6 w-32 mx-auto"
                />
                <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">Reset Password</h2>
                <p className="mt-2 text-center text-sm text-gray-600">Enter your new password below.</p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                {submitted ? (
                    <div className="text-center">
                        <p className="text-sm text-gray-600">Your password has been successfully reset.</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="mt-4 text-sm font-semibold text-black hover:text-slate-500"
                        >
                            Go to Login
                        </button>
                    </div>
                ) : (
                    !tokenExpired && (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-900">New Password</label>
                                <div className="mt-2">
                                    <input
                                        id="newPassword"
                                        name="newPassword"
                                        type="password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        disabled={isPasswordFieldsDisabled} // Disable input when time expires
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">Confirm Password</label>
                                <div className="mt-2">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        disabled={isPasswordFieldsDisabled} // Disable input when time expires
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-black sm:text-sm"
                                    />
                                </div>
                            </div>

                           

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-black text-white px-3 py-1.5 text-sm font-semibold shadow-sm hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Reset Password
                                </button>
                            </div>
                        </form>
                    )
                )}

                {/* Timer Display and Resend Button */}
                {tokenExpired ? (
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">The link has expired. Please request a new one.</p>
                        <button
                            onClick={resendEmail}
                            className="mt-2 text-sm font-semibold text-black hover:text-slate-500"
                        >
                            Resend Email
                        </button>
                    </div>
                ) : (
                    <div className="mt-4 text-center">
                        <p className="text-sm text-gray-600">Time left: {Math.floor(timeLeft / 60)}:{timeLeft % 60}</p>
                    </div>
                )}
            </div>
        </div>
    );
}
