import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const SpreadIndicator = ({ bids, asks }) => {
  const [spreadData, setSpreadData] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (bids.length && asks.length) {
      const spread = asks[0][0] - bids[0][0];
      setSpreadData((prev) => [...prev.slice(-59), spread]);
      setLabels((prev) => [...prev.slice(-59), new Date().toLocaleTimeString()]);
    }
  }, [bids, asks]);

  const data = {
    labels,
    datasets: [
      {
        label: "Spread",
        data: spreadData,
        borderColor: spreadData.length > 1 && spreadData[spreadData.length - 1] > spreadData[spreadData.length - 2]
          ? "rgba(75, 192, 75, 1)"
          : "rgba(192, 75, 75, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-500 to-blue-600 text-center">
        Spread Indicator
      </h3>
      <Line data={data} />
    </div>
  );
};

export default SpreadIndicator;
