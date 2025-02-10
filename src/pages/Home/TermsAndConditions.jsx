import React from "react";

const TermsAndConditions = () => {
    return (
        <div className="container mx-auto px-4 py-8  text-black">
            <h2 className="mb-4 text-[30px] text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Terms and Conditions</h2>
            <p className="mb-2">Last Updated: 5 January 2025</p>

            <h3 className="text-xl font-semibold mb-2">
                1. Introduction:
            </h3>
            <p className="mb-2">
                These Terms and Conditions ("Terms") govern your use of Arbilo.com. By accessing or using our services, you agree to comply with these Terms.
            </p>

            <h3 className="text-xl font-semibold mb-2">2. Eligibility:</h3>
            <p className="mb-2">
                You must be at least 18 years old or of legal age in your jurisdiction to use our services.
            </p>

            <h3 className="text-xl font-semibold mb-2">3. Services Provided:</h3>
            <p className="mb-2">
                Arbilo.com offers tools, signals, and insights for crypto arbitrage trading. Our services are informational and educational only and do not constitute financial or investment advice. Arbilo.com is not a financial advisor company; we provide information based on technology and user needs. Users must exercise caution and make informed decisions.
            </p>

            <h3 className="text-xl font-semibold mb-2">4. User Responsibilities</h3>
            <ul className="list-disc list-inside mb-4 pl-6">
                <li>Maintain the confidentiality of your account information.</li>
                <li>Use our services for lawful purposes only.</li>
                <li>Acknowledge that all trading decisions are solely your responsibility.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">5. Fees and Payments</h3>
            <ul className="list-disc list-inside mb-4 pl-6">
                <li>All fees for monthly or quarterly packages are non-refundable.</li>
                <li>Payments are processed through secure third-party providers.</li>
                <li>Subscriptions canceled by users will remain active until the end of the subscription period. There will be no prorated refunds for the remaining period.</li>
            </ul>

            <h3 className="text-xl font-semibold mb-2">6. Disclaimer of Liability</h3>
            <p className="mb-4">
                Arbilo.com is not responsible for any financial losses or damages resulting from the use of our services. Crypto trading carries inherent risks, and past performance is not indicative of future results.
            </p>

            <h3 className="text-xl font-semibold mb-2">7. Intellectual Property</h3>
            <p className="mb-4">
                All content on Arbilo.com, including algorithms, tools, and trademarks, is owned by us and protected by intellectual property laws.
            </p>

            <h3 className="text-xl font-semibold mb-2">8. Termination</h3>
            <p className="mb-4">
                We reserve the right to terminate or suspend your access for violations of these Terms.
            </p>

            <h3 className="text-xl font-semibold mb-2">9. Contact Us</h3>
            <p className="mb-4">
                For questions, email us at <a href="mailto:hello@arbilo.com" className="text-blue-600">hello@arbilo.com</a>.
            </p>
        </div>
    );
};

export default TermsAndConditions;
