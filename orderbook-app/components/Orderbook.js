'use client'
import React, { useEffect, useState } from "react";
import { fetchOrderbookData } from "../utils/api";
import DepthChart from "./DepthChart";
import ImbalanceIndicator from "./ImbalanceIndicator";
import SpreadIndicator from "./SpreadIndicator";

const Orderbook = () => {
  const [orderbook, setOrderbook] = useState({ bids: [], asks: [] });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        const data = await fetchOrderbookData();
        setOrderbook(data);
      } catch (err) {
        console.error("Error fetching orderbook data:", err);
        setError("Failed to fetch orderbook data.");
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="p-4 bg-red-600 text-white rounded-lg">
        <h2 className="text-xl font-bold">Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!orderbook.bids.length || !orderbook.asks.length) {
    return (
      <div className="p-4 bg-gray-800 text-white rounded-lg animate-pulse">
        <h2 className="text-xl font-bold">Loading...</h2>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <SpreadIndicator bids={orderbook.bids} asks={orderbook.asks} />
      <ImbalanceIndicator bids={orderbook.bids} asks={orderbook.asks} />
      <DepthChart bids={orderbook.bids} asks={orderbook.asks} />
    </div>
  );
};

export default Orderbook;
