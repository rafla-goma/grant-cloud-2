import React from 'react';
import Link from 'next/link';
import { Bell, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="text-3xl font-bold text-yellow-400 hover:text-yellow-300 transition-colors duration-200">
          補助金クラウド
        </Link>
        <div className="flex items-center space-x-4">
          <button className="text-gray-300 hover:text-white transition-colors duration-200">
            <Bell className="h-6 w-6" />
          </button>
          <Link href="/profile" className="text-gray-300 hover:text-white transition-colors duration-200">
            <User className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;