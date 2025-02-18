import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { RefreshCw, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const coins = [
  { symbol: 'BTC', name: 'Bitcoin' },
  { symbol: 'ETH', name: 'Ethereum' },
  { symbol: 'XRP', name: 'XRP' },
  { symbol: 'ADA', name: 'Cardano' },
  { symbol: 'DOGE', name: 'Dogecoin' },
  { symbol: 'SOL', name: 'Solana' },
  { symbol: 'DOT', name: 'Polkadot' },
  { symbol: 'LTC', name: 'Litecoin' },
  { symbol: 'BCH', name: 'Bitcoin Cash' },
  { symbol: 'LINK', name: 'Chainlink' },
  { symbol: 'AVAX', name: 'Avalanche' },
  { symbol: 'UNI', name: 'Uniswap' },
  { symbol: 'ALGO', name: 'Algorand' },
  { symbol: 'MATIC', name: 'Polygon' },
  { symbol: 'ATOM', name: 'Cosmos' }
];

const Sentiments = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    const results = await Promise.all(
      coins.map(async (coin) => {
        const redditSentiment = Math.random() * 2 - 1;
        const cryptoPanicSentiment = Math.random() * 2 - 1;
        const newsApiSentiment = Math.random() * 2 - 1;
        const overallSentiment = (redditSentiment + cryptoPanicSentiment + newsApiSentiment) / 3;
        const price = Math.random() * (coin.symbol === 'BTC' ? 50000 : 5000);

        return {
          coin,
          marketPair: `${coin.symbol}/USDT`,
          marketPrice: price,
          redditSentiment,
          cryptoPanicSentiment,
          newsApiSentiment,
          overallSentiment,
          signal: overallSentiment > 0.2 ? "Buy" : overallSentiment < -0.2 ? "Sell" : "Hold",
          timestamp: new Date().getTime()
        };
      })
    );

    setData(results.sort((a, b) => b.overallSentiment - a.overallSentiment));
    setLoading(false);
  };

  const fetchHistoricalData = (coin) => {
    const data = [];
    const now = new Date();
    for (let i = 30; i >= 0; i--) {
      data.push({
        date: new Date(now - i * 24 * 60 * 60 * 1000).toLocaleDateString(),
        price: Math.random() * (coin.symbol === 'BTC' ? 50000 : 5000),
        sentiment: Math.random() * 2 - 1
      });
    }
    setHistoricalData(data);
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getSignalIcon = (signal) => {
    switch (signal) {
      case 'Buy':
        return <TrendingUp className="text-green-500" />;
      case 'Sell':
        return <TrendingDown className="text-red-500" />;
      default:
        return <Minus className="text-gray-500" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment > 0.2) return 'text-green-500';
    if (sentiment < -0.2) return 'text-red-500';
    return 'text-gray-500';
  };

  return (
    <div className="p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((item) => (
          <Card 
            key={item.coin.symbol}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              setSelectedCoin(item.coin);
              fetchHistoricalData(item.coin);
            }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {item.coin.name} ({item.coin.symbol})
              </CardTitle>
              {getSignalIcon(item.signal)}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${item.marketPrice.toFixed(2)}</div>
              <div className="flex flex-col space-y-1 mt-4">
                <div className="text-xs text-muted-foreground">
                  Overall Sentiment: 
                  <span className={`ml-2 font-bold ${getSentimentColor(item.overallSentiment)}`}>
                    {item.overallSentiment.toFixed(3)}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">Signal: {item.signal}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedCoin && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{selectedCoin.name} Historical Data</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="price"
                    stroke="#8884d8"
                    name="Price"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="sentiment"
                    stroke="#82ca9d"
                    name="Sentiment"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Sentiments;