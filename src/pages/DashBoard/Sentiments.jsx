import React, { useState, useRef } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus, CircleX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDashboard } from '../../context/DashboardContext';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

// Utility function to render text with clickable links
const renderTextWithLinks = (text) => {
  if (!text) return '';
  
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

// Utility function to truncate text
const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

const Sentiments = () => {
  const { sentimentData, error, isInitialized, refreshData } = useDashboard();
  const [selectedCoin, setSelectedCoin] = useState(null);
  const detailsRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState('');
  const [dialogTitle, setDialogTitle] = useState('');

  const handleCoinClick = (coin) => {
    const newSelectedCoin = selectedCoin?.symbol === coin.symbol ? null : coin;
    setSelectedCoin(newSelectedCoin);
    if (newSelectedCoin && detailsRef.current) {
      detailsRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const getSignalIcon = (signal) => {
    switch (signal) {
      case 'Buy':
        return <TrendingUp className="text-green-500 w-5 h-5" />;
      case 'Sell':
        return <TrendingDown className="text-red-500 w-5 h-5" />;
      default:
        return <Minus className="text-gray-500 w-5 h-5" />;
    }
  };

  const getSentimentColor = (sentiment) => {
    if (sentiment > 0.2) return 'text-green-600';
    if (sentiment < -0.2) return 'text-red-600';
    return 'text-gray-600';
  };

  // Safe find function to avoid null reference errors
  const findCoinData = (symbol) => {
    return sentimentData.find((item) => item.coin.symbol === symbol) || { 
      redditPosts: [],
      cryptoPanicPosts: [],
      newsApiInfluencerPosts: []
    };
  };

  const handleReadMore = (content, source) => {
    setDialogContent(content);
    setDialogTitle(`${selectedCoin?.name || 'Crypto'} ${source || 'Post'}`);
    setIsDialogOpen(true);
  };


  return (
    <div className="p-4 md:p-6 min-h-screen flex flex-col md:flex-row transition-all duration-500 ease-in-out">
      {/* Coin List Container */}
      <div
        className={`space-y-6 transition-all duration-500 ease-in-out ${
          selectedCoin ? 'w-full md:w-1/2 md:pr-4' : 'w-full'
        }`}
      >
        {error && (
          <div className="p-4 bg-red-100 text-red-700 rounded-lg shadow-sm animate-pulse">
            {error}
          </div>
        )}
        {!isInitialized ? (
          <div className="text-center text-gray-600 text-lg animate-pulse">
            Loading sentiment data...
          </div>
        ) : (
          <div
            className={`grid gap-6 transition-all duration-500 ease-in-out ${
              selectedCoin
                ? 'grid-cols-1 sm:grid-cols-2'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
            }`}
          >
            {sentimentData.map((item) => (
              <Card
                key={item.coin.symbol}
                className={`cursor-pointer hover:shadow-xl transition-all duration-300 bg-white rounded-xl shadow-md border border-gray-200 hover:scale-105 ${
                  selectedCoin?.symbol === item.coin.symbol ? 'shadow-xl border-2 border-indigo-500' : ''
                }`}
                onClick={() => handleCoinClick(item.coin)}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {item.coin.name} <span className="text-gray-500">({item.coin.symbol})</span>
                  </CardTitle>
                  {getSignalIcon(item.signal)}
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-2xl font-bold text-gray-900">
                    ${item.marketPrice ? item.marketPrice.toFixed(2) : 'N/A'}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      Sentiment:{' '}
                      <span className={`font-semibold ${getSentimentColor(item.overallSentiment)}`}>
                        {item.overallSentiment.toFixed(3)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      Signal: <span className="font-medium text-gray-700">{item.signal}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Details Container */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          selectedCoin
            ? 'w-full md:w-1/2 md:pl-4 mt-6 md:mt-0'
            : 'w-0 overflow-hidden'
        }`}
      >
        {selectedCoin && (
          <Card
            ref={detailsRef}
            className="bg-white h-full overflow-y-auto max-h-[calc(100vh-100px)] rounded-xl shadow-lg border border-gray-200 animate-fade-in font-['Inter'] text-gray-800"
          >
            <CardHeader className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4">
              <CardTitle className="text-xl md:text-2xl font-semibold text-gray-800 flex items-center justify-between">
                {selectedCoin.name} ({selectedCoin.symbol})
                <Button
                  onClick={() => setSelectedCoin(null)}
                  className="text-gray-500 hover:text-gray-700 bg-transparent hover:bg-gray-100  "
                >
                  <CircleX/>
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 p-4 md:p-6">
              {/* Reddit Posts */}
              {findCoinData(selectedCoin.symbol).redditPosts.length > 0 && (
                <div className="space-y-4">
               
                  <div className="space-y-3">
                    {findCoinData(selectedCoin.symbol).redditPosts.map((post, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {renderTextWithLinks(truncateText(post.text, 200))}
                        </p>
                        {post.text && post.text.length > 200 && (
                          <button
                            className="text-blue-600 text-sm mt-2 hover:underline"
                            onClick={() => handleReadMore(post.text, 'Reddit Post')}
                          >
                            Read More
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CryptoPanic Posts */}
              {findCoinData(selectedCoin.symbol).cryptoPanicPosts.length > 0 && (
                <div className="space-y-4">
               
                  <div className="space-y-3">
                    {findCoinData(selectedCoin.symbol).cryptoPanicPosts.map((post, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {renderTextWithLinks(truncateText(post.text, 200))}
                        </p>
                        {post.text && post.text.length > 200 && (
                          <button
                            className="text-blue-600 text-sm mt-2 hover:underline"
                            onClick={() => handleReadMore(post.text, 'News Post')}
                          >
                            Read More
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NewsAPI Posts */}
              {findCoinData(selectedCoin.symbol).newsApiInfluencerPosts.length > 0 && (
                <div className="space-y-4">
                  
                  <div className="space-y-3">
                    {findCoinData(selectedCoin.symbol).newsApiInfluencerPosts.map((post, index) => (
                      <div
                        key={index}
                        className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
                      >
                        <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                          {renderTextWithLinks(truncateText(post.text, 200))}
                        </p>
                        {post.text && post.text.length > 200 && (
                          <button
                            className="text-blue-600 text-sm mt-2 hover:underline"
                            onClick={() => handleReadMore(post.text, 'Influencer Post')}
                          >
                            Read More
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* If no posts are available */}
              {findCoinData(selectedCoin.symbol).redditPosts.length === 0 &&
                findCoinData(selectedCoin.symbol).cryptoPanicPosts.length === 0 &&
                findCoinData(selectedCoin.symbol).newsApiInfluencerPosts.length === 0 && (
                <div className="text-gray-600 text-center py-6 text-sm md:text-base">
                  No posts available for this coin.
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Alert Dialog for Read More */}
      <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="whitespace-pre-wrap">
            {renderTextWithLinks(dialogContent)}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setIsDialogOpen(false)}>Close</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Sentiments;