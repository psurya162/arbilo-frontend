import React from "react";

const EarningDisclaimer = () => {
    return (
        <div className="container mx-auto px-4 py-8  text-black">
            <h2 className="mb-4 text-[30px] text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Earning Disclaimer</h2>
            <p className="mb-2">Last Updated: 5 January 2025</p>

            <h3 className="text-xl font-semibold mb-2">1. No Guarantee of Earnings:</h3>
            <p className="mb-2">
                Arbilo.com does not guarantee any specific financial results or earnings. The use of our tools and services does not ensure profitability in crypto trading.
            </p>

            <h3 className="text-xl font-semibold mb-2">2. Risk Disclosure:</h3>
            <p className="mb-2">
                Crypto arbitrage trading involves high risks, including the potential loss of your entire investment. You should only trade with funds you can afford to lose.
            </p>

            <h3 className="text-xl font-semibold mb-2">3. Informational Purposes Only:</h3>
            <p className="mb-2">
                All information provided by Arbilo.com is for educational purposes and does not constitute financial or investment advice. Arbilo.com is not a financial advisor company; we provide information based on technology and user needs. Users must exercise caution and seek professional advice when necessary.
            </p>

            <h3 className="text-xl font-semibold mb-2">4. Independent Decision-Making:</h3>
            <p className="mb-2">
                Users are solely responsible for their trading decisions. We encourage consulting with a qualified financial advisor before engaging in crypto trading.
            </p>

            <h3 className="text-xl font-semibold mb-2">5. No Liability:</h3>
            <p className="mb-2">
                Arbilo.com is not liable for any losses, damages, or financial outcomes arising from the use of our services.
            </p>

            <h3 className="text-xl font-semibold mb-2">6. Updates to This Disclaimer:</h3>
            <p className="mb-2">
                We reserve the right to update this disclaimer at any time. Updates will be posted on this page.
            </p>

            <h3 className="text-xl font-semibold mb-2">7. Contact Information:</h3>
            <p className="mb-4">
                For inquiries, please contact <a href="mailto:hello@arbilo.com" className="text-black font-base hover:underline cursor-pointer">hello@arbilo.com</a>.
            </p>
        </div>
    );
};

export default EarningDisclaimer;
