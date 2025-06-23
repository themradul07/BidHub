// utils/api.js

const mockProducts = [
  {
    _id: '1',
    name: 'iPhone 14 Pro',
    description: 'Latest Apple iPhone with A16 Bionic chip.',
    img: "data:image/avif;base64,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",
    currentBid: 72000,
    endTime: new Date(Date.now() + 5 * 60 * 1000).toISOString(), // Ends in 5 mins
    bidHistory: [
      { amount: 70000, user: 'Alice', time: new Date().toISOString() },
      { amount: 72000, user: 'Bob', time: new Date().toISOString() },
    ],
  },
  {
    _id: '2',
    name: 'Sony PS5 Console',
    description: 'Next-gen PlayStation gaming console.',
    img: 'data:image/avif;base64,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',    currentBid: 50000,
    endTime: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    bidHistory: [
      { amount: 48000, user: 'Charlie', time: new Date().toISOString() },
      { amount: 50000, user: 'Diana', time: new Date().toISOString() },
    ],
  },
  {
    _id: '3',
    name: 'MacBook Air M2',
    description: 'Apple MacBook Air with M2 chip, 8GB RAM.',
    img: 'data:image/avif;base64,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',
    currentBid: 87000,
    endTime: new Date(Date.now() + 8 * 60 * 1000).toISOString(),
    bidHistory: [
      { amount: 85000, user: 'Eve', time: new Date().toISOString() },
      { amount: 87000, user: 'Frank', time: new Date().toISOString() },
    ],
  },
];

let products = JSON.parse(JSON.stringify(mockProducts)); // Deep copy

export const getProducts = async () => {
  return products;
};

export const getProductById = async (id) => {
  return products.find((p) => p._id === id);
};

export const postBid = async (id, bid) => {
  const product = products.find((p) => p._id === id);
  if (!product) {
    return { success: false, message: 'Product not found' };
  }

  const now = new Date();
  if (new Date(product.endTime) < now) {
    return { success: false, message: 'Auction ended' };
  }

  if (bid.amount <= product.currentBid) {
    return { success: false, message: 'Bid must be higher than current bid' };
  }

  product.currentBid = bid.amount;
  product.bidHistory.push({ ...bid, time: now.toISOString() });

  return { success: true, updatedProduct: product };
};
