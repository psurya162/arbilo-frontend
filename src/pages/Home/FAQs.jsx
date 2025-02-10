import React, { useState } from "react";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"; // Importing arrow icons

const faqs = [
  {
    question: "What is ArbiPair?",
    answer:
      "ArbiPair is Arbilo’s unique algorithm designed for pair-based crypto arbitrage. It identifies profitable trading pairs across multiple exchanges, maximizing your profits while eliminating the need for fiat currency transfers.",
  },
  {
    question: "How is ArbiPair different from traditional crypto arbitrage?",
    answer:
      "Unlike traditional crypto arbitrage, ArbiPair focuses on pair-based opportunities, reducing transaction costs and improving efficiency.",
  },
  {
    question: "What is ArbiTrack?",
    answer:
      "ArbiTrack provides dynamic price insights for individual cryptocurrencies across multiple exchanges. It’s perfect for users who prefer traditional arbitrage methods of buying low on one exchange and selling high on another.",
  },
  {
    question: "Do I need to share my wallet or keys to use Arbilo?",
    answer:
      "No, Arbilo ensures your privacy and security. You never need to share your wallet, keys, or passwords. All trades are executed directly by you on your chosen exchanges.",
  },
  {
    question: "Which exchanges and cryptocurrencies does Arbilo support?",
    answer:
      "Currently, we support the top 30 exchanges and top 30 cryptocurrencies, ensuring access to the most popular and liquid trading opportunities. This list is updated monthly based on user feedback, so feel free to suggest additional cryptocurrencies or exchanges.",
  },
  {
    question: "How often is the data refreshed in Arbilo?",
    answer:
      "The arbitrage table in your back office refreshes every 5 minutes, ensuring you receive up-to-date trading signals. All prices are shown in USD/USDT.",
  },
  {
    question: "How often do we get good signals?",
    answer:
      "Sometimes you may get multiple signals in a single day, and at other times, a great profitable signal with a good percentage of profit may come after a few days. It all depends on market volatility, price movements on exchanges, and trading volume.",
  },
  {
    question: "Any cautions or suggestions for trading with Arbilo's system?",
    answer: [
      "If you’re new to trading, start in stable markets. Bull and bear runs can present high fluctuations but also more opportunities.",
      "Ensure both coin deposits and withdrawals are active on the exchanges you’re trading with, as they may be temporarily suspended.",
      "Trade only when signals show a good profit margin. This accounts for transaction and transfer fees while providing a buffer for price fluctuations.",
    ],
  },
  {
    question: "Can I trade in fiat currency with Arbilo?",
    answer:
      "ArbiPair is designed to eliminate the need for fiat currency transfers, making the process faster and more efficient. However, ArbiTrack can help you find opportunities involving fiat if preferred.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "We do not offer a free trial. However, Arbilo is priced affordably, and even a single successful trade using our signals can generate returns that far exceed the subscription cost.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you may cancel your subscription anytime. It typically takes 24–48 hours to process the cancellation.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="mb-10 text-[30px] sm:text-4xl font-semibold leading-tight text-2xl md:text-4xl text-black text-center">
        Frequently Asked Questions
      </h2>

      {faqs.map((faq, index) => (
        <div key={index} className="mb-3 bg-gray-100 border-gray-300 rounded-lg">
          {/* Question Section */}
          <button
            className="w-full flex justify-between items-center p-4 text-base sm:text-lg font-semibold text-gray-800 hover:bg-gray-200 transition-all"
            onClick={() => toggleFAQ(index)}
          >
            <span className="flex-1 text-left">{faq.question}</span>
            <span className={`flex items-center justify-center w-4 h-4 transition-transform duration-300 ${openIndex === index ? "rotate-180" : "rotate-0"}`}>
              <AiOutlineDown size={24} className="icon-bold" />
            </span>
          </button>

          {/* Answer Section */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-screen opacity-100 p-4" : "max-h-0 opacity-0 p-0"
            }`}
          >
            <p className="text-gray-700 text-sm sm:text-base">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQs;

