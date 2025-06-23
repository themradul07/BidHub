import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-purple-50 border-t border-purple-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between text-sm text-purple-700">
        <p>© {new Date().getFullYear()} BidHub. All rights reserved.</p>
        <div className="mt-2 sm:mt-0 space-x-4">
          <a href="#" className="hover:underline">Privacy</a>
          <a href="#" className="hover:underline">Terms</a>
          <a href="#" className="hover:underline">Support</a>
        </div>
      </div>
    </footer>
  );
}
