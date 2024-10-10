"use client";

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import React, { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex flex-col flex-1 overflow-hidden transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="h-16">
          <Header />
        </div>
        <main className="flex-1 overflow-auto bg-gradient-to-br from-purple-600 via-purple-500 to-blue-500 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
