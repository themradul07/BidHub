import React, { useEffect, useState } from 'react';
import { getProducts } from '../utils/api';

export default function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      getProducts().then(setProducts);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-purple-700 mb-8 text-center">
          📊 Live Auction Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div
              key={p._id}
              className="bg-white border border-purple-200 shadow-sm rounded-xl p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-purple-800">{p.name}</h3>
                <span className="text-sm text-gray-500">
                  Time left: {Math.max(Math.floor((new Date(p.endTime) - Date.now()) / 1000), 0)}s
                </span>
              </div>

              <p className="text-gray-700 mb-4">
                <strong>Current Bid:</strong> ₹{p.currentBid}
              </p>

              <div>
                <h4 className="text-sm text-purple-600 font-semibold mb-1">Recent Bids:</h4>
                <ul className="max-h-40 overflow-y-auto text-sm text-gray-600 space-y-1">
                  {p.bidHistory
                    .slice()
                    .reverse()
                    .map((b, i) => (
                      <li key={i}>
                        ₹{b.amount} by <span className="font-medium">{b.user}</span> at{' '}
                        {new Date(b.time).toLocaleTimeString()}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
