import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import config from "@/config.js/config";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
    const [state, setState] = useState({
        arbiPairData: [],
        arbiTrackData: [],
        loading: false,
        error: null,
        nextRefreshTime: null,
        countdown: 0,
        initialized: false
    });

    const getToken = () => localStorage.getItem("authToken");

    // New function to fetch server time and next refresh
    const fetchServerStatus = useCallback(async () => {
        const token = getToken();
        if (!token) return null;

        try {
            const response = await fetch(`${config.API_URL}/api/arbitrage/status`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return await response.json();
        } catch (error) {
            console.error("Failed to fetch server status:", error);
            return null;
        }
    }, []);

    const fetchArbiPairData = useCallback(async () => {
        const token = getToken();
        if (!token) return [];

        try {
            const response = await fetch(`${config.API_URL}/api/arbitrage`, {
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
        if (!token) return [];

        try {
            const response = await fetch(`${config.API_URL}/api/arbitrage/arbitrack`, {
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
        if (!token) return;

        if (state.initialized && !force) return;

        setState(prev => ({ ...prev, loading: true, error: null }));

        try {
            // First fetch server status to sync with backend
            const serverStatus = await fetchServerStatus();
            if (!serverStatus) throw new Error("Failed to fetch server status");

            const [newArbiPairData, newArbiTrackData] = await Promise.all([
                fetchArbiPairData(),
                fetchArbiTrackData()
            ]);

            setState(prev => ({
                ...prev,
                arbiPairData: newArbiPairData,
                arbiTrackData: newArbiTrackData,
                loading: false,
                nextRefreshTime: serverStatus.nextRefreshTime,
                countdown: Math.max(0, Math.floor((serverStatus.nextRefreshTime - Date.now()) / 1000)),
                initialized: true
            }));
        } catch (error) {
            setState(prev => ({
                ...prev,
                error: error.message,
                loading: false
            }));
        }
    }, [fetchArbiPairData, fetchArbiTrackData, fetchServerStatus]);

    // Initialize data and sync with server
    useEffect(() => {
        const initializeData = async () => {
            if (getToken()) {
                await refreshData();
            }
        };

        initializeData();
    }, [refreshData]);

    // Countdown timer synced with server
    useEffect(() => {
        if (!state.nextRefreshTime) return;

        const timerId = setInterval(() => {
            const timeLeft = state.nextRefreshTime - Date.now();
            
            if (timeLeft <= 0) {
                refreshData(true);
            } else {
                setState(prev => ({
                    ...prev,
                    countdown: Math.max(0, Math.floor(timeLeft / 1000))
                }));
            }
        }, 1000);

        return () => clearInterval(timerId);
    }, [state.nextRefreshTime, refreshData]);

    return (
        <DashboardContext.Provider value={{ state, refreshData }}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => useContext(DashboardContext);