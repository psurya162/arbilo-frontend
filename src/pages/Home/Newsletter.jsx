import React from "react";
import { Link } from "react-router-dom";

const Newsletter = () => {
    return (
        <div className="newsletter border-t pt-5" >
            <div className="max-w-6xl mx-auto px-4 ">
                {/* Main Container */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-10 md:space-y-0">
                    {/* Left Section - Content */}
                    <div className="md:w-1/2 flex flex-col items-start">
                        <img src="/assets/images/logo2.png" alt="logo" className="w-24 mb-6" />
                        <p className="text-gray-700 text-sm mb-4 text-left">
                            We use cookies to enhance your experience. By continuing to use our website, you agree to our use of cookies and accept our
                            <Link > Terms and Conditions</Link>,
                            <Link > Privacy Policy</Link>, and
                            <Link > Earning Disclaimer</Link>.
                        </p>
                        <p className="text-gray-700 text-sm text-left">
                            The information provided on Arbilo.com is general and does not account for personal circumstances. Crypto trading involves significant risks, including the potential loss of your entire investment. Users should understand these risks, conduct thorough research, and consider seeking independent financial advice before trading. Arbilo.com is not liable for any losses resulting from reliance on the information provided. Use of this website is entirely at your own risk.
                        </p>
                    </div>

                    {/* Right Section - Newsletter Subscription */}
                    <div className="md:w-1/2 flex justify-center md:justify-end w-full">
                        <div className="bg-white border p-6 rounded-lg w-full max-w-md shadow-md">
                            <h3 className="font-semibold text-black text-lg mb-3 text-left">
                                Newsletter Subscription
                            </h3>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 mb-4 sm:mb-0 sm:mr-2"
                                />
                                <button className="bg-black text-white px-4 py-2 text-sm font-semibold rounded-md w-full sm:w-auto">
                                    Subscribe
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 text-left">
                                Your data is secured. Unsubscribe anytime.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Privacy Policy, Terms, and Earning Disclaimer */}
                <div className="py-2 mt-10">
                    <div className="text-center">
                        <p className="text-sm text-gray-700 text-center">
                            <span className="space-x-2">
                                <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
                                <span>|</span>
                                <Link to="/terms-and-conditions" className="hover:underline">Terms and Conditions</Link>
                                <span>|</span>
                                <Link to="/earning-disclaimer" className="hover:underline">Earning Disclaimer</Link>
                            </span>
                            <br />
                            <span className="text-gray-500 mt-2 block">
                                © 2025 Arbilo <span className="ml-2">All rights reserved.</span>
                            </span>
                        </p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Newsletter;
