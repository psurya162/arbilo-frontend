import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-black">
      <h2 className="mb-10 text-[30px] sm:text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
        Privacy Policy
      </h2>
      <p className="mb-4 text-black text-sm sm:text-base">
        <strong>Last Updated: 5 January 2025</strong>
      </p>

      <h2 className="text-xl  font-bold mb-2 text-black">Introduction</h2>
      <p className="mb-4 text-sm sm:text-base">
        Arbilo.com ("we," "us," "our") values your privacy. This Privacy Policy outlines how we collect, use, disclose, and protect your information. By using Arbilo.com, you agree to this Privacy Policy.
      </p>

      <h2 className="text-xl  font-bold mb-2 text-black">Information We Collect</h2>
      <ul className="list-disc list-inside mb-4 text-sm sm:text-base">
        <li><strong className="text-black">Personal Information:</strong> Name, email address, phone number, and payment information.</li>
        <li><strong className="text-black">Usage Data:</strong> IP address, browser type, pages visited, and interaction data.</li>
        <li><strong className="text-black">Cookies:</strong> Small data files stored on your device to enhance user experience.</li>
      </ul>

      <h2 className="text-xl  font-bold mb-2 text-black">How We Use Your Information</h2>
      <ul className="list-disc list-inside mb-4 text-sm sm:text-base">
        <li>To provide and improve our services.</li>
        <li>To process payments and manage subscriptions.</li>
        <li>To communicate updates, offers, and changes to services.</li>
        <li>To ensure legal compliance and security.</li>
      </ul>

      <h2 className="text-xl  font-bold mb-2 text-black">Disclosure of Your Information</h2>
      <ul className="list-disc list-inside mb-4 text-sm sm:text-base">
        <li><strong className="text-black">Third-Party Service Providers:</strong> For payment processing, hosting, and analytics.</li>
        <li><strong className="text-black">Legal Requirements:</strong> Compliance with applicable laws or to protect our legal rights.</li>
      </ul>

      <h2 className="text-xl  font-bold mb-2 text-black">Your Data Rights</h2>
      <ul className="list-disc list-inside mb-4 text-sm sm:text-base">
        <li>Access, update, or delete your information by contacting us.</li>
        <li>Opt-out of marketing emails by clicking "unsubscribe."</li>
      </ul>

      <h2 className="text-xl  font-bold mb-2 text-black">Data Security</h2>
      <p className="mb-4 text-sm sm:text-base">
        We employ industry-standard measures to protect your data but cannot guarantee absolute security.
      </p>

      <h2 className="text-xl  font-bold mb-2 text-black">Third-Party Links</h2>
      <p className="mb-4 text-sm sm:text-base">
        Our website may contain links to external sites. We are not responsible for their privacy practices.
      </p>

      <h2 className="text-xl font-bold mb-2 text-black">Changes to This Policy</h2>
      <p className="mb-4 text-sm sm:text-base">
        We reserve the right to update this Privacy Policy at any time. Updates will be posted on this page.
      </p>

      <h2 className="text-xl  font-bold mb-2 text-black">Contact Us</h2>
      <p className="mb-4 text-sm sm:text-base">
        For questions or concerns, email us at{" "}
        <a href="mailto:hello@arbilo.com" className="text-black font-base hover:underline cursor-pointer">
          hello@arbilo.com
        </a>
      </p>
    </div>
  );
};

export default PrivacyPolicy;
