import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById, postBid } from '../utils/api';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    getProductById(id).then(setProduct);
  }, [id]);

  const handleBid = async () => {
    const bid = { amount: parseInt(amount), user: 'VoiceUser' };
    const res = await postBid(id, bid);
    if (res.success) {
      alert('✅ Bid placed successfully!');
      setAmount('');
      setProduct(res.updatedProduct);
    } else {
      alert(`❌ ${res.message}`);
    }
  };

  if (!product) return <div className="text-center py-20 text-purple-600">Loading product details...</div>;

  const timeLeft = Math.max(new Date(product.endTime) - Date.now(), 0);
  const seconds = Math.floor(timeLeft / 1000);
  const minutes = Math.floor(seconds / 60);
  const sec = seconds % 60;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <img
            src={product.img} // dynamic placeholder image
            alt={product.name}
            className="w-full h-80 object-cover md:h-full"
          />

          {/* Details & Bidding Section */}
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-purple-700 mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-4">{product.description}</p>

              <div className="text-lg text-gray-800 mb-2">
                <strong>Current Highest Bid:</strong> ₹{product.currentBid}
              </div>

              <div className="text-md text-purple-600 mb-4">
                ⏱ Time Left: {minutes}m {sec}s
              </div>

              <div className="flex gap-2 mt-4">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter your bid"
                  className="border border-purple-300 rounded-md px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                  onClick={handleBid}
                  className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 transition"
                >
                  Place Bid
                </button>
              </div>
            </div>

            {/* Bid History */}
            <div className="mt-6">
              <h4 className="text-xl font-semibold text-purple-700 mb-2">📜 Bid History</h4>
              <ul className="space-y-2 max-h-48 overflow-y-auto text-sm">
                {product.bidHistory
                  .slice()
                  .reverse()
                  .map((bid, i) => (
                    <li key={i} className="text-gray-600">
                      ₹{bid.amount} by <span className="font-medium">{bid.user}</span> at{' '}
                      {new Date(bid.time).toLocaleTimeString()}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
