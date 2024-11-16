import React from "react";

const ImbalanceIndicator = ({ bids = [], asks = [] }) => {
  const totalBids = bids?.length
    ? bids.map(([, quantity]) => parseFloat(quantity || 0)).reduce((sum, qty) => sum + qty, 0)
    : 0;

  const totalAsks = asks?.length
    ? asks.map(([, quantity]) => parseFloat(quantity || 0)).reduce((sum, qty) => sum + qty, 0)
    : 0;

  const imbalance =
    totalBids + totalAsks > 0
      ? ((totalBids - totalAsks) / (totalBids + totalAsks)) * 100
      : 0;

  const getImbalanceClass = () => (imbalance > 0 ? "text-green-500" : "text-red-500");

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 text-center">
        Orderbook Imbalance
      </h3>
      <p
        className={`${getImbalanceClass()} text-4xl font-bold transition-colors duration-500 text-center`}
      >
        {imbalance.toFixed(2)}%
      </p>
    </div>
  );
};

export default ImbalanceIndicator;
