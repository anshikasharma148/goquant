import React from "react";
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

const DepthChart = ({ bids = [], asks = [] }) => {
  if (!bids.length || !asks.length) {
    return (
      <div className="p-6 bg-gray-800 text-white rounded-lg">
        <h3 className="text-lg font-bold">Loading Depth Chart...</h3>
      </div>
    );
  }

  const data = {
    labels: bids.map(([price]) => price),
    datasets: [
      {
        label: "Bids",
        data: bids.map(([_, quantity]) => quantity),
        borderColor: "rgba(75, 192, 192, 1)",
        fill: false,
      },
      {
        label: "Asks",
        data: asks.map(([_, quantity]) => quantity),
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: { enabled: true },
    },
    scales: {
      x: {
        type: "category",
        title: { display: true, text: "Price" },
      },
      y: {
        title: { display: true, text: "Quantity" },
      },
    },
  };

  return (
    <div className="p-6 bg-gray-800 text-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <h3 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-center">
        Market Depth Chart
      </h3>
      <Line data={data} options={options} />
    </div>
  );
};

export default DepthChart;
