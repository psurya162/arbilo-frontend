import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ArbiPair from "./ArbiPair";
import { IoMdSwap, IoMdTrendingUp } from "react-icons/io";
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
    const [activeTab, setActiveTab] = useState("ArbiTrack"); // Set default to ArbiTrack
    const isActive = auth?.user?.is_active;
    const [currentMessage, setCurrentMessage] = useState(messages[0]);
    const [showMessages, setShowMessages] = useState(true);

    // Rotate messages every 5 seconds while loading
    useEffect(() => {
        if (state.loading) {
            let index = 0;
            const interval = setInterval(() => {
                index = (index + 1) % messages.length;
                setCurrentMessage(messages[index]);
            }, 5000);

            return () => clearInterval(interval);
        } else {
            setShowMessages(false);
        }
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
                    <p className="text-sm text-gray-500 italic">{currentMessage}</p>
                )}
            </div>

            {!isActive && (
                <div className="flex flex-col items-center justify-center bg-yellow-100 border-2 border-yellow-300 p-4 rounded-lg mb-4">
                    <h2 className="text-xl font-semibold text-yellow-600">
                        Your subscription is inactive!
                    </h2>
                    <p className="text-sm text-gray-700 my-2">
                        You need an active subscription to access ArbiPair.
                    </p>
                    <Button onClick={handleSubscriptionActivate} className="bg-yellow-600 text-white hover:bg-yellow-500">
                        Activate Subscription
                    </Button>
                </div>
            )}

            <div className="p-2 md:p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="flex md:flex-row justify-around mb-4 p-2 md:p-6 gap-2">
                        <TabsTrigger value="ArbiTrack">
                            <IoMdTrendingUp size={20} /> ArbiTrack
                        </TabsTrigger>
                        <TabsTrigger
                            value="ArbiPair"
                            disabled={!isActive} // Disable ArbiPair if not subscribed
                        >
                            <IoMdSwap size={20} /> ArbiPair
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="ArbiTrack">
                        <ArbiTrack data={state.arbiTrackData} loading={state.loading} error={state.error} />
                    </TabsContent>

                    {isActive && (
                        <TabsContent value="ArbiPair">
                            <ArbiPair data={state.arbiPairData} loading={state.loading} error={state.error} />
                        </TabsContent>
                    )}
                </Tabs>
            </div>
        </div>
    );
};

export default DashBoard;
