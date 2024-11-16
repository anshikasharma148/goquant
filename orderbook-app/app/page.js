import Orderbook from "../components/Orderbook";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="max-w-screen-lg w-full p-4 sm:p-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 hover:scale-105 transition-transform duration-300">
          BTC-USD Orderbook
        </h1>
        <Orderbook />
      </div>
    </div>
  );
}
