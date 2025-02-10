import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/20/solid';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const handleBuyClick = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative bg-white px-4 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl pb-10">
        <h2 className="mb-4 text-2xl font-semibold leading-tight text-center text-black md:text-4xl">
          Our Pricing
        </h2>

        <div className="relative mt-12 flex flex-col items-center gap-y-6 sm:gap-y-10 lg:flex-row lg:justify-center lg:gap-x-10">
          {/* Full Access Plan */}
          <div className="relative">
            <div className="w-full rounded-3xl p-8 ring-1 ring-gray-900/10 sm:w-auto sm:p-10 bg-white text-black">
              <h3 className="text-xl font-bold">Full Access to ArbiPair & ArbiTrack</h3>
              <ul className="mt-6 space-y-4 text-base text-black">
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <span className="ml-3">Full access to ArbiPair & ArbiTrack for seamless signals.</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <span className="ml-3">Signal updates every 5 minutes, ensuring real-time trading opportunities.</span>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                      <CheckIcon className="h-5 w-5 text-white" aria-hidden="true" />
                    </div>
                  </div>
                  <span className="ml-3">New trading and arbitrage strategies added regularly to elevate your trading.</span>
                </li>
              </ul>
              <h3 className="mt-6 text-lg font-bold text-black">Simple Price</h3>
              <p className="mt-6 text-sm text-gray-600">
                Unmatched Value — A single profitable trade can pay for your subscription many times over.
              </p>
            </div>
          </div>

          {/* Monthly Subscription */}
          <div className="relative">
            <div className="w-full rounded-3xl p-8 ring-1 ring-gray-900/10 sm:w-auto sm:p-10 bg-[hsl(0,0%,95%)] text-black">
              <h3 className="text-xl font-bold">Monthly Subscription</h3>
              <div className="mt-4 flex flex-col items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-black">$59</span>
                <span className="text-lg text-black line-through">$119</span>
                <span className="mt-2 rounded-md bg-[hsl(203,144%,46%)] px-2 font-medium text-white">
                  50% OFF!
                </span>
              </div>
              <p className="mt-6 text-base text-black">Full access for a month. Auto renews every month.</p>
              <button
                onClick={handleBuyClick}
                className="mt-8 block rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Quarterly Subscription */}
          <div className="relative">
            <div className="w-full rounded-3xl p-8 ring-1 ring-gray-900/10 sm:w-auto sm:p-10 bg-[hsl(0,0%,95%)] text-black">
              <h3 className="text-xl font-bold">Quarterly Subscription</h3>
              <div className="mt-4 flex flex-col items-baseline gap-x-2">
                <span className="text-4xl font-semibold tracking-tight text-black">$129</span>
                <span className="text-lg text-black line-through">$319</span>
                <span className="mt-2 rounded-md bg-[hsl(203,144%,46%)] px-2 font-medium text-white">
                  60% OFF!
                </span>
              </div>
              <p className="mt-6 text-base text-black">Full access for 3 months. Auto renews every 3 months.</p>
              <button
                onClick={handleBuyClick}
                className="mt-8 block rounded-md bg-black px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-gray-800"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Modal */}
        <AlertDialog open={isModalOpen} onOpenChange={handleCloseModal}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Payment Gateway Coming Soon!</AlertDialogTitle>
              <AlertDialogDescription>
                Our payment gateway is currently under development. Stay tuned for updates!
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleCloseModal}>Close</AlertDialogCancel>
              <AlertDialogAction onClick={handleCloseModal}>OK</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
