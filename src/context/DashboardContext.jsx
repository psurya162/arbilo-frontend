import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import config from "@/config.js/config";

const REFRESH_INTERVAL = 300000; // 5 minutes

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [state, setState] = useState({
        arbiPairData: [],
        arbiTrackData: [],
        sentimentData: [],
        error: null,
        lastRefreshTime: Date.now(),
        timeUntilNextRefresh: REFRESH_INTERVAL / 1000,
        initialized: false
    });

    const getToken = () => localStorage.getItem("authToken");

    const formatArbiTrackData = (data) => {
        if (!data || typeof data !== "object") return [];
        
        return Object.entries(data).map(([coin, info]) => ({
            coin1: coin,
            minExchange: info.lowestExchange || "N/A",
            minPrice1: Number(info.lowestPrice).toFixed(2) || "N/A",
            maxExchange: info.highestExchange || "N/A",
            maxPrice1: Number(info.highestPrice).toFixed(2) || "N/A",
            profitPercentage: Number(info.profitPercentage).toFixed(2) || 0,
        }));
    };

    const fetchArbiPairData = useCallback(async () => {
        const token = getToken();
        if (!token) {
            console.warn("No token found");
            return [];
        }

        try {
            const response = await fetch(`${config.API_URL}/api/arbitrage`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // Ensure we return an array and handle null/undefined values
            return Array.isArray(data) ? data : Array.isArray(data.results) ? data.results : [];
        } catch (error) {
            console.error("ArbiPair fetch failed:", error);
            return [];
        }
    }, []);

    const fetchArbiTrackData = useCallback(async () => {
        const token = getToken();
        if (!token) {
            console.warn("No token found");
            return [];
        }

        try {
            const response = await fetch(`${config.API_URL}/api/arbitrage/arbitrack`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return formatArbiTrackData(data);
        } catch (error) {
            console.error("ArbiTrack fetch failed:", error);
            return [];
        }
    }, []);

    const fetchSentimentData = useCallback(async () => {
        try {
            const response = await fetch(`${config.API_URL}/api/crypto/sentiment`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const result = await response.json();
            if (result.success) {
                return result.data;
            } else {
                throw new Error(result.message || 'Failed to fetch sentiment data');
            }
        } catch (error) {
            console.error("Sentiment fetch failed:", error);
            return [];
        }
    }, []);

    const refreshData = useCallback(async () => {
        const token = getToken();
        let sentimentDataResult = [];
        let arbiPairDataResult = [];
        let arbiTrackDataResult = [];
        let errorMessage = null;

        try {
            // Always fetch sentiment data regardless of token
            sentimentDataResult = await fetchSentimentData();
            
            // Only fetch ArbiPair and ArbiTrack if token exists
            if (token) {
                [arbiPairDataResult, arbiTrackDataResult] = await Promise.all([
                    fetchArbiPairData(),
                    fetchArbiTrackData()
                ]);
            }

            setState(prev => ({
                ...prev,
                arbiPairData: arbiPairDataResult,
                arbiTrackData: arbiTrackDataResult,
                sentimentData: sentimentDataResult,
                lastRefreshTime: Date.now(),
                timeUntilNextRefresh: REFRESH_INTERVAL / 1000,
                error: null,
                initialized: true
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error.message,
                // Still update with any partial data we might have received
                arbiPairData: arbiPairDataResult || prev.arbiPairData,
                arbiTrackData: arbiTrackDataResult || prev.arbiTrackData,
                sentimentData: sentimentDataResult || prev.sentimentData,
                initialized: true
            }));
        }
    }, [fetchArbiPairData, fetchArbiTrackData, fetchSentimentData]);

    // Initial data fetch and refresh interval
    useEffect(() => {
        refreshData();
        const intervalId = setInterval(refreshData, REFRESH_INTERVAL);
        return () => clearInterval(intervalId);
    }, [refreshData]);

    // Update countdown timer
    useEffect(() => {
        const timerInterval = setInterval(() => {
            setState(prev => {
                const timeLeft = Math.max(0, REFRESH_INTERVAL - (Date.now() - prev.lastRefreshTime));
                return {
                    ...prev,
                    timeUntilNextRefresh: Math.ceil(timeLeft / 1000)
                };
            });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, []);

    const contextValue = {
        arbiPairData: state.arbiPairData,
        arbiTrackData: state.arbiTrackData,
        sentimentData: state.sentimentData,
        error: state.error,
        timeUntilNextRefresh: state.timeUntilNextRefresh,
        refreshData,
        isInitialized: state.initialized
    };

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error('useDashboard must be used within a DashboardProvider');
    }
    return context;
};