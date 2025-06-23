import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../utils/api';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then(setProducts);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white py-10 px-4">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-purple-700 tracking-wide">📢 BidHub</h1>
        <p className="text-purple-500 text-lg mt-2">Real-Time Auctions. Voice or Web Bidding. Fast. Fair. Fun.</p>
      </header>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-md rounded-xl overflow-hidden border border-purple-200 transition hover:shadow-lg"
          >
            <img
              src={p.img} // dynamic placeholder image
              alt={p.name}
              className="w-full h-48 object-contain"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-purple-700">{p.name}</h3>
              <p className="text-sm text-gray-600 mt-1">{p.description}</p>
              <p className="text-lg font-medium mt-3 text-gray-800">Current Bid: ₹{p.currentBid}</p>
              <Link
                to={`/product/${p._id}`}
                className="inline-block mt-4 px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
              >
                View / Bid
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
