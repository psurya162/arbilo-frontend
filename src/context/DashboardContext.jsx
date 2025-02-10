import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import config from "@/config.js/config";

const REFRESH_INTERVAL = 300000; // 5 minutes

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [state, setState] = useState({
        arbiPairData: [],
        arbiTrackData: [],
        loading: false,
        error: null,
        countdown: REFRESH_INTERVAL / 1000,
        lastRefreshTime: null,
        initialized: false
    });

    // Function to get token from localStorage
    const getToken = () => localStorage.getItem("authToken");

    const fetchArbiPairData = useCallback(async () => {
        const token = getToken();
        if (!token) {
            console.warn("Token not found. Skipping ArbiPair fetch.");
            return [];
        }

        try {
            const response = await fetch(`${config.API_URL}/api/arbitrage`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            return Array.isArray(data.results) ? data.results : data;
        } catch (error) {
            console.error("ArbiPair fetch failed:", error);
            return [];
        }
    }, []);

    const fetchArbiTrackData = useCallback(async () => {
        const token = getToken();
        if (!token) {
            console.warn("Token not found. Skipping ArbiTrack fetch.");
            return [];
        }

        try {
            const response = await fetch(`${config.API_URL}/api/arbitrage/arbitrack`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();

            if (data && typeof data === "object" && Object.keys(data).length > 0) {
                return Object.entries(data).map(([coin, info]) => ({
                    coin1: coin,
                    minExchange: info.lowestExchange || "N/A",
                    minPrice1: info.lowestPrice || "N/A",
                    maxExchange: info.highestExchange || "N/A",
                    maxPrice1: info.highestPrice || "N/A",
                    profitPercentage: info.profitPercentage || 0,
                }));
            }
            return [];
        } catch (error) {
            console.error("ArbiTrack fetch failed:", error);
            return [];
        }
    }, []);

    const refreshData = useCallback(async (force = false) => {
        const token = getToken();
        if (!token) {
            console.warn("Waiting for token...");
            return;
        }

        if (state.initialized && !force) return;

        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            const [newArbiPairData, newArbiTrackData] = await Promise.all([
                fetchArbiPairData(),
                fetchArbiTrackData()
            ]);

            setState(prev => ({
                ...prev,
                arbiPairData: newArbiPairData,
                arbiTrackData: newArbiTrackData,
                loading: false,
                lastRefreshTime: Date.now(),
                countdown: REFRESH_INTERVAL / 1000,
                initialized: true
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error.message,
                loading: false
            }));
        }
    }, [fetchArbiPairData, fetchArbiTrackData]);

    // Check for token before fetching data
    useEffect(() => {
        const interval = setInterval(() => {
            if (getToken()) {
                refreshData();
                clearInterval(interval); // Stop checking once the token is found
            }
        }, 500);

        return () => clearInterval(interval);
    }, []);

    // Auto refresh timer
    useEffect(() => {
        if (!state.initialized) {
            refreshData();
        }

        const intervalId = setInterval(() => refreshData(true), REFRESH_INTERVAL);
        return () => clearInterval(intervalId);
    }, [refreshData]);

    // Countdown timer
    useEffect(() => {
        if (!state.lastRefreshTime) return;

        const timerId = setInterval(() => {
            const timeLeft = REFRESH_INTERVAL - (Date.now() - state.lastRefreshTime);
            setState(prev => ({
                ...prev,
                countdown: Math.max(0, Math.floor(timeLeft / 1000))
            }));
        }, 1000);

        return () => clearInterval(timerId);
    }, [state.lastRefreshTime]);

    return (
        <DashboardContext.Provider value={{ state, refreshData }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => useContext(DashboardContext);
