import React, { useState } from 'react';
import Link from 'next/link';
import { Home, Search, Star, FileText, Settings, Menu, ChevronRight } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const menuItems = [
    { name: 'ダッシュボード', href: '/dashboard', icon: Home },
    { name: '補助金検索', href: '/search', icon: Search },
    { name: 'お気に入り', href: '/favorites', icon: Star },
    { name: '申請管理', href: '/applications', icon: FileText },
    { name: '設定', href: '/settings', icon: Settings },
  ];

  const isExpanded = isOpen || isHovered;

  return (
    <aside 
      className={`transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-16'} h-full fixed left-0 top-0 z-50 flex flex-col shadow-md bg-gradient-to-b from-purple-600 to-blue-500`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="h-16 flex items-center justify-start pl-4">
        <button 
          onClick={() => toggleSidebar()}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className="text-white hover:text-yellow-300 transition-colors duration-200 relative"
        >
          {isExpanded ? (
            <Menu className="h-6 w-6" />
          ) : (
            <>
              {isButtonHovered ? <ChevronRight className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              {isButtonHovered && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg whitespace-nowrap">
                  サイドバーを固定表示する
                </div>
              )}
            </>
          )}
        </button>
      </div>
      {isExpanded && (
        <nav className="mt-2">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className="mb-2">
                <Link href={item.href} className="flex items-center px-4 py-2 text-white hover:bg-white hover:bg-opacity-10 hover:text-yellow-300 transition-colors duration-200">
                  <div className="w-6 h-6 flex items-center justify-center">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="ml-3 whitespace-nowrap overflow-hidden">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;