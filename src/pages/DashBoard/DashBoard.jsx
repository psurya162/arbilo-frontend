import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArbiPair from "./ArbiPair";
import { IoMdSwap, IoMdTrendingUp } from "react-icons/io";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import ArbiTrack from "./ArbiTrack";
import { useDashboard } from "../../context/DashboardContext";
import { Button } from "@/components/ui/button";

const messages = [
  "Fetching the latest arbitrage opportunities...",
  "Analyzing profitable trades, please wait...",
  "Optimizing data for better insights...",
  "Almost there! Loading fresh data...",
];

const DashBoard = () => {
  const { auth } = useContext(AuthContext);
  const { state } = useDashboard();
  const [activeTab, setActiveTab] = useState("ArbiTrack");
  const isActive = auth?.user?.is_active;
  const [currentMessage, setCurrentMessage] = useState(messages[0]);
  const [showMessages, setShowMessages] = useState(true);
  const [likes, setLikes] = useState(new Set());

  // Track liked items
  const toggleLike = (id) => {
    setLikes(prev => {
      const newLikes = new Set(prev);
      newLikes.has(id) ? newLikes.delete(id) : newLikes.add(id);
      return newLikes;
    });
  };

  useEffect(() => {
    if (state.loading) {
      const interval = setInterval(() => {
        setCurrentMessage(prev => messages[(messages.indexOf(prev) + 1) % messages.length]);
      }, 5000);
      return () => clearInterval(interval);
    }
    setShowMessages(false);
  }, [state.loading]);

  const handleSubscriptionActivate = () => {
    console.log("Navigating to subscription page...");
  };

  return (
    <div className="p-2 md:p-4">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 text-center uppercase">
        Unlock Profitable Arbitrage with Confidence
      </h1>

      <div className="flex flex-col items-center gap-2 mb-4">
        <div className="text-base md:text-lg font-semibold text-gray-700">
          Next Refresh in: {Math.floor(state.countdown / 60)}m {state.countdown % 60}s
        </div>
        {showMessages && state.loading && (
          <p className="text-sm text-gray-500 italic animate-pulse">{currentMessage}</p>
        )}
      </div>

      {!isActive && (
  <div className="flex flex-col items-center justify-center bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-lg shadow-md animate-fade-in">
    <div className="flex items-center gap-2">
      <span className="text-yellow-600 text-2xl">⚠️</span>
      <h2 className="text-xl font-semibold text-yellow-700">
        Your Subscription is Inactive!
      </h2>
    </div>
    <p className="text-sm text-gray-700 text-center mt-2">
      You need an active subscription to access <b>ArbiPair</b>. Unlock premium features and stay ahead in arbitrage trading.
    </p>
    <Button 
      onClick={handleSubscriptionActivate} 
      className="mt-4 bg-yellow-600 text-white hover:bg-yellow-500 transition-all px-6 py-2 rounded-md font-medium"
    >
      Activate Subscription
    </Button>
  </div>
)}


      <div className="p-2 md:p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="flex flex-col md:flex-row justify-around mb-4 p-2 md:p-6 gap-2">
            <TabsTrigger 
              value="ArbiTrack" 
              className="group transition-all duration-300 hover:bg-blue-50"
            >
              <IoMdTrendingUp className="mr-2 group-hover:text-blue-600 transition-colors" />
              ArbiTrack
            </TabsTrigger>
            <TabsTrigger
              value="ArbiPair"
              disabled={!isActive}
              className="group transition-all duration-300 hover:bg-green-50 disabled:opacity-50"
            >
              <IoMdSwap className="mr-2 group-hover:text-green-600 transition-colors" />
              ArbiPair
            </TabsTrigger>
          </TabsList>

          <TabsContent value="ArbiTrack">
            <ArbiTrack 
              data={state.arbiTrackData} 
              loading={state.loading} 
              error={state.error}
              toggleLike={toggleLike}
              likes={likes}
            />
          </TabsContent>

          {isActive && (
            <TabsContent value="ArbiPair">
              <ArbiPair 
                data={state.arbiPairData} 
                loading={state.loading} 
                error={state.error}
                toggleLike={toggleLike}
                likes={likes}
              />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default DashBoard;