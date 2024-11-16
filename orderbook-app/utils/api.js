import axios from "axios";

export const fetchOrderbookData = async (pair = "BTCUSDT") => {
  try {
    const response = await axios.get(
      `https://api.binance.com/api/v3/depth?symbol=${pair}&limit=10`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching orderbook data:", error);
    throw error;
  }
};
