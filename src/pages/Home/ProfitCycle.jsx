import { FaCoins, FaArrowRight, FaExchangeAlt, FaWallet } from 'react-icons/fa';

function ProfitCycle() {
  const steps = [
    {
      title: "Step 1",
      description: "Buy Coin 1 at Exchange A using USDT. Transfer it to Exchange B.",
    },
    {
      title: "Step 2",
      description: "Sell Coin 1 at Exchange B for USDT. ",
    },
    {
      title: "Step 3",
      description: "Use the USDT to buy Coin 2 at Exchange B. Transfer Coin 2  to Exchange A.",
    },
    {
      title: "Step 4",
      description: "Sell Coin 2 at Exchange A for USDT to complete the cycle.",
    },
  ];

  return (
    <>
      {/* Grid Container for Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 w-full gap-6 pb-10 px-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center shadow-md rounded-lg p-6 bg-[#f1f1ef] h-auto min-h-[250px] w-full"
          >
            {/* Step Title with Fixed Height */}
            <h3 className="text-lg sm:text-xl md:text-2xl font-medium text-black mb-2 min-h-[50px] flex items-center">
              {step.title}
            </h3>
            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 text-left">
              {step.description}
            </p>
          </div>
        ))}
      </div>

      {/* Info Text */}
      <div className="flex justify-center">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-500 pb-6 px-6 sm:px-8 md:px-24 text-center border-b-2">
          *Monitor the signal and repeat Steps 1-4 to continue earning profits
        </p>
      </div>
    </>
  );
}

export default ProfitCycle;
