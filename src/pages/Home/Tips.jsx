import React from 'react';
import './Home.css';

const Tips = () => {
  return (
    <div className="min-h-screen bg-white p-0 md:p-4 lg:p-6 xl:p-10">
      <h2 className="mb-6 md:mb-10 text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight text-gray-800 text-center">
        Trading Tips
      </h2>
      <h4 className="mb-6 md:mb-10 text-lg md:text-xl font-semibold leading-tight text-gray-700 text-center">
        Trading Tips: Get the Most from Arbilo Signals
      </h4>

      {/* Starting Out Section */}
      <section className="rounded-lg p-4 md:p-0 mb-6 tip-section">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Starting Out: Build a Strong Foundation</h2>

        <div className="space-y-4 md:space-y-6">
          <div className="border-l-4 border-gray-400 pl-3 md:pl-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Begin in Stable Markets</h3>
            <p className="text-sm md:text-base text-gray-700">
              For beginners, start trading in stable markets with lower volatility. Avoid bull and bear runs initially,
              as they can bring high fluctuations. Pro traders, however, can leverage this volatility to their advantage
              in arbitrage, making it better suited for experienced traders.
            </p>
          </div>

          <div className="border-l-4 border-gray-400 pl-3 md:pl-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Start Small</h3>
            <p className="text-sm md:text-base text-gray-700">
              If you're new to crypto arbitrage, begin with small trades to minimize risk while familiarizing yourself
              with strategies and tools like ArbiPair and ArbiTrack. While larger trades yield better results due to
              lower relative transfer costs, it's crucial to first build confidence.
            </p>
          </div>

          <div className="border-l-4 border-gray-400 pl-3 md:pl-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Understand Arbitrage Basics</h3>
            <p className="text-sm md:text-base text-gray-700">
              Take the time to thoroughly learn crypto arbitrage. Consistent effort and experience can lead to stable
              profits over time. Beginners can practice using paper trading with Arbilo's signals before committing real
              funds.
            </p>
          </div>
        </div>
      </section>

      {/* Preparing to Trade Section */}
      <section className="rounded-lg p-4 md:p-0 mb-6 tip-section">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Preparing to Trade: Essential Checks</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Verify Exchange Functionality</h3>
            <p className="text-sm md:text-base text-gray-600">
              Ensure both deposits and withdrawals are active on the exchanges you plan to trade with, as these
              functions are sometimes temporarily suspended.
            </p>
          </div>

          <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Check Signal Profitability</h3>
            <p className="text-sm md:text-base text-gray-600">
              Trade only when signals indicate a good profit margin, accounting for transaction fees, transfer costs,
              and price fluctuations. Verify liquidity on the suggested exchanges to avoid execution delays or slippage.
            </p>
          </div>
        </div>
      </section>

      {/* Optimizing Signals Section */}
      <section className="rounded-lg p-4 md:p-0 mb-6 tip-section">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Optimizing with ArbiPair and ArbiTrack</h2>

        <div className="space-y-4 md:space-y-6">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6">
            <div className="flex-1 bg-white p-3 md:p-4 rounded-lg shadow-sm">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Identify Reliable Exchanges</h3>
              <p className="text-sm md:text-base text-gray-600">
                Use ArbiPair to track which exchanges frequently provide profitable signals. Take notes, observe trends,
                and keep funds in USDT on those exchanges to execute trades quickly when opportunities arise.
              </p>
            </div>

            <div className="flex-1 bg-white p-3 md:p-4 rounded-lg shadow-sm">
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Efficient Coin Transfers</h3>
              <p className="text-sm md:text-base text-gray-600">
                Pro traders recommend buying Coin 1 and Coin 2 simultaneously on the respective exchanges listed in the
                signals. Ensure funds are pre-loaded on both Exchange A and Exchange B. Transfer the coins across
                exchanges, then sell them back to USDT to save time and minimize transfer costs.
              </p>
            </div>
          </div>

          <div className="p-3 md:p-4 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Leverage Futures and Options</h3>
            <ul className="text-sm md:text-base text-gray-600 space-y-2">
              <li className="ml-4">Advanced traders can enhance profits by combining ArbiTrack signals with futures and options trading. For
                example, if a coin's price is significantly lower or higher on one exchange, execute future trades (long or
                short) to lock in profits when prices align.</li>
              <li className="ml-4">Caution: Futures trading is risky. Only attempt this if you're experienced, and always use stop-losses and
                monitor market volatility carefully</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pro Tips Section */}
      <section className="rounded-lg p-4 md:p-0 mb-6 tip-section">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Pro Tips for Long-Term Success</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">📔 Keep a Trading Journal</h3>
            <p className="text-sm md:text-base text-gray-600">
              Document your trades, including exchanges, signals, and outcomes. Reviewing this data will help refine
              your strategy, identify trends, and improve decision-making over time.
            </p>
          </div>

          <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">🔄 Stay Adaptable</h3>
            <p className="text-sm md:text-base text-gray-600">
              Arbitrage opportunities vary with market conditions. Regularly monitor trends and adapt your approach to
              take advantage of evolving opportunities.
            </p>
          </div>

          <div className="bg-white p-3 md:p-4 rounded-lg shadow-sm">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">🛠 Use ArbiPoint Tools</h3>
            <p className="text-sm md:text-base text-gray-600">
              Utilize Arbilo's tools like ArbiPair for advanced pair trading strategies and ArbiTrack for real-time
              signals. These tools simplify arbitrage, making it accessible and profitable for both beginners and
              advanced traders.
            </p>
          </div>
        </div>
      </section>

      {/* Key Reminders Section */}
      <section className="rounded-lg p-4 md:p-0 tip-section">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Key Reminders</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="p-3 md:p-4 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Patience Pays Off</h3>
            <p className="text-sm md:text-base text-gray-600">
              Arbitrage isn't about instant wealth. Success comes from experience, consistency, and disciplined
              trading.
            </p>
          </div>

          <div className="p-3 md:p-4 rounded-lg">
            <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Avoid Emotional Trading</h3>
            <p className="text-sm md:text-base text-gray-600">
              Stick to your strategy and avoid impulsive decisions driven by greed or fear. Wait for the right signals
              with high profitability and execute trades thoughtfully.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tips;
